import {call, put} from 'redux-saga/effects';

import {receivePing, handleErrorPing, receiveNetworkStatus} from '../actions/network';
import PingService from '../services/ping';

export function* isConnected() {
    const connected = yield call(PingService.isConnected);
    yield put(receiveNetworkStatus(connected));
}

export function* ping({endpoint}) {
    try {
        const pong = yield call(PingService.ping, endpoint);
        yield put(receivePing(pong));
    } catch (e) {
        yield put(handleErrorPing(e));
    }
}
