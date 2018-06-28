/* eslint-disable import/prefer-default-export */
import {call, put} from 'redux-saga/effects';

import {
    handleErrorSync, handleSessionExpired, receiveSyncData, sendSyncData, completeSync
} from '../actions/sync';
import {SyncService, SurveysService} from '../services';

export function* sync({endpoint}) {
    try {
        const surveys = yield call(SurveysService.findAll);

        yield put(sendSyncData(surveys));

        const {surveyAddresses, tokenExpired} = yield call(SyncService.sync, surveys, endpoint);

        if (tokenExpired) {
            yield put(handleSessionExpired());
            return;
        }

        yield put(receiveSyncData(surveyAddresses));

        yield call(SurveysService.removeAll);

        yield call(SurveysService.save, surveyAddresses);

        yield put(completeSync());
    } catch (e) {
        yield put(handleErrorSync(e));
    }
}
