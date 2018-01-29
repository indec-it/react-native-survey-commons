export const SYNC_CLEAR_STATUS = 'SYNC_CLEAR_STATUS';
export const SYNC_REQUESTED = 'SYNC_REQUESTED';
export const SYNC_DATA_SENT = 'SYNC_DATA_SENT';
export const SYNC_DATA_RECEIVED = 'SYNC_DATA_RECEIVED';
export const SYNC_SUCCEEDED = 'SYNC_SUCCEEDED';
export const SYNC_FAILED = 'SYNC_FAILED';
export const SYNC_CLEAR_DATA = 'SYNC_CLEAR_DATA';

export const cleanSyncStatus = () => ({
    type: SYNC_CLEAR_STATUS
});

export const requestSync = endpoint => ({
    type: SYNC_REQUESTED,
    endpoint
});

export const syncClearData = () => ({
    type: SYNC_CLEAR_DATA
});

export const sendSyncData = count => ({
    type: SYNC_DATA_SENT,
    count
});

export const receiveSyncData = () => ({
    type: SYNC_DATA_RECEIVED
});

export const completeSync = () => ({
    type: SYNC_SUCCEEDED
});

export const handleErrorSync = err => ({
    type: SYNC_FAILED,
    err: err.message
});
