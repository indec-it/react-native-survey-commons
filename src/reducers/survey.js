import {
    ADDRESS_FETCH_SUCCEEDED,
    ADDRESSES_FETCH_BY_STATE_REQUESTED,
    ADDRESSES_FETCH_RECEIVED,
    AREAS_FETCH_RECEIVED,
    AREAS_FETCH_REQUESTED,
    DWELLING_FETCH_REQUESTED,
    DWELLING_FETCH_SUCCEEDED,
    DWELLING_UPDATE_REQUESTED,
    DWELLING_UPDATE_SUCCEEDED,
    DWELLING_VISIT_CLOSE_REQUESTED,
    DWELLING_VISIT_CLOSE_SUCCEEDED,
    HOUSEHOLD_VISIT_CLOSE_REQUESTED,
    HOUSEHOLD_VISIT_CLOSE_SUCCEEDED,
    CURRENT_VISIT_DWELLING_FETCH_REQUESTED,
    CURRENT_VISIT_DWELLING_FETCH_SUCCEEDED,
    CURRENT_HOUSEHOLD_VISIT_FETCH_REQUESTED,
    CURRENT_HOUSEHOLD_VISIT_FETCH_SUCCEEDED,
    DWELLING_VISITS_FETCH_REQUESTED,
    DWELLING_VISITS_FETCH_SUCCEEDED,
    HOUSEHOLD_FETCH_SUCCEEDED,
    HOUSEHOLD_INTERRUPT_REQUESTED,
    HOUSEHOLD_INTERRUPT_SUCCEEDED,
    HOUSEHOLD_UPDATE_REQUESTED,
    HOUSEHOLD_UPDATE_SUCCEEDED,
    HOUSEHOLD_VISITS_FETCH_REQUESTED,
    HOUSEHOLD_VISITS_FETCH_SUCCEEDED,
    HOUSEHOLDS_FETCH_SUCCEEDED,
    MEMBER_FETCH_SUCCEEDED,
    MEMBERS_FETCH_SUCCEEDED,
    MEMBER_INTERRUPT_REQUESTED,
    MEMBER_INTERRUPT_SUCCEEDED,
    MEMBERS_SAVE_REQUESTED,
    MEMBERS_SAVE_SUCCEEDED,
    MEMBER_SAVE_REQUESTED,
    SURVEY_CLOSE_REQUESTED,
    SURVEY_CLOSE_SUCCEEDED,
    SURVEY_FETCH_RECEIVED,
    SURVEY_FETCH_REQUESTED,
    SURVEY_SAVE_REQUESTED,
    SURVEY_SAVE_SUCCEEDED,
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
        case CURRENT_HOUSEHOLD_VISIT_FETCH_REQUESTED:
            return {...state, currentHouseholdVisit: null};
        case CURRENT_HOUSEHOLD_VISIT_FETCH_SUCCEEDED:
            return {...state, currentHouseholdVisit: action.currentHouseholdVisit};
        case DWELLING_FETCH_REQUESTED:
            return {...state, households: [], members: []};
        case DWELLING_FETCH_SUCCEEDED:
            return {...state, dwelling: action.dwelling};
        case DWELLING_UPDATE_SUCCEEDED:
            return {...state, saving: false, dwelling: action.dwelling};
        case CURRENT_VISIT_DWELLING_FETCH_REQUESTED:
            return {...state, currentDwellingVisit: null};
        case CURRENT_VISIT_DWELLING_FETCH_SUCCEEDED:
            return {...state, currentDwellingVisit: action.currentDwellingVisit};
        case DWELLING_VISITS_FETCH_REQUESTED:
            return {...state, dwellingVisits: null};
        case DWELLING_VISITS_FETCH_SUCCEEDED:
            return {...state, dwellingVisits: action.dwellingVisits};
        case HOUSEHOLD_FETCH_REQUESTED:
            return {...state, members: []};
        case HOUSEHOLD_INTERRUPT_REQUESTED:
            return {...state, household: action.household, interrupting: false};
        case HOUSEHOLD_INTERRUPT_SUCCEEDED:
            return {...state, interrupting: true};
        case MEMBERS_FETCH_SUCCEEDED:
            return {...state, members: action.members};
        case HOUSEHOLD_FETCH_SUCCEEDED:
            return {...state, household: action.household};
        case HOUSEHOLD_UPDATE_SUCCEEDED:
            return {...state, saving: false, household: action.household};
        case HOUSEHOLD_VISITS_FETCH_REQUESTED:
            return {...state, householdVisits: []};
        case HOUSEHOLD_VISITS_FETCH_SUCCEEDED:
            return {...state, householdVisits: action.householdVisits};
        case HOUSEHOLDS_FETCH_SUCCEEDED:
            return {...state, households: action.households};
        case MEMBER_FETCH_SUCCEEDED:
            return {...state, member: action.member, saving: false};
        case MEMBER_INTERRUPT_REQUESTED:
            return {...state, member: action.member, interrupting: false};
        case MEMBER_INTERRUPT_SUCCEEDED:
            return {...state, interrupting: true};
        case SURVEY_FETCH_REQUESTED:
            return {...state, survey: null};
        case SURVEY_FETCH_RECEIVED:
            return {...state, survey: action.survey};
        case DWELLING_VISIT_CLOSE_SUCCEEDED:
        case HOUSEHOLD_VISIT_CLOSE_SUCCEEDED:
        case MEMBERS_SAVE_SUCCEEDED:
        case SURVEY_CLOSE_SUCCEEDED:
        case SURVEY_SAVE_SUCCEEDED:
            return {...state, saving: false};
        case DWELLING_VISIT_CLOSE_REQUESTED:
        case DWELLING_UPDATE_REQUESTED:
        case MEMBERS_SAVE_REQUESTED:
        case HOUSEHOLD_VISIT_CLOSE_REQUESTED:
        case HOUSEHOLD_UPDATE_REQUESTED:
        case MEMBER_SAVE_REQUESTED:
        case SURVEY_CLOSE_REQUESTED:
        case SURVEY_SAVE_REQUESTED:
            return {...state, saving: true};
        default:
            return state;
    }
}
