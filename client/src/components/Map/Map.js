/* global google */

import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  // MarkerWithLabel,
  Marker,
  withScriptjs,
  withGoogleMap,
  InfoWindow,
  DirectionsRenderer,
  Polyline,
} from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setDishes, setRestos, resetRestos } from '../../actions';
import MyDirectionsRenderer from '../DirectionsRenderer';
import User from '../../assets/userIcon.svg';

const Map = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [bounds, setBounds] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const userLocation = useSelector((state) => state.userLocation.userLocation);
  const centering = useSelector((state) => state.userLocation.centering);
  const zoom = useSelector((state) => state.userLocation.zoom);
  const directions = useSelector((state) => state.userLocation.destination);
  const pinSpots = useSelector(
    (state) => state.dishesManipulation.restos.filtered
  );
  const [specificLocation, setSpecificLocation] = useState(false);
  const [dishImport, setDishImport] = useState(null);
  const [restoImport, setRestoImport] = useState(null);
  const [directionsReady, setDirectionsReady] = useState(false);

  useEffect(() => {
    setDirectionsReady(directions.going);
  }, [directions]);

  useEffect(() => {
    console.log('try');
    if (bounds) {
      console.log('success');
      fetch(
        `/getDishes/${bounds.sw.lng}/${bounds.ne.lng}/${bounds.sw.lat}/${bounds.ne.lat}`
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setDishImport(res.dishes);
          setRestoImport(res.restos);
          if (res.status === 404) {
            dispatch(resetRestos());
          }
        });
    }
  }, [bounds]);

  useEffect(() => {
    if (restoImport) {
      dispatch(setRestos(restoImport));
    }
  }, [restoImport]);

  useEffect(() => {
    if (dishImport) {
      dispatch(setDishes(dishImport));
    }
  }, [dishImport]);

  useEffect(() => {
    setSpecificLocation(true);
  }, [userLocation]);
  let ref;

  return (
    <>
      <GoogleMap
        ref={(mapRef) => (ref = mapRef)}
        onIdle={() => {
          const ne = ref.getBounds().getNorthEast();
          const sw = ref.getBounds().getSouthWest();
          console.log({
            ne: { lat: ne.lat(), lng: ne.lng() },
            sw: { lat: sw.lat(), lng: sw.lng() },
          });
          setBounds({
            ne: { lat: ne.lat(), lng: ne.lng() },
            sw: { lat: sw.lat(), lng: sw.lng() },
          });
        }}
        defaultOptions={{ mapTypeControl: false }}
        defaultZoom={18}
        defaultCenter={{ lat: 45.50169, lng: -73.567253 }}
        // bootstrapURLKeys={{ key, region: 'CA', language: 'EN' }}
        zoom={zoom}
        center={centering}
      >
        <Marker
          position={{ lat: userLocation.lat, lng: userLocation.lng }}
          icon={{ url: User, scaledSize: new window.google.maps.Size(30, 30) }}
        />
        {pinSpots.length > 0 &&
          pinSpots.map((pin) => {
            let iconMarker = new window.google.maps.MarkerImage(
              `http://localhost:3000${pin.restoImg}`,
              null,
              null,
              null,
              new window.google.maps.Size(30, 30)
            );
            return (
              <Marker
                // icon={iconMarker}
                position={{
                  lat: pin.location.lat,
                  lng: pin.location.lng,
                }}
                key={pin._id}
                // animation={google.maps.Animation.DROP}
                icon={{
                  url: `http://localhost:3000${pin.restoImg}`,
                  scaledSize: new window.google.maps.Size(30, 30),
                  anchor: new window.google.maps.Point(15, 5),
                }}
                onClick={() => setSelectedMarker(pin)}
                // onVisibleChanged={(e) =>
                //   e.getAnimation(new window.google.maps.Animation.DROP())
                // }
              />
            );
          })}
        {selectedMarker && (
          <InfoWindow
            position={{
              lat: selectedMarker.location.lat,
              lng: selectedMarker.location.lng,
            }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div
              style={{ bottom: '100px' }}
              onClick={() => {
                setSelectedMarker(null);
                history.push(`/restaurant/${selectedMarker._id}`);
              }}
            >
              <h4>{selectedMarker.name}</h4>
              <p>{selectedMarker.phone}</p>
              <div>Go to page</div>
            </div>
          </InfoWindow>
        )}
        <MyDirectionsRenderer />
        {directionsReady && (
          <Polyline
            path={directions.results}
            geodesic={false}
            options={
              directionsReady
                ? {
                    strokeColor: 'rgb(204, 88, 3)',
                    strokeOpacity: 1,
                    strokeWeight: 7,
                  }
                : { strokeOpacity: 0 }
            }
          />
        )}
      </GoogleMap>
    </>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
