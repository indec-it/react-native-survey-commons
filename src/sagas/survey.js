import {call, put} from 'redux-saga/effects';
import {handleError} from '@indec/react-native-commons/sagas';

import {SurveysService} from '../services';
import {
    receiveAddress,
    receiveAddresses,
    receiveAreas,
    receiveDwelling,
    receiveHouseholds,
    receiveMembers,
    receiveSurvey,
    notifySaveSucceeded,
    notifyCloseSucceeded,
    receiveUpdatedDwelling
} from '../actions/survey';

export function* fetchAddressesByState({ups, area, state}) {
    try {
        const addresses = yield call(SurveysService.fetchAddressesBySurveyState, ups, area, state);
        yield put(receiveAddresses(addresses));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* findSurvey({id}) {
    try {
        const survey = yield call(SurveysService.findById, id);
        yield put(receiveSurvey(survey));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchAreas() {
    try {
        const areas = yield call(SurveysService.fetchAreas);
        yield put(receiveAreas(areas));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* saveSurvey({survey}) {
    try {
        yield call(SurveysService.save, survey);
        yield put(notifySaveSucceeded());
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* closeSurvey({id}) {
    try {
        yield call(SurveysService.closeSurvey, id);
        yield put(notifyCloseSucceeded());
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* findDwelling({id, order}) {
    try {
        const dwelling = yield call(SurveysService.findDwelling, id, order);
        yield put(receiveDwelling(dwelling));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* createHousehold({dwelling}) {
    try {
        const updatedDwelling = yield call(SurveysService.addHouseholdToDwelling, dwelling);
        yield put(receiveDwelling(updatedDwelling));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* updateDwelling({id, dwelling}) {
    try {
        const survey = yield call(SurveysService.updateDwelling, id, dwelling);
        yield put(receiveUpdatedDwelling(survey));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchHouseholds({id, dwelling}) {
    try {
        const households = yield call(SurveysService.fetchHouseholds, id, dwelling);
        yield put(receiveHouseholds(households));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchMembers({id, dwelling, household}) {
    try {
        const members = yield call(SurveysService.getMembers, id, dwelling, household);
        yield put(receiveMembers(members));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchAddress({id}) {
    try {
        const address = yield call(SurveysService.getAddress, id);
        yield put(receiveAddress(address));
    } catch (err) {
        yield put(handleError(err));
    }
}
