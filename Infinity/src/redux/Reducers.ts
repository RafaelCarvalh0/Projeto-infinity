import { combineReducers } from 'redux';
import Authentication from './modules/Authentication/Reducer';

const RootReducer = combineReducers({
    Authentication
});

export default RootReducer;
