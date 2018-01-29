import {call, put} from 'redux-saga/effects';
import {handleError} from '@indec/react-native-commons/sagas';

import {SurveysService} from '../services';
import {receiveSurvey, receiveFilteredSurveys} from '../actions/survey';

export function* fetchFilteredSurveys({filter}) {
    try {
        const surveys = yield call(SurveysService.filteredSearch, filter);
        yield put(receiveFilteredSurveys(surveys));
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
