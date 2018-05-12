import {FETCH_OPEN_PULL_REQUEST} from '../actions/index';

export default function(state = null, action) {
    switch(action.type) {
        case FETCH_OPEN_PULL_REQUEST:
            return action.payload;
        default:
            return state;
    }
}