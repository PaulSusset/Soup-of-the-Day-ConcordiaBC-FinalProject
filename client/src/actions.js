export const setUserLocation = (location) => ({
  type: 'SET_USER_LOCATION',
  location,
});

export const setDishes = (dishes) => ({
  type: 'SET_DISHES',
  dishes,
});

export const setRestos = (restos) => ({
  type: 'SET_RESTOS',
  restos,
});

export const resetRestos = (restos) => ({
  type: 'RESET_RESTOS',
});

export const setCentering = (location, zoom) => ({
  type: 'SET_CENTERING',
  location,
  zoom,
});

export const resetCentering = (location, zoom) => ({
  type: 'RESET_CENTERING',
  location,
});

export const setIntialLoad = () => ({
  type: 'SET_INITIAL_LOAD',
});

export const setHover = (hoverIds) => ({
  type: 'SET_HOVER',
  hoverIds,
});

export const createAccount = (accountInfo) => ({
  type: 'CREATE_ACCOUNT',
  accountInfo,
});

export const logIn = (account) => ({
  type: 'LOG_IN',
  account,
});

export const displayMap = (bool) => ({
  type: 'DISPLAY_MAP',
  bool,
});

export const logOut = () => ({
  type: 'LOG_OUT',
});

export const setWeekday = (day) => ({
  type: 'SET_WEEKDAY',
  day,
});

export const setFilteredDishes = (dishes) => ({
  type: 'SET_FILTERED_DISHES',
  dishes,
});

export const setPriceRanges = (ranges) => ({
  type: 'SET_PRICE_RANGE',
  ranges,
});

export const setPortions = (portions) => ({
  type: 'SET_PORTION',
  portions,
});

export const setLabels = (labels) => ({
  type: 'SET_LABELS',
  labels,
});

export const setDirections = (coordinates) => ({
  type: 'SET_DIRECTIONS',
  coordinates,
});

export const setDirectionsResults = (results) => ({
  type: 'SET_DIRECTIONS_RESULTS',
  results,
});
