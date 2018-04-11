import {
    SYNC_CLEAR_STATUS, SYNC_REQUESTED, SYNC_SUCCEEDED, SYNC_FAILED, SYNC_DATA_SENT,
    SYNC_DATA_RECEIVED, SYNC_SESSION_EXPIRED
} from '../actions/sync';
import {syncStatus as syncStatusEnum} from '../constants';

export default function ping(state = {status: syncStatusEnum.NOT_STARTED}, action) {
    switch (action.type) {
        case SYNC_CLEAR_STATUS:
            return {
                ...state,
                status: syncStatusEnum.NOT_STARTED
            };
        case SYNC_REQUESTED:
            return {
                ...state,
                status: syncStatusEnum.LOADING_DATA
            };
        case SYNC_DATA_SENT:
            return {
                ...state,
                status: syncStatusEnum.SENDING_DATA,
                count: action.count
            };
        case SYNC_DATA_RECEIVED:
            return {
                ...state,
                status: syncStatusEnum.SAVING_DATA
            };
        case SYNC_SUCCEEDED:
            return {
                ...state,
                status: syncStatusEnum.COMPLETED
            };
        case SYNC_SESSION_EXPIRED:
            return {
                ...state,
                status: syncStatusEnum.SESSION_EXPIRED
            };
        case SYNC_FAILED:
            return {
                ...state,
                status: syncStatusEnum.HAS_ERROR,
                err: action.err
            };
        default:
            return state;
    }
}
