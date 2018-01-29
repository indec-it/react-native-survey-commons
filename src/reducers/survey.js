import {
    SURVEYS_FILTERED_FETCH_REQUESTED,
    SURVEYS_FILTERED_FETCH_RECEIVED,
    SURVEY_FETCH_REQUESTED,
    SURVEY_FETCH_RECEIVED
} from '../actions/survey';

export default function survey(state = {surveys: [], survey: null}, action) {
    switch (action.type) {
        case SURVEYS_FILTERED_FETCH_REQUESTED:
            return {...state, surveys: [], filter: action.filter};
        case SURVEYS_FILTERED_FETCH_RECEIVED:
            return {...state, surveys: action.surveys};
        case SURVEY_FETCH_REQUESTED:
            return {...state, survey: null};
        case SURVEY_FETCH_RECEIVED:
            return {...state, survey: action.survey};
        default:
            return state;
    }
}
