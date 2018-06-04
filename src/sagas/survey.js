import {call, put} from 'redux-saga/effects';
import {notifyDataCleared, handleError} from '@indec/react-native-commons/actions';
import {toNumber} from 'lodash';

import {SurveysService} from '../services';
import {
    receiveAddress,
    receiveAddresses,
    receiveAreas,
    receiveDwelling,
    receiveDwellingVisits,
    receiveDwellings,
    receiveHousehold,
    receiveHouseholdUpdated,
    receiveHouseholdVisits,
    receiveHouseholds,
    receiveMember,
    receiveMembers,
    receiveSurvey,
    receiveUpdatedDwelling,
    notifyCloseHouseholdVisit,
    notifyCloseSucceeded,
    notifyInterruptHouseholdSucceeded,
    notifyInterruptMemberSucceeded,
    notifySaveMembersSucceeded,
    notifySaveSucceeded
} from '../actions/survey';

export function* fetchAreas() {
    try {
        const areas = yield call(SurveysService.fetchAreas);
        yield put(receiveAreas(areas));
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

export function* fetchAddressesByState({ups, area, state}) {
    try {
        const addresses = yield call(SurveysService.fetchAddressesBySurveyState, toNumber(ups), toNumber(area), state);
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

export function* removeAllSurveys() {
    try {
        yield call(SurveysService.removeAll);
        yield put(notifyDataCleared());
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchDwellingVisits({id, dwellingOrder}) {
    try {
        const dwellingVisits = yield call(SurveysService.fetchDwellingVisits, id, toNumber(dwellingOrder));
        yield put(receiveDwellingVisits(dwellingVisits));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchDwellings({id}) {
    try {
        const dwellings = yield call(SurveysService.fetchDwellings, id);
        yield put(receiveDwellings(dwellings));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* findDwelling({id, dwellingOrder}) {
    try {
        const dwelling = yield call(SurveysService.findDwelling, id, toNumber(dwellingOrder));
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

export function* fetchHouseholds({id, dwellingOrder}) {
    try {
        const households = yield call(SurveysService.fetchHouseholds, id, toNumber(dwellingOrder));
        yield put(receiveHouseholds(households));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* findHousehold({id, dwellingOrder, householdOrder}) {
    try {
        const household = yield call(
            SurveysService.findHousehold,
            id,
            toNumber(dwellingOrder),
            toNumber(householdOrder)
        );
        yield put(receiveHousehold(household));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* createHousehold({id, dwellingOrder}) {
    try {
        const dwelling = yield call(SurveysService.createHousehold, id, toNumber(dwellingOrder));
        yield put(receiveDwelling(dwelling));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* updateHousehold({id, dwellingOrder, household}) {
    try {
        const savedHousehold = yield call(SurveysService.saveHousehold, id, toNumber(dwellingOrder), household);
        yield put(receiveHouseholdUpdated(savedHousehold));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* removeHousehold({id, dwellingOrder, householdOrder}) {
    try {
        const dwelling = yield call(
            SurveysService.removeHousehold,
            id,
            toNumber(dwellingOrder),
            toNumber(householdOrder)
        );
        yield put(receiveDwelling(dwelling));
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

export function* closeHouseholdVisit({
    id, dwellingOrder, householdOrder, result
}) {
    try {
        yield call(
            SurveysService.closeHouseholdVisit,
            id,
            toNumber(dwellingOrder),
            toNumber(householdOrder),
            result
        );
        yield put(notifyCloseHouseholdVisit());
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchHouseholdVisits({id, dwellingOrder, householdOrder}) {
    try {
        const households = yield call(
            SurveysService.fetchHouseholdVisits,
            id,
            toNumber(dwellingOrder),
            toNumber(householdOrder)
        );
        yield put(receiveHouseholdVisits(households));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* interruptHousehold({
    id, dwellingOrder, household
}) {
    try {
        yield call(SurveysService.saveHousehold, id, toNumber(dwellingOrder), household);
        yield put(notifyInterruptHouseholdSucceeded());
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchMembers({id, dwellingOrder, householdOrder}) {
    try {
        const members = yield call(SurveysService.fetchMembers, id, toNumber(dwellingOrder), toNumber(householdOrder));
        yield put(receiveMembers(members));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* saveMembers({
    id, dwellingOrder, householdOrder, members
}) {
    try {
        yield call(SurveysService.saveMembers, id, toNumber(dwellingOrder), toNumber(householdOrder), members);
        yield put(notifySaveMembersSucceeded());
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* findMember({
    id, dwellingOrder, householdOrder, memberOrder
}) {
    try {
        const member = yield call(
            SurveysService.findMember,
            id,
            toNumber(dwellingOrder),
            toNumber(householdOrder),
            toNumber(memberOrder)
        );
        yield put(receiveMember(member));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* interruptMember({
    id, dwellingOrder, householdOrder, member
}) {
    try {
        yield call(SurveysService.saveMember, id, toNumber(dwellingOrder), toNumber(householdOrder), member);
        yield put(notifyInterruptMemberSucceeded());
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* saveMember({
    id, dwellingOrder, householdOrder, member
}) {
    try {
        const savedMember = yield call(
            SurveysService.saveMember,
            id,
            toNumber(dwellingOrder),
            toNumber(householdOrder),
            member
        );
        yield put(receiveMember(savedMember));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* removeMember({
    id, dwellingOrder, householdOrder, memberOrder
}) {
    try {
        const members = yield call(
            SurveysService.removeMember,
            id,
            toNumber(dwellingOrder),
            toNumber(householdOrder),
            toNumber(memberOrder)
        );
        yield put(receiveMembers(members));
    } catch (err) {
        yield put(handleError(err));
    }
}
