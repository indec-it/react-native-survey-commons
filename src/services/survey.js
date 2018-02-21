import {StorageService} from '@indec/react-native-commons/services';
import {castArray, filter, find, findIndex, forEach, isEmpty, last, map, max, reject, toNumber, uniqBy} from 'lodash';

import {answers, surveyAddressState as surveyState} from '../constants';
import {Dwelling, Household, Survey} from '../model';

const storage = new StorageService('survey');

const disableHouseholds = households => forEach(
    castArray(households),
    household => {
        const disabledHousehold = household;
        disabledHousehold.disabled = true;
    }
);

const getDwelling = (survey, dwellingOrder) => {
    const order = toNumber(dwellingOrder);
    return find(survey.dwellings, dwelling => dwelling.order === order);
};

const getHousehold = (dwelling, householdOrder) => {
    const order = toNumber(householdOrder);
    return find(dwelling.households, household => household.order === order);
};

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
                    departmentName: survey.address.departmentName
                })
            ),
            area => area.area
        );
    }

    static async fetchAddresses(ups, area) {
        const surveys = await SurveysService.findAll();
        const upsId = toNumber(ups);
        const areaId = toNumber(area);
        return map(
            filter(
                surveys,
                survey => survey.address.ups === upsId && survey.address.area === areaId
            ),
            survey => ({
                street: survey.address.street,
                streetNumber: survey.address.streetNumber,
                floor: survey.address.floor,
                departmentName: survey.address.departmentName,
                surveyAddressState: survey.surveyAddressState,
                surveyId: survey._id,
                dwellingResponse: survey.dwellingResponse,
                listNumber: survey.address.listNumber
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

    static async findDwelling(id, order) {
        const survey = await SurveysService.findById(id);
        const dwellingOrder = toNumber(order);
        return find(survey.dwellings, dwelling => dwelling.order === dwellingOrder);
    }

    static async updateDwelling(id, dwelling) {
        const survey = await SurveysService.findById(id);
        const dwellingIndex = findIndex(survey.dwellings, d => d.order === dwelling.order);
        const currentResponse = survey.dwellings[dwellingIndex].response;
        survey.dwellings[dwellingIndex] = dwelling;
        if (dwelling.response === answers.YES && currentResponse !== dwelling.response) {
            SurveysService.addHouseholdToDwelling(dwelling);
        }
        if (dwelling.response === answers.NO && !isEmpty(dwelling.households)) {
            disableHouseholds(dwelling.households);
        }
        survey.dwellingResponse = dwelling.response;
        await SurveysService.save(survey);
        return survey;
    }

    static async createHousehold(id, dwellingOrder) {
        const survey = await SurveysService.findById(id);
        const order = toNumber(dwellingOrder);
        const dwelling = find(survey.dwellings, d => d.order === order);
        SurveysService.addHouseholdToDwelling(dwelling);
        await SurveysService.save(survey);
        return dwelling;
    }

    static async fetchHouseholds(id, dwelling) {
        const foundDwelling = await SurveysService.findDwelling(id, dwelling);
        return foundDwelling.getHouseholds();
    }

    static async getMembers(id, dwelling, household) {
        const householdOrder = toNumber(household);
        const households = await SurveysService.fetchHouseholds(id, dwelling);
        return find(households, h => h.order === householdOrder).members || [];
    }

    static async getAddress(id) {
        const {address} = await SurveysService.findById(id);
        return address;
    }

    static async saveMembers(id, dwellingOrder, householdOrder, members) {
        const survey = await SurveysService.findById(id);
        const dwelling = getDwelling(survey, dwellingOrder);
        const household = getHousehold(dwelling, householdOrder);
        household.members = members;
        await SurveysService.save(survey);
        return survey;
    }

    static async findHousehold(id, dwellingOrder, householdOrder) {
        const households = await SurveysService.fetchHouseholds(id, dwellingOrder);
        const order = toNumber(householdOrder);
        return find(households, household => household.order === order);
    }

    static async updateHousehold(id, dwellingOrder, household) {
        const survey = await SurveysService.findById(id);
        const dwelling = find(survey.dwellings, d => d.order === toNumber(dwellingOrder));
        const householdIndex = findIndex(dwelling.households, h => h.order === household.order);
        dwelling.households[householdIndex] = household;
        await SurveysService.save(survey);
        return household;
    }

    static async findMember(id, dwellingOrder, householdOrder, memberOrder) {
        const members = await SurveysService.getMembers(id, dwellingOrder, householdOrder, memberOrder);
        const order = toNumber(memberOrder);
        return find(members, member => member.order === order);
    }

    static async saveMember(id, dwellingOrder, householdOrder, member) {
        const survey = await SurveysService.findById(id);
        const dwelling = getDwelling(survey, dwellingOrder);
        const household = getHousehold(dwelling, householdOrder);
        const memberIndex = findIndex(household.members, m => m.order === member.order);
        household.members[memberIndex] = member;
        await SurveysService.save(survey);
        return member;
    }

    static createHouseholdVisit(household) {
        household.visits.push({start: new Date()});
        return household;
    }

    static async closeHouseholdVisit(id, dwellingOrder, householdOrder) {
        const survey = await SurveysService.findById(id);
        const dwelling = getDwelling(survey, dwellingOrder);
        const household = getHousehold(dwelling, householdOrder);
        const lastVisit = last(household.visits);
        lastVisit.end = new Date();
        return SurveysService.save(survey);
    }

    static async deleteHousehold(id, dwellingOrder, householdOrder) {
        const survey = await SurveysService.findById(id);
        const dwelling = getDwelling(survey, dwellingOrder);

        dwelling.households = map(
            filter(dwelling.households, household => household.order !== householdOrder),
            (member, index) => Object.assign(member, {order: index + 1})
        );

        await SurveysService.save(survey);
        return dwelling.households;
    }

    static async deleteMember(id, dwellingOrder, householdOrder, memberOrder) {
        const survey = await SurveysService.findById(id);
        const dwelling = getDwelling(survey, dwellingOrder);
        const household = getHousehold(dwelling, householdOrder);

        household.members = map(
            filter(household.members, member => member.order !== memberOrder),
            (member, index) => Object.assign(member, {order: index + 1})
        );

        await SurveysService.save(survey);
        return household.members;
    }
}
