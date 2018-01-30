import {call, put} from 'redux-saga/effects';
import {handleError} from '@indec/react-native-commons/sagas';

import {SurveysService} from '../services';
import {receiveSurvey, receiveSurveys, receiveAreas} from '../actions/survey';

export function* fetchSurveysByState({state}) {
    try {
        const surveys = yield call(SurveysService.fetchByState, state);
        yield put(receiveSurveys(surveys));
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
