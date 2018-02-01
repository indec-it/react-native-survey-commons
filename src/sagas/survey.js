import {call, put} from 'redux-saga/effects';
import {handleError} from '@indec/react-native-commons/sagas';

import {SurveysService} from '../services';
import {receiveAddresses, receiveAreas, receiveSurvey, notifySaveSucceeded} from '../actions/survey';

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

export function* fetchAddresses({area, ups}) {
    try {
        const addresses = yield call(SurveysService.fetchAddresses, ups, area);
        yield put(receiveAddresses(addresses));
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
