import {
    SURVEYS_FILTERED_FETCH_REQUESTED,
    SURVEYS_FILTERED_FETCH_RECEIVED,
    SURVEY_FETCH_REQUESTED,
    SURVEY_FETCH_RECEIVED,
    FETCH_AREAS_SUCCEEDED
} from '../actions/survey';

export default function (state = {surveys: {}}, action) {
    switch (action.type) {
        case SURVEYS_FILTERED_FETCH_REQUESTED:
            return {...state, surveys: [], filter: action.filter};
        case SURVEYS_FILTERED_FETCH_RECEIVED:
            return {...state, surveys: action.surveys};
        case SURVEY_FETCH_REQUESTED:
            return {...state, survey: null};
        case SURVEY_FETCH_RECEIVED:
            return {...state, survey: action.survey};
        case FETCH_AREAS_SUCCEEDED:
            return {...state, areas: action.areas};
        default:
            return state;
    }
}
