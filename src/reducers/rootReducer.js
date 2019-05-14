import { combineReducers } from 'redux';

// Reducers 
import authReducer from './authReducer';
import collectionReducer from './collectionReducer';

const rootReducer = combineReducers({
    authReducer, 
    collectionReducer
});

export default rootReducer;

