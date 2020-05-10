import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  setUserLocation,
  setCentering,
  setIntialLoad,
  setDishes,
} from '../../actions';

import Spinner from '../../components/Spinner';

import WrappedMap from '../../components/Map';

const MapFuncs = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const [geoLocation, setGeoLocation] = useState(null);
  const [dishImport, setDishImport] = useState([]);
  const [key, setKey] = useState(null);
  const loaded = useSelector((state) => state.dishesManipulation.loaded);
  const displayMap = useSelector((state) => state.userLocation.displayMap);

  useEffect(() => {
    console.log('keyfetch');
    fetch('/googleKey')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res.key);
        setKey(res.key);
      });
  }, []);

  useEffect(() => {
    // setLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoLocation(true);
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        if (error.code == error.PERMISSION_DENIED) {
          console.log(error);
          setGeoLocation(false);
        }
        return;
      }
    );
  }, []);
  useEffect(() => {
    if (geoLocation) {
      console.log('location dispatch');
      dispatch(setUserLocation(location));
      dispatch(setCentering(location, 14));
      return;
    }
  }, [location]);

  useEffect(() => {
    fetch('/getDishes')
      .then((res) => res.json())
      .then((res) => {
        if (res.items.length) setDishImport(res.items);
        else setDishImport([]);
      });
  }, []);
  useEffect(() => {
    if (dishImport.length) dispatch(setDishes(dishImport));
  }, [dishImport]);
  useEffect(() => {
    console.log(typeof key, geoLocation);
    if (key && (geoLocation === true || geoLocation === false)) {
      console.log(key, geoLocation);
      dispatch(setIntialLoad());
    }
  }, [geoLocation, key]);

  return (
    <>
      {displayMap && (
        <>
          {loaded ? (
            <WrappedMap
              // isMarkerShown
              loadingElement={
                <div style={{ height: '100%', width: '100%' }}></div>
              }
              containerElement={<Wrapper />}
              mapElement={<div style={{ height: '100%', width: '100%' }}></div>}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=&key=${key}&region=CA`}
            />
          ) : (
            <Wrapper style={{ height: '40vh', width: '100%' }}>
              <Spinner size={60} />
            </Wrapper>
          )}
        </>
      )}
    </>
  );
};

const Wrapper = styled.div`
  /* margin-top: 7vh; */
  z-index: 0;
  height: 40vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: static;
`;

export default MapFuncs;
