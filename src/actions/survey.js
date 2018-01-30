export const SURVEYS_FETCH_BY_STATE_REQUESTED = 'SURVEYS_FETCH_BY_STATE_REQUESTED';
export const SURVEYS_FETCH_RECEIVED = 'SURVEYS_FETCH_RECEIVED';

export const requestSurveysByState = state => ({
    type: SURVEYS_FETCH_BY_STATE_REQUESTED,
    state
});

export const receiveSurveys = surveys => ({
    type: SURVEYS_FETCH_RECEIVED,
    surveys
});

export const SURVEY_FETCH_REQUESTED = 'SURVEY_FETCH_REQUESTED';
export const SURVEY_FETCH_RECEIVED = 'SURVEY_FETCH_RECEIVED';

export const requestSurvey = (area, ups) => ({
    type: SURVEY_FETCH_REQUESTED,
    area,
    ups
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
