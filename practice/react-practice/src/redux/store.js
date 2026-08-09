
import { applyMiddleware, combineReducers, createStore } from 'redux';
import AuthReducer from './reducers/authReducer';
import loggerMiddleware from '../middleware/logMiddleware';

const combinedReducers = combineReducers({
    auth: AuthReducer
})

const store = createStore(combinedReducers, applyMiddleware(loggerMiddleware));

export default store