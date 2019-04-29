import { combineReducers } from 'redux';

// Reducers 
import authReducer from './authReducer';

const rootReducer = combineReducers({
    authReducer, 
});

export default rootReducer;

