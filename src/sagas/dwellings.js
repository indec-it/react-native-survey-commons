import {call, put} from 'redux-saga/effects';

import {DwellingsService} from '../services';
import {handleError} from '../actions/common';
import {receiveAllDwellings, receiveFetchDwelling} from '../actions/dwellings';

export function* findAllDwellings() {
    try {
        const dwellings = yield call(DwellingsService.findAll);
        yield put(receiveAllDwellings(dwellings));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchDwelling({id}) {
    try {
        const dwelling = yield call(DwellingsService.findById, id);
        yield put(receiveFetchDwelling(dwelling));
    } catch (err) {
        yield put(handleError(err));
    }
}
