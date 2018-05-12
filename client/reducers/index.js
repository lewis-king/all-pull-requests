import {combineReducers} from 'redux';
import pullRequests from './pullRequestsReducer';

const rootReducer = combineReducers({
    pullRequests
});

export default rootReducer;