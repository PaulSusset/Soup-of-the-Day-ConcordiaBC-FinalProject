const initialState = {
  userLocation: { lat: 45.50169, lng: -73.567253 },
  centering: { lat: 45.50169, lng: -73.567253 },
  zoom: 13,
  displayMap: true,
  destination: { going: false, coordinates: {}, results: {} },
};

const userLocation = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_LOCATION': {
      return {
        ...state,
        userLocation: { lat: action.location.lat, lng: action.location.lng },
      };
    }
    case 'SET_CENTERING': {
      return {
        ...state,
        centering: { lat: action.location.lat, lng: action.location.lng },
        zoom: action.zoom,
      };
    }
    case 'RESET_CENTERING': {
      return { ...state, centering: state.userLocation, zoom: 13 };
    }
    case 'DISPLAY_MAP': {
      return { ...state, displayMap: action.bool };
    }
    case 'SET_DIRECTIONS': {
      if (action.coordinates) {
        return {
          ...state,
          destination: {
            going: false,
            coordinates: {
              lat: action.coordinates.lat,
              lng: action.coordinates.lng,
            },
            results: {},
          },
        };
      } else
        return {
          ...state,
          destination: { going: false, coordinates: {}, results: {} },
        };
    }
    case 'SET_DIRECTIONS_RESULTS': {
      return {
        ...state,
        destination: {
          ...state.destination,
          results: action.results,
          going: true,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default userLocation;
