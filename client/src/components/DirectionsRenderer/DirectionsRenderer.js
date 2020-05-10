/* global google */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDirectionsResults } from '../../actions';

const MyDirectionsRenderer = ({ origin, destination, travelMode }) => {
  const dispatch = useDispatch();
  const userLocation = useSelector((state) => state.userLocation.userLocation);
  const destinationcoords = useSelector(
    (state) => state.userLocation.destination.coordinates
  );
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (destinationcoords.lat) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          // origin: new google.maps.LatLng(origin.lat, origin.lng),
          origin: new google.maps.LatLng(userLocation.lat, userLocation.lng),
          // destination: new google.maps.LatLng(destination.lat, destination.lng),
          destination: new google.maps.LatLng(
            destinationcoords.lat,
            destinationcoords.lng
          ),

          travelMode: 'WALKING',
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            console.log(result);
            setDirections(result.routes[0].overview_path);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [destinationcoords]);

  useEffect(() => {
    dispatch(setDirectionsResults(directions));
  }, [directions]);
  return <div />;
};

export default MyDirectionsRenderer;
