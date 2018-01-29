const surveyState = {
    OPENED: 1,
    CLOSED: 2
};

const syncStatus = {
    NOT_STARTED: 'notStarted',
    LOADING_DATA: 'loadingData',
    SENDING_DATA: 'sendingData',
    SAVING_DATA: 'savingData',
    COMPLETED: 'completed',
    HAS_ERROR: 'hasError'
};

const surveyList = [
    {idGroup: surveyState.OPENED, tabName: 'Pendientes'},
    {idGroup: surveyState.CLOSED, tabName: 'Cerradas'}
];

export {surveyState};
export {syncStatus};
export {surveyList};
