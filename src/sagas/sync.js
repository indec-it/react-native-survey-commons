/* eslint-disable import/prefer-default-export */
import {call, put} from 'redux-saga/effects';

import {handleErrorSync, receiveSyncData, sendSyncData, completeSync} from '../actions/sync';
import {SyncService, SurveysService} from '../services';

export function* sync({endpoint}) {
    try {
        const surveys = yield call(SurveysService.findAll);

        yield put(sendSyncData(surveys));

        const {surveyAddress} = yield call(SyncService.sync, surveys, endpoint);

        yield put(receiveSyncData(surveyAddress));

        yield call(SurveysService.removeAll);

        yield call(SurveysService.save, surveyAddress);

        yield put(completeSync());
    } catch (e) {
        yield put(handleErrorSync(e));
    }
}
