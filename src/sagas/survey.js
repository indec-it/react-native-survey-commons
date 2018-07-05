import {call, put} from 'redux-saga/effects';
import {notifyDataCleared, handleError} from '@indec/react-native-commons/actions';
import {find, toNumber} from 'lodash';

import {SurveysService} from '../services';
import {
    notifyCloseDwellingVisit,
    notifyCloseHouseholdVisit,
    notifyCloseSucceeded,
    notifyInterruptHouseholdSucceeded,
    notifyInterruptMemberSucceeded,
    notifySaveMembersSucceeded,
    notifySaveSucceeded,
    receiveCurrentDwellingVisit,
    receiveAddress,
    receiveAddresses,
    receiveAreas,
    receiveCurrentHouseholdVisit,
    receiveDwelling,
    receiveDwellingVisits,
    receiveDwellings,
    receiveHousehold,
    receiveHouseholdVisits,
    receiveHouseholds,
    receiveMember,
    receiveMembers,
    receiveSurvey,
    receiveSavedDwelling,
    receiveSavedHousehold,
    receiveSavedHouseholdVisit
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

export function* saveDwelling({id, dwelling}) {
    try {
        const newDwelling = yield call(SurveysService.saveDwelling, id, dwelling);
        yield put(receiveSavedDwelling(newDwelling));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchCurrentDwellingVisit({id, dwellingOrder}) {
    try {
        const currentDwellingVisit = yield call(SurveysService.fetchCurrentDwellingVisit, id, toNumber(dwellingOrder));
        yield put(receiveCurrentDwellingVisit(currentDwellingVisit));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* closeDwellingVisit({
    id, dwellingOrder, result
}) {
    try {
        yield call(
            SurveysService.closeDwellingVisit,
            id,
            toNumber(dwellingOrder),
            result
        );
        yield put(notifyCloseDwellingVisit());
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
        // keep households list up to date for cross validations.
        const households = yield call(SurveysService.fetchHouseholds, id, toNumber(dwellingOrder));
        yield put(receiveHouseholds(households));

        const order = toNumber(householdOrder);
        const household = find(households, h => h.order === order);
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

export function* saveHousehold({id, dwellingOrder, household}) {
    try {
        const savedHousehold = yield call(SurveysService.saveHousehold, id, toNumber(dwellingOrder), household);
        yield put(receiveSavedHousehold(savedHousehold));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* saveHouseholdVisit({
    id, dwellingOrder, householdOrder, visit
}) {
    try {
        const household = yield call(
            SurveysService.saveHouseholdVisit, id, toNumber(dwellingOrder), toNumber(householdOrder), visit
        );
        yield put(receiveSavedHouseholdVisit(household));
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

export function* fetchCurrentHouseholdVisit({id, dwellingOrder, householdOrder}) {
    try {
        const currentHouseholdVisit = yield call(
            SurveysService.fetchCurrentHouseholdVisit,
            id,
            toNumber(dwellingOrder),
            toNumber(householdOrder)
        );
        yield put(receiveCurrentHouseholdVisit(currentHouseholdVisit));
    } catch (err) {
        yield put(handleError(err));
    }
}

export function* fetchHouseholdVisits({id, dwellingOrder, householdOrder}) {
    try {
        const visits = yield call(
            SurveysService.fetchHouseholdVisits,
            id,
            toNumber(dwellingOrder),
            toNumber(householdOrder)
        );
        yield put(receiveHouseholdVisits(visits));
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
        const household = yield call(
            SurveysService.saveMembers, id, toNumber(dwellingOrder), toNumber(householdOrder), members
        );
        yield put(notifySaveMembersSucceeded());

        // keep household members data up to date.
        yield put(receiveHousehold(household));
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
        const {household, member: savedMember} = yield call(
            SurveysService.saveMember,
            id,
            toNumber(dwellingOrder),
            toNumber(householdOrder),
            member
        );
        yield put(receiveMember(savedMember));
        yield put(receiveHousehold(household));
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
