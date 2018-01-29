export const FETCH_SURVEY_REQUESTED = 'FETCH_SURVEY_REQUESTED';
export const FETCH_SURVEY_RECEIVED = 'FETCH_SURVEY_RECEIVED';

export const requestFetchSurvey = (area, ups) => ({
    type: FETCH_SURVEY_REQUESTED,
    area,
    ups
});

export const receiveFetchSurvey = survey => ({
    type: FETCH_SURVEY_RECEIVED,
    survey
});

export const FETCH_AREAS_REQUESTED = 'FETCH_AREAS_REQUESTED';
export const FETCH_AREAS_SUCCEEDED = 'FETCH_AREAS_SUCCEEDED';

export const requestAreas = () => ({
    type: FETCH_AREAS_REQUESTED
});

export const receiveAreas = areas => ({
    type: FETCH_AREAS_SUCCEEDED,
    areas
});

export const SAVE_SURVEY_REQUESTED = 'SAVE_SURVEY_REQUESTED';
export const SAVE_SURVEY_RECEIVED = 'SAVE_SURVEY_RECEIVED';

export const requestSaveSurveyAndFinalize = survey => ({
    type: SAVE_SURVEY_REQUESTED,
    survey
});

export const receiveSaveSurveyAndFinalize = survey => ({
    type: SAVE_SURVEY_RECEIVED,
    survey
});
