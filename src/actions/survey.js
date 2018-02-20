export const ADDRESSES_FETCH_BY_STATE_REQUESTED = 'ADDRESSES_FETCH_BY_STATE_REQUESTED';
export const ADDRESSES_FETCH_RECEIVED = 'ADDRESSES_FETCH_RECEIVED';

export const requestAddressesBySurveyState = (ups, area, state) => ({
    type: ADDRESSES_FETCH_BY_STATE_REQUESTED,
    ups,
    area,
    state
});

export const receiveAddresses = addresses => ({
    type: ADDRESSES_FETCH_RECEIVED,
    addresses
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

export const AREAS_FETCH_REQUESTED = 'AREAS_FETCH_REQUESTED';
export const AREAS_FETCH_RECEIVED = 'AREAS_FETCH_RECEIVED';

export const requestAreas = () => ({
    type: AREAS_FETCH_REQUESTED
});

export const receiveAreas = areas => ({
    type: AREAS_FETCH_RECEIVED,
    areas
});

export const SURVEY_CLOSE_REQUESTED = 'SURVEY_CLOSE_REQUESTED';
export const SURVEY_CLOSE_SUCCEEDED = 'SURVEY_CLOSE_SUCCEEDED';

export const requestCloseSurvey = id => ({
    type: SURVEY_CLOSE_REQUESTED,
    id
});

export const notifyCloseSucceeded = () => ({
    type: SURVEY_CLOSE_SUCCEEDED
});

export const SURVEY_SAVE_REQUESTED = 'SURVEY_SAVE_REQUESTED';
export const SURVEY_SAVE_SUCCEEDED = 'SURVEY_SAVE_SUCCEEDED';

export const requestSaveSurvey = survey => ({
    type: SURVEY_SAVE_REQUESTED,
    survey
});

export const notifySaveSucceeded = () => ({
    type: SURVEY_SAVE_SUCCEEDED
});

export const DWELLING_FETCH_REQUESTED = 'DWELLING_FETCH_REQUESTED';
export const DWELLING_FETCH_SUCCEEDED = 'DWELLING_FETCH_SUCCEEDED';

export const requestDwelling = (id, dwellingOrder) => ({
    type: DWELLING_FETCH_REQUESTED,
    id,
    dwellingOrder
});

export const receiveDwelling = dwelling => ({
    type: DWELLING_FETCH_SUCCEEDED,
    dwelling
});

export const DWELLING_UPDATE_REQUESTED = 'DWELLING_UPDATE_REQUESTED';
export const DWELLING_UPDATE_SUCCEEDED = 'DWELLING_UPDATE_SUCCEEDED';

export const requestUpdateDwelling = (id, dwelling) => ({
    type: DWELLING_UPDATE_REQUESTED,
    id,
    dwelling
});

export const receiveUpdatedDwelling = survey => ({
    type: DWELLING_UPDATE_SUCCEEDED,
    survey
});

export const HOUSEHOLD_CREATE_REQUESTED = 'HOUSEHOLD_CREATE_REQUESTED';

export const requestCreateHousehold = (id, dwellingOrder) => ({
    type: HOUSEHOLD_CREATE_REQUESTED,
    id,
    dwellingOrder
});

export const HOUSEHOLDS_FETCH_REQUESTED = 'HOUSEHOLDS_FETCH_REQUESTED';
export const HOUSEHOLDS_FETCH_SUCCEEDED = 'HOUSEHOLDS_FETCH_SUCCEEDED';

export const requestHouseholds = (id, dwelling) => ({
    type: HOUSEHOLDS_FETCH_REQUESTED,
    id,
    dwelling
});

export const receiveHouseholds = households => ({
    type: HOUSEHOLDS_FETCH_SUCCEEDED,
    households
});

export const MEMBERS_FETCH_REQUESTED = 'MEMBERS_FETCH_REQUESTED';
export const MEMBERS_FETCH_SUCCEEDED = 'MEMBERS_FETCH_SUCCEEDED';

export const requestMembers = (id, dwelling, household) => ({
    type: MEMBERS_FETCH_REQUESTED,
    id,
    dwelling,
    household
});

export const receiveMembers = members => ({
    type: MEMBERS_FETCH_SUCCEEDED,
    members
});

export const ADDRESS_FETCH_REQUESTED = 'ADDRESS_FETCH_REQUESTED';
export const ADDRESS_FETCH_SUCCEEDED = 'ADDRESS_FETCH_SUCCEEDED';

export const requestAddress = id => ({
    type: ADDRESS_FETCH_REQUESTED,
    id
});

export const receiveAddress = address => ({
    type: ADDRESS_FETCH_SUCCEEDED,
    address
});

export const HOUSEHOLD_FETCH_REQUESTED = 'HOUSEHOLD_FETCH_REQUESTED';
export const HOUSEHOLD_FETCH_SUCCEEDED = 'HOUSEHOLD_FETCH_SUCCEEDED';

export const requestHousehold = (id, dwellingOrder, householdOrder) => ({
    type: HOUSEHOLD_FETCH_REQUESTED,
    id,
    dwellingOrder,
    householdOrder
});

export const receiveHousehold = household => ({
    type: HOUSEHOLD_FETCH_SUCCEEDED,
    household
});

export const HOUSEHOLD_UPDATE_REQUESTED = 'HOUSEHOLD_UPDATE_REQUESTED';
export const HOUSEHOLD_UPDATE_SUCCEEDED = 'HOUSEHOLD_UPDATE_SUCCEEDED';

export const requestUpdateHousehold = (id, dwellingOrder, household) => ({
    type: HOUSEHOLD_UPDATE_REQUESTED,
    id,
    dwellingOrder,
    household
});

export const receiveHouseholdUpdated = household => ({
    type: HOUSEHOLD_UPDATE_SUCCEEDED,
    household
});

export const MEMBER_FETCH_REQUESTED = 'MEMBER_FETCH_REQUESTED';
export const MEMBER_FETCH_SUCCEEDED = 'MEMBER_FETCH_SUCCEEDED';

export const requestMember = (id, dwellingOrder, householdOrder, memberOrder) => ({
    type: MEMBER_FETCH_REQUESTED,
    id,
    dwellingOrder,
    householdOrder,
    memberOrder
});

export const receiveMember = member => ({
    type: MEMBER_FETCH_SUCCEEDED,
    member
});

export const MEMBER_SAVE_REQUESTED = 'MEMBER_SAVE_REQUESTED';
export const MEMBER_SAVE_SUCCEEDED = 'MEMBER_SAVE_SUCCEEDED';

export const requestSaveMember = (id, dwellingOrder, householdOrder, member) => ({
    type: MEMBER_SAVE_REQUESTED,
    id,
    dwellingOrder,
    householdOrder,
    member
});

export const receiveSavedMember = member => ({
    type: MEMBER_SAVE_SUCCEEDED,
    member
});

export const HOUSEHOLD_CREATE_VISIT_REQUESTED = 'HOUSEHOLD_CREATE_VISIT_REQUESTED';

export const requestCreateHouseholdVisit = household => ({
    type: HOUSEHOLD_CREATE_VISIT_REQUESTED,
    household
});
