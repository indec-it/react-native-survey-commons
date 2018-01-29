import {
    SYNC_CLEAR_STATUS, SYNC_REQUESTED, SYNC_SUCCEEDED, SYNC_FAILED, SYNC_DATA_SENT,
    SYNC_DATA_RECEIVED
} from '../actions/sync';
import {enums} from '../constants';

export default function ping(state = {status: enums.syncStatus.NOT_STARTED}, action) {
    switch (action.type) {
        case SYNC_CLEAR_STATUS:
            return {...state, status: enums.syncStatus.NOT_STARTED};
        case SYNC_REQUESTED:
            return {...state, status: enums.syncStatus.LOADING_DATA};
        case SYNC_DATA_SENT:
            return {...state, status: enums.syncStatus.SENDING_DATA, count: action.count};
        case SYNC_DATA_RECEIVED:
            return {...state, status: enums.syncStatus.SAVING_DATA};
        case SYNC_SUCCEEDED:
            return {...state, status: enums.syncStatus.COMPLETED};
        case SYNC_FAILED:
            return {...state, status: enums.syncStatus.HAS_ERROR, err: action.err};
        default:
            return state;
    }
}
