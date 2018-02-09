import {
    ADDRESS_FETCH_SUCCEEDED,
    ADDRESSES_FETCH_BY_STATE_REQUESTED,
    ADDRESSES_FETCH_RECEIVED,
    AREAS_FETCH_RECEIVED,
    AREAS_FETCH_REQUESTED,
    DWELLING_FETCH_SUCCEEDED,
    DWELLING_UPDATE_REQUESTED,
    DWELLING_UPDATE_SUCCEEDED,
    HOUSEHOLDS_FETCH_SUCCEEDED,
    MEMBERS_FETCH_SUCCEEDED,
    SURVEY_CLOSE_REQUESTED,
    SURVEY_CLOSE_SUCCEEDED,
    SURVEY_FETCH_RECEIVED,
    SURVEY_FETCH_REQUESTED,
    SURVEY_SAVE_REQUESTED,
    SURVEY_SAVE_SUCCEEDED,
    UPDATE_SURVEY_REQUESTED,
    UPDATE_SURVEY_SUCCEEDED
} from '../actions/survey';

export default function (state = {surveys: {}}, action) {
    switch (action.type) {
        case ADDRESSES_FETCH_BY_STATE_REQUESTED:
            return {
                ...state, addresses: [], ups: action.ups, area: action.area, state: action.state
            };
        case ADDRESSES_FETCH_RECEIVED:
            return {...state, addresses: action.addresses};
        case ADDRESS_FETCH_SUCCEEDED:
            return {...state, address: action.address};
        case AREAS_FETCH_REQUESTED:
            return {...state, areas: []};
        case AREAS_FETCH_RECEIVED:
            return {...state, areas: action.areas};
        case DWELLING_UPDATE_REQUESTED:
            return {...state, saving: true};
        case DWELLING_UPDATE_SUCCEEDED:
            return {...state, saving: false, survey: action.survey};
        case SURVEY_FETCH_REQUESTED:
            return {...state, survey: null, saving: true};
        case SURVEY_FETCH_RECEIVED:
            return {...state, survey: action.survey, saving: false};
        case DWELLING_FETCH_SUCCEEDED:
            return {...state, dwelling: action.dwelling};
        case MEMBERS_FETCH_SUCCEEDED:
            return {...state, members: action.members};
        case HOUSEHOLDS_FETCH_SUCCEEDED:
            return {...state, households: action.households};
        case UPDATE_SURVEY_REQUESTED:
            return {...state, saving: true};
        case UPDATE_SURVEY_SUCCEEDED:
            return {...state, saving: false};
        case SURVEY_CLOSE_REQUESTED:
            return {...state, saving: true};
        case SURVEY_CLOSE_SUCCEEDED:
            return {...state, saving: false};
        case SURVEY_SAVE_REQUESTED:
            return {...state, saving: true};
        case SURVEY_SAVE_SUCCEEDED:
            return {...state, saving: false};
        default:
            return state;
    }
}
