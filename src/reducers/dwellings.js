import {
    ALL_DWELLINGS_REQUESTED,
    FETCH_DWELLING_REQUESTED,
    ALL_DWELLINGS_RECEIVE,
    FETCH_DWELLING_RECEIVE
} from '../actions/dwellings';

export default function ping(state = {dwellings: [], dwelling: {}}, action) {
    switch (action.type) {
        case ALL_DWELLINGS_REQUESTED:
            return {...state, dwellings: []};
        case ALL_DWELLINGS_RECEIVE:
            return {...state, dwellings: action.dwellings};
        case FETCH_DWELLING_REQUESTED:
            return {...state, dwelling: {}};
        case FETCH_DWELLING_RECEIVE:
            return {...state, dwelling: action.dwelling};
        default:
            return state;
    }
}
