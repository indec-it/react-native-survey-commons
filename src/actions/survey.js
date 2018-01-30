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

export const requestSurvey = (area, ups) => ({
    type: SURVEY_FETCH_REQUESTED,
    area,
    ups
});

export const receiveSurvey = survey => ({
    type: SURVEY_FETCH_RECEIVED,
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
