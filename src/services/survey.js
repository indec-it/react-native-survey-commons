import {StorageService} from '@indec/react-native-commons/services';
import {
    castArray,
    every,
    filter,
    find,
    findIndex,
    forEach,
    isEmpty,
    last,
    map,
    max,
    reject,
    uniqBy,
    values
} from 'lodash';

import {answers, surveyAddressState as surveyState} from '../constants';
import {Dwelling, Household, Member, Survey} from '../model';

const storage = new StorageService('survey');

const disableHouseholds = households => forEach(
    castArray(households),
    household => Object.assign(household, {disabled: true})
);

const getDwelling = (survey, dwellingOrder) => find(survey.dwellings, dwelling => dwelling.order === dwellingOrder);

const getHousehold = (dwelling, householdOrder) => (
    find(dwelling.households, household => household.order === householdOrder && !household.disabled)
);

export default class SurveysService {
    static async closeSurvey(id) {
        const survey = await SurveysService.findById(id);
        survey.surveyAddressState = surveyState.RESOLVED;
        return SurveysService.save(survey);
    }

    static async findAll() {
        return storage.findAll();
    }

    static async findById(id) {
        return new Survey(await storage.findById(id));
    }

    static async save(surveys) {
        return storage.save(surveys, survey => survey._id);
    }

    static async removeAll() {
        return storage.removeAll();
    }

    static async fetchAreas() {
        const surveys = await SurveysService.findAll();
        return uniqBy(
            map(
                surveys,
                survey => ({
                    area: survey.address.area,
                    ups: survey.address.ups,
                    localityName: survey.address.localityName
                })
            ),
            area => area.area
        );
    }

    static async fetchAddresses(ups, area) {
        const surveys = await SurveysService.findAll();
        return map(
            filter(
                surveys,
                survey => survey.address.ups === ups && survey.address.area === area
            ),
            survey => ({
                street: survey.address.street,
                streetNumber: survey.address.streetNumber,
                floor: survey.address.floor,
                room: survey.address.room,
                localityName: survey.address.localityName,
                surveyAddressState: survey.surveyAddressState,
                surveyId: survey._id,
                dwellingResponse: survey.dwellingResponse,
                listNumber: survey.address.listNumber,
                side: survey.address.side,
                block: survey.address.block
            })
        );
    }

    static async fetchAddressesBySurveyState(ups, area, surveyAddressState) {
        const addresses = await SurveysService.fetchAddresses(ups, area);
        if (!surveyAddressState) {
            return reject(addresses, address => address.surveyAddressState === surveyState.RESOLVED);
        }
        return filter(addresses, address => address.surveyAddressState === surveyState.RESOLVED);
    }

    static async getAddress(id) {
        const {address} = await SurveysService.findById(id);
        return address;
    }

    static async findDwelling(id, order) {
        const survey = await SurveysService.findById(id);
        return find(survey.dwellings, dwelling => dwelling.order === order);
    }

    static async updateDwelling(id, dwelling) {
        const survey = await SurveysService.findById(id);
        const dwellingIndex = findIndex(survey.dwellings, d => d.order === dwelling.order);
        const currentResponse = survey.dwellings[dwellingIndex].response;
        survey.dwellings[dwellingIndex] = dwelling;
        if (dwelling.response === answers.YES && currentResponse !== dwelling.response
            && (
                isEmpty(dwelling.households) || every(dwelling.households, household => household.disabled)
            )
        ) {
            SurveysService.addHouseholdToDwelling(dwelling);
        }
        if (dwelling.response === answers.NO) {
            survey.surveyAddressState = surveyState.RESOLVED;
            dwelling.visits.push({
                date: new Date(),
                response: dwelling.response,
                notResponseCause: dwelling.notResponseCause
            });
            if (!isEmpty(dwelling.households)) {
                disableHouseholds(dwelling.households);
            }
        }
        survey.dwellingResponse = dwelling.response;
        await SurveysService.save(survey);
        return survey;
    }

    /**
     * Append a household to the given dwelling
     * @param {Dwelling} dwelling A dwelling to add a household.
     * @returns {Dwelling} The given dwelling including the new household.
     */
    static addHouseholdToDwelling(dwelling) {
        const maxOrder = max(
            map(
                new Dwelling(dwelling).getHouseholds(),
                household => household.order
            )
        ) || 0;
        dwelling.households.push(new Household({order: maxOrder + 1}));
        return dwelling;
    }

    static async fetchHouseholds(id, dwelling) {
        const foundDwelling = await SurveysService.findDwelling(id, dwelling);
        return foundDwelling.getHouseholds();
    }

    static async findHousehold(id, dwellingOrder, householdOrder) {
        const households = await SurveysService.fetchHouseholds(id, dwellingOrder);
        return find(households, household => household.order === householdOrder);
    }

    static async createHousehold(id, dwellingOrder) {
        const survey = await SurveysService.findById(id);
        const dwelling = find(survey.dwellings, d => d.order === dwellingOrder);
        SurveysService.addHouseholdToDwelling(dwelling);
        await SurveysService.save(survey);
        return dwelling;
    }

    static async saveHousehold(id, dwellingOrder, household) {
        const survey = await SurveysService.findById(id);
        const dwelling = find(survey.dwellings, d => d.order === dwellingOrder);
        const householdIndex = findIndex(dwelling.households, h => !h.disabled && h.order === household.order);
        dwelling.households[householdIndex] = household;
        await SurveysService.save(survey);
        return household;
    }

    static async removeHousehold(id, dwellingOrder, householdOrder) {
        const survey = await SurveysService.findById(id);
        const dwelling = getDwelling(survey, dwellingOrder);
        const household = find(dwelling.households, h => h.order === householdOrder && !h.disabled);

        household.disabled = true;

        forEach(
            reject(dwelling.households, h => h.disabled),
            (house, index) => Object.assign(house, {order: index + 1})
        );

        await SurveysService.save(survey);
        return dwelling;
    }

    static createHouseholdVisit(household) {
        household.visits.push({start: new Date()});
        return household;
    }

    static async closeHouseholdVisit(id, dwellingOrder, householdOrder, result) {
        const survey = await SurveysService.findById(id);
        const dwelling = getDwelling(survey, dwellingOrder);
        const household = getHousehold(dwelling, householdOrder);
        const lastVisit = last(household.visits);
        lastVisit.end = new Date();
        Object.assign(lastVisit, result);
        await SurveysService.save(survey);
        return household;
    }

    static async fetchMembers(id, dwellingOrder, householdOrder) {
        const households = await SurveysService.fetchHouseholds(id, dwellingOrder);
        return find(households, h => h.order === householdOrder).members;
    }

    static async saveMembers(id, dwellingOrder, householdOrder, members) {
        const survey = await SurveysService.findById(id);
        const dwelling = getDwelling(survey, dwellingOrder);
        const household = getHousehold(dwelling, householdOrder);
        household.members = members;
        household.householdHead = find(values(members[0]), item => item && item.name).name;
        await SurveysService.save(survey);
        return survey;
    }

    static async findMember(id, dwellingOrder, householdOrder, memberOrder) {
        const members = await SurveysService.fetchMembers(id, dwellingOrder, householdOrder);
        return find(members, member => !member.disabled && member.order === memberOrder);
    }

    static async saveMember(id, dwellingOrder, householdOrder, member) {
        const survey = await SurveysService.findById(id);
        const dwelling = getDwelling(survey, dwellingOrder);
        const household = getHousehold(dwelling, householdOrder);
        const memberIndex = findIndex(household.members, m => m.order === member.order && !m.disabled);
        household.members[memberIndex] = new Member(member);
        await SurveysService.save(survey);
        return member;
    }

    static async removeMember(id, dwellingOrder, householdOrder, memberOrder) {
        const survey = await SurveysService.findById(id);
        const dwelling = getDwelling(survey, dwellingOrder);
        const household = getHousehold(dwelling, householdOrder);
        const member = find(household.members, m => m.order === memberOrder && !m.disabled);

        member.disabled = true;

        forEach(
            reject(household.members, m => m.disabled),
            (m, index) => Object.assign(m, {order: index + 1})
        );

        await SurveysService.save(survey);
        return household.members;
    }
}
