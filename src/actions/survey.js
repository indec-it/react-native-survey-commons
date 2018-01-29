export const SURVEYS_FETCH_REQUESTED = 'SURVEYS_FETCH_REQUESTED';
export const SURVEYS_FETCH_RECEIVED = 'SURVEYS_FETCH_RECEIVED';

export const requestSurveys = () => ({
    type: SURVEYS_FETCH_REQUESTED
});

export const receiveSurveys = surveys => ({
    type: SURVEYS_FETCH_RECEIVED,
    surveys
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
