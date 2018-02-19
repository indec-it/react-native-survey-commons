import {StorageService} from '@indec/react-native-commons/services';
import {
    castArray, filter, find, findIndex, forEach, isEmpty, map, max, reject, toNumber, uniqBy
} from 'lodash';

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
        return storage.findById(id);
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
                surveyId: survey._id
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
                dwelling.getHouseholds(),
                household => household.order
            )
        ) || 0;
        dwelling.households.push(new Household({order: maxOrder + 1}));
        return dwelling;
    }

    static async findDwelling(id, order) {
        const survey = new Survey(await SurveysService.findById(id));
        const dwellingOrder = toNumber(order);
        return find(survey.dwellings, dwelling => dwelling.order === dwellingOrder);
    }

    static async updateDwelling(id, dwelling) {
        const survey = new Survey(await SurveysService.findById(id));
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

    static async fetchHouseholds(id, dwelling) {
        const dwellingOrder = toNumber(dwelling);
        const survey = await SurveysService.findById(id);
        const foundDwelling = new Dwelling(find(survey.dwellings, d => d.order === dwellingOrder));
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
}
