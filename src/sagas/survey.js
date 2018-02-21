import {call, put} from 'redux-saga/effects';
import {handleError} from '@indec/react-native-commons/sagas';
import {toNumber} from 'lodash';

import {SurveysService} from '../services';
import {
    receiveAddress,
    receiveAddresses,
    receiveAreas,
    receiveDwelling,
    receiveHouseholds,
    notifySaveMembersSucceeded,
    receiveMembers,
    receiveSurvey,
    notifySaveSucceeded,
    notifyCloseSucceeded,
    receiveUpdatedDwelling,
    receiveHouseholdUpdated,
    receiveHousehold,
    receiveMember,
    notifyCloseHouseholdVisit
} from '../actions/survey';

export function* fetchAddressesByState({ups, area, state}) {
    try {
        const addresses = yield call(SurveysService.fetchAddressesBySurveyState, ups, area, state);
        yield put(receiveAddresses(addresses));
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

export function* saveSurvey({survey}) {
    try {
        yield call(SurveysService.save, survey);
        yield put(notifySaveSucceeded());
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* closeSurvey({id}) {
    try {
        yield call(SurveysService.closeSurvey, id);
        yield put(notifyCloseSucceeded());
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* findDwelling({id, dwellingOrder}) {
    try {
        const dwelling = yield call(SurveysService.findDwelling, id, dwellingOrder);
        yield put(receiveDwelling(dwelling));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* updateDwelling({id, dwelling}) {
    try {
        const survey = yield call(SurveysService.updateDwelling, id, dwelling);
        yield put(receiveUpdatedDwelling(survey));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* createHousehold({id, dwellingOrder}) {
    try {
        const dwelling = yield call(SurveysService.createHousehold, id, dwellingOrder);
        yield put(receiveDwelling(dwelling));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchHouseholds({id, dwelling}) {
    try {
        const households = yield call(SurveysService.fetchHouseholds, id, dwelling);
        yield put(receiveHouseholds(households));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchMembers({id, dwellingOrder, householdOrder}) {
    try {
        const members = yield call(SurveysService.getMembers, id, dwellingOrder, householdOrder);
        yield put(receiveMembers(members));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchAddress({id}) {
    try {
        const address = yield call(SurveysService.getAddress, id);
        yield put(receiveAddress(address));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* saveMembers({
    id, dwellingOrder, householdOrder, members
}) {
    try {
        yield call(SurveysService.saveMembers, id, dwellingOrder, householdOrder, members);
        yield put(notifySaveMembersSucceeded());
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* deleteHousehold({id, dwelling: dwellingOrder, household}) {
    try {
        const dwelling = yield call(SurveysService.deleteHousehold, id, dwellingOrder, household);
        yield put(receiveDwelling(dwelling));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* findHousehold({id, dwellingOrder, householdOrder}) {
    try {
        const household = yield call(SurveysService.findHousehold, id, dwellingOrder, householdOrder);
        yield put(receiveHousehold(household));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* updateHousehold({id, dwellingOrder, household}) {
    try {
        const updatedHousehold = yield call(SurveysService.updateHousehold, id, dwellingOrder, household);
        yield put(receiveHouseholdUpdated(updatedHousehold));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* findMember({
    id, dwellingOrder, householdOrder, memberOrder
}) {
    try {
        const member = yield call(SurveysService.findMember, id, dwellingOrder, householdOrder, memberOrder);
        yield put(receiveMember(member));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* saveMember({
    id, dwellingOrder, householdOrder, member
}) {
    try {
        const savedMember = yield call(SurveysService.saveMember, id, dwellingOrder, householdOrder, member);
        yield put(receiveMember(savedMember));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* createHouseholdVisit({household}) {
    try {
        const updatedHousehold = yield call(SurveysService.createHouseholdVisit, household);
        yield put(receiveHousehold(updatedHousehold));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* closeHouseholdVisit({id, dwellingOrder, householdOrder}) {
    try {
        yield call(SurveysService.closeHouseholdVisit, id, toNumber(dwellingOrder), toNumber(householdOrder));
        yield put(notifyCloseHouseholdVisit());
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* deleteMember({
    id, dwelling, household, member
}) {
    try {
        const members = yield call(SurveysService.deleteMember, id, dwelling, household, member);
        yield put(receiveMembers(members));
    } catch (err) {
        yield put(handleError(err));
    }
}
