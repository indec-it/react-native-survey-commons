import {
    SURVEYS_FETCH_BY_STATE_REQUESTED,
    SURVEYS_FETCH_RECEIVED,
    SURVEY_FETCH_REQUESTED,
    SURVEY_FETCH_RECEIVED,
    AREAS_FETCH_RECEIVED
} from '../actions/survey';

export default function (state = {surveys: {}}, action) {
    switch (action.type) {
        case SURVEYS_FETCH_BY_STATE_REQUESTED:
            return {...state, surveys: [], state: action.state};
        case SURVEYS_FETCH_RECEIVED:
            return {...state, surveys: action.surveys};
        case SURVEY_FETCH_REQUESTED:
            return {...state, survey: null};
        case SURVEY_FETCH_RECEIVED:
            return {...state, survey: action.survey};
        case AREAS_FETCH_RECEIVED:
            return {...state, areas: action.areas};
        default:
            return state;
    }
}
