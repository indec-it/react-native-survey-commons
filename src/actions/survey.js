export const SURVEYS_FILTERED_FETCH_REQUESTED = 'SURVEYS_FILTERED_FETCH_REQUESTED';
export const SURVEYS_FILTERED_FETCH_RECEIVED = 'SURVEYS_FILTERED_FETCH_RECEIVED';

export const requestFilteredSurveys = filter => ({
    type: SURVEYS_FILTERED_FETCH_REQUESTED,
    filter
});

export const receiveFilteredSurveys = surveys => ({
    type: SURVEYS_FILTERED_FETCH_RECEIVED,
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
