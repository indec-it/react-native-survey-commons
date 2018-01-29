export const ALL_DWELLINGS_REQUESTED = 'ALL_DWELLINGS_REQUESTED';
export const ALL_DWELLINGS_RECEIVE = 'ALL_DWELLINGS_RECEIVE';

export const requestAllDwellings = () => ({
    type: ALL_DWELLINGS_REQUESTED
});

export const receiveAllDwellings = dwellings => ({
    type: ALL_DWELLINGS_RECEIVE,
    dwellings
});

export const FETCH_DWELLING_REQUESTED = 'FETCH_DWELLING_REQUESTED';
export const FETCH_DWELLING_RECEIVE = 'FETCH_DWELLING_RECEIVE';

export const requestFetchDwelling = id => ({
    type: FETCH_DWELLING_REQUESTED,
    id
});

export const receiveFetchDwelling = dwellings => ({
    type: FETCH_DWELLING_RECEIVE,
    dwellings
});
