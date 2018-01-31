export const ADDRESSES_FETCH_BY_STATE_REQUESTED = 'ADDRESSES_FETCH_BY_STATE_REQUESTED';

export const requestAddressesBySurveyState = (ups, area, state) => ({
    type: ADDRESSES_FETCH_BY_STATE_REQUESTED,
    ups,
    area,
    state
});

export const SURVEY_FETCH_REQUESTED = 'SURVEY_FETCH_REQUESTED';
export const SURVEY_FETCH_RECEIVED = 'SURVEY_FETCH_RECEIVED';

export const requestSurvey = id => ({
    type: SURVEY_FETCH_REQUESTED,
    id
});

export const receiveSurvey = survey => ({
    type: SURVEY_FETCH_RECEIVED,
    survey
});

export const AREAS_FETCH_REQUESTED = 'AREAS_FETCH_REQUESTED';
export const AREAS_FETCH_RECEIVED = 'AREAS_FETCH_RECEIVED';

export const requestAreas = () => ({
    type: AREAS_FETCH_REQUESTED
});

export const receiveAreas = areas => ({
    type: AREAS_FETCH_RECEIVED,
    areas
});

export const ADDRESSES_FETCH_REQUESTED = 'ADDRESSES_FETCH_REQUESTED';
export const ADDRESSES_FETCH_RECEIVED = 'ADDRESSES_FETCH_RECEIVED';

export const requestAddresses = (ups, area) => ({
    type: ADDRESSES_FETCH_REQUESTED,
    ups,
    area
});

export const receiveAddresses = addresses => ({
    type: ADDRESSES_FETCH_RECEIVED,
    addresses
});

export const SURVEY_SAVE_REQUESTED = 'SURVEY_SAVE_REQUESTED';
export const SURVEY_SAVE_RECEIVED = 'SURVEY_SAVE_RECEIVED';

export const requestSaveSurveyAndFinalize = survey => ({
    type: SURVEY_SAVE_REQUESTED,
    survey
});

export const receiveSaveSurveyAndFinalize = survey => ({
    type: SURVEY_SAVE_RECEIVED,
    survey
});
