import {call, put} from 'redux-saga/effects';

import {SurveysService} from '../services';
import {handleError} from '../actions/common';
import {receiveSurvey, receiveSurveys} from '../actions/survey';

export function* fetchSurveys() {
    try {
        const surveys = yield call(SurveysService.findAll);
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
