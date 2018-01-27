export const NETWORK_STATUS_REQUESTED = 'NETWORK_STATUS_REQUESTED';
export const NETWORK_STATUS_SUCCEEDED = 'NETWORK_STATUS_SUCCEEDED';

export const requestNetworkStatus = () => ({
    type: NETWORK_STATUS_REQUESTED
});

export const receiveNetworkStatus = isConnected => ({
    type: NETWORK_STATUS_SUCCEEDED,
    isConnected
});

export const PING_REQUESTED = 'PING_REQUESTED';
export const PING_SUCCEEDED = 'PING_SUCCEEDED';
export const PING_FAILED = 'PING_FAILED';

export const requestPing = endpoint => ({
    type: PING_REQUESTED,
    endpoint
});

export const receivePing = pong => ({
    type: PING_SUCCEEDED,
    pong
});

export const handleErrorPing = e => ({
    type: PING_FAILED,
    message: e.message
});
