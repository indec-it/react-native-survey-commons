/* eslint-disable import/prefer-default-export */
import {call, put} from 'redux-saga/effects';
import {handleError} from '@indec/react-native-commons/actions';

import {surveys as SurveysService} from '../services';
import {receiveAreas} from '../actions/survey';

export function* fetchAreas() {
    try {
        const areas = yield call(SurveysService.fetchAreas);
        yield put(receiveAreas(areas));
    } catch (err) {
        yield put(handleError(err));
    }
}
