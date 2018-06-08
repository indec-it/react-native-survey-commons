const surveyAddressState = {
    OPEN: 1,
    IN_PROGRESS: 2,
    RESOLVED: 3,
    CLOSED: 4
};

const syncStatus = {
    NOT_STARTED: 'notStarted',
    LOADING_DATA: 'loadingData',
    SENDING_DATA: 'sendingData',
    SAVING_DATA: 'savingData',
    COMPLETED: 'completed',
    SESSION_EXPIRED: 'sessionExpired',
    HAS_ERROR: 'hasError'
};

const surveyDetailsTabs = {
    DWELLING_VISITS: 'dwellingVisits',
    HOUSEHOLDS_LIST: 'householdsList'
};

const addressesListTabs = [{
    id: surveyAddressState.OPENED,
    label: 'Pendientes'
}, {
    id: surveyAddressState.CLOSED,
    label: 'Cerradas'
}];

const surveyDetailsListTabs = [{
    id: surveyDetailsTabs.DWELLING_VISITS,
    label: 'Visitas vivienda'
}, {
    id: surveyDetailsTabs.HOUSEHOLDS_LIST,
    label: 'Lista de hogares'
}];

const answers = {
    YES: 1,
    NO: 2
};

export {addressesListTabs};
export {answers};
export {surveyAddressState};
export {syncStatus};
export {surveyDetailsListTabs};
export {surveyDetailsTabs};
