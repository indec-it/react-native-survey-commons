import {PING_REQUESTED, PING_SUCCEEDED, PING_FAILED, NETWORK_STATUS_SUCCEEDED} from '../actions/network';

export default function ping(state = {isConnected: false, isPinging: false}, action) {
    switch (action.type) {
        case PING_REQUESTED:
            return {...state, isPinging: true};
        case PING_SUCCEEDED:
            return {...state, isPinging: false, pong: action.pong};
        case PING_FAILED:
            return {...state, isPinging: false, pong: false};
        case NETWORK_STATUS_SUCCEEDED:
            return {...state, isConnected: action.isConnected};
        default:
            return state;
    }
}
