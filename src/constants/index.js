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
    HAS_ERROR: 'hasError'
};

const addressesListTabs = [
    {id: surveyAddressState.OPENED, label: 'Pendientes'},
    {id: surveyAddressState.CLOSED, label: 'Cerradas'}
];

export {surveyAddressState};
export {syncStatus};
export {addressesListTabs};
