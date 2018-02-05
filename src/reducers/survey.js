import {
    ADDRESSES_FETCH_BY_STATE_REQUESTED,
    ADDRESSES_FETCH_RECEIVED,
    AREAS_FETCH_RECEIVED,
    AREAS_FETCH_REQUESTED,
    DWELLING_FETCH_SUCCEEDED,
    HOUSEHOLDS_FETCH_SUCCEEDED,
    MEMBERS_FETCH_SUCCEEDED,
    SURVEY_FETCH_RECEIVED,
    SURVEY_FETCH_REQUESTED
} from '../actions/survey';

export default function (state = {surveys: {}}, action) {
    switch (action.type) {
        case ADDRESSES_FETCH_BY_STATE_REQUESTED:
            return {
                ...state, addresses: [], ups: action.ups, area: action.area, state: action.state
            };
        case ADDRESSES_FETCH_RECEIVED:
            return {...state, addresses: action.addresses};
        case AREAS_FETCH_REQUESTED:
            return {...state, areas: []};
        case AREAS_FETCH_RECEIVED:
            return {...state, areas: action.areas};
        case SURVEY_FETCH_REQUESTED:
            return {...state, survey: null};
        case SURVEY_FETCH_RECEIVED:
            return {...state, survey: action.survey};
        case DWELLING_FETCH_SUCCEEDED:
            return {...state, survey: action.survey, dwelling: action.dwelling};
        case MEMBERS_FETCH_SUCCEEDED:
            return {...state, members: action.members};
        case HOUSEHOLDS_FETCH_SUCCEEDED:
            return {...state, households: action.households};
        default:
            return state;
    }
}
