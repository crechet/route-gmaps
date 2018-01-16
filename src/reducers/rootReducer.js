import { combineReducers } from 'redux';
import pointsReducer from './pointsReducer';

export default combineReducers({
    points: pointsReducer
});
