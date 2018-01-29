import {
    SURVEY_FETCH_REQUESTED,
    SURVEY_FETCH_RECEIVED,
    SURVEYS_FETCH_RECEIVED,
    SURVEYS_FETCH_REQUESTED
} from '../actions/survey';

export default function survey(state = {surveys: [], survey: null}, action) {
    switch (action.type) {
        case SURVEY_FETCH_REQUESTED:
            return {...state, survey: null};
        case SURVEY_FETCH_RECEIVED:
            return {...state, survey: action.survey};
        case SURVEYS_FETCH_REQUESTED:
            return {...state, surveys: []};
        case SURVEYS_FETCH_RECEIVED:
            return {...state, surveys: action.surveys};
        default:
            return state;
    }
}
