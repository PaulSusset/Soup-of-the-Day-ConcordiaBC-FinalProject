import { combineReducers } from 'redux';
import userLocation from './userLocation';
import dishesManipulation from './dishesManipulation';
import restoActions from './restoActions';

export default combineReducers({
  userLocation,
  dishesManipulation,
  restoActions,
});
