import {
    ADDRESS_FETCH_SUCCEEDED,
    ADDRESSES_FETCH_BY_STATE_REQUESTED,
    ADDRESSES_FETCH_RECEIVED,
    AREAS_FETCH_RECEIVED,
    AREAS_FETCH_REQUESTED,
    DWELLING_FETCH_SUCCEEDED,
    DWELLING_UPDATE_REQUESTED,
    DWELLING_UPDATE_SUCCEEDED,
    HOUSEHOLD_CLOSE_VISIT_REQUESTED,
    HOUSEHOLD_CLOSE_VISIT_SUCCEEDED,
    HOUSEHOLD_FETCH_SUCCEEDED,
    HOUSEHOLD_UPDATE_REQUESTED,
    HOUSEHOLD_UPDATE_SUCCEEDED,
    HOUSEHOLDS_FETCH_SUCCEEDED,
    MEMBER_FETCH_SUCCEEDED,
    MEMBERS_FETCH_SUCCEEDED,
    MEMBERS_SAVE_REQUESTED,
    MEMBERS_SAVE_SUCCEEDED,
    MEMBER_SAVE_REQUESTED,
    MEMBER_SAVE_SUCCEEDED,
    SURVEY_CLOSE_REQUESTED,
    SURVEY_CLOSE_SUCCEEDED,
    SURVEY_FETCH_RECEIVED,
    SURVEY_FETCH_REQUESTED,
    SURVEY_SAVE_REQUESTED,
    SURVEY_SAVE_SUCCEEDED,
    UPDATE_SURVEY_REQUESTED,
    UPDATE_SURVEY_SUCCEEDED,
    DWELLING_FETCH_REQUESTED,
    HOUSEHOLD_FETCH_REQUESTED
} from '../actions/survey';

export default function (state = {surveys: {}}, action) {
    switch (action.type) {
        case ADDRESSES_FETCH_BY_STATE_REQUESTED:
            return {
                ...state, addresses: [], ups: action.ups, area: action.area, state: action.state
            };
        case ADDRESSES_FETCH_RECEIVED:
            return {...state, addresses: action.addresses, survey: null};
        case ADDRESS_FETCH_SUCCEEDED:
            return {...state, address: action.address};
        case AREAS_FETCH_REQUESTED:
            return {...state, areas: []};
        case AREAS_FETCH_RECEIVED:
            return {...state, areas: action.areas};
        case DWELLING_FETCH_REQUESTED:
            return {...state, households: [], members: []};
        case DWELLING_FETCH_SUCCEEDED:
            return {...state, dwelling: action.dwelling};
        case DWELLING_UPDATE_SUCCEEDED:
            return {...state, saving: false, survey: action.survey};
        case HOUSEHOLD_FETCH_REQUESTED:
            return {...state, members: []};
        case MEMBERS_FETCH_SUCCEEDED:
            return {...state, members: action.members};
        case HOUSEHOLD_FETCH_SUCCEEDED:
            return {...state, household: action.household};
        case HOUSEHOLD_UPDATE_SUCCEEDED:
            return {...state, saving: false, household: action.household};
        case HOUSEHOLDS_FETCH_SUCCEEDED:
            return {...state, households: action.households};
        case MEMBER_FETCH_SUCCEEDED:
        case MEMBER_SAVE_SUCCEEDED:
            return {...state, member: action.member, saving: false};
        case SURVEY_FETCH_REQUESTED:
            return {...state, survey: null};
        case SURVEY_FETCH_RECEIVED:
            return {...state, survey: action.survey};
        case HOUSEHOLD_CLOSE_VISIT_SUCCEEDED:
        case MEMBERS_SAVE_SUCCEEDED:
        case UPDATE_SURVEY_SUCCEEDED:
        case SURVEY_CLOSE_SUCCEEDED:
        case SURVEY_SAVE_SUCCEEDED:
            return {...state, saving: false};
        case DWELLING_UPDATE_REQUESTED:
        case MEMBERS_SAVE_REQUESTED:
        case HOUSEHOLD_CLOSE_VISIT_REQUESTED:
        case HOUSEHOLD_UPDATE_REQUESTED:
        case MEMBER_SAVE_REQUESTED:
        case UPDATE_SURVEY_REQUESTED:
        case SURVEY_CLOSE_REQUESTED:
        case SURVEY_SAVE_REQUESTED:
            return {...state, saving: true};
        default:
            return state;
    }
}
