/* eslint-disable import/prefer-default-export */
import {call, put} from 'redux-saga/effects';

import {handleErrorSync, receiveSyncData, sendSyncData, completeSync} from '../actions/sync';
import SyncService from '../services/sync';
import SurveysService from '../services/surveys';

export function* sync({endpoint}) {
    try {
        const surveys = yield call(SurveysService.findAll);

        yield put(sendSyncData(surveys.length));

        const {surveyAddresses} = yield call(SyncService.sync, surveys, endpoint);

        yield put(receiveSyncData(surveyAddresses));

        yield call(SurveysService.removeAll);

        yield call(SurveysService.save, surveyAddresses);

        yield put(completeSync(surveyAddresses));
    } catch (e) {
        yield put(handleErrorSync(e));
    }
}
