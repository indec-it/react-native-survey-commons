/* eslint-disable import/prefer-default-export */
import {call, put} from 'redux-saga/effects';
import {size} from 'lodash';

import {handleErrorSync, handleSessionExpired, receiveSyncData, sendSyncData, completeSync} from '../actions/sync';
import {receiveSurveysQuantity} from '../actions/survey';
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

        yield put(receiveSurveysQuantity(size(surveyAddresses)));
    } catch (e) {
        yield put(handleErrorSync(e));
    }
}
