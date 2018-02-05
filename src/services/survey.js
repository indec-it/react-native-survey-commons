import {StorageService} from '@indec/react-native-commons/services';
import {filter, map, toNumber, uniqBy, max, find, merge} from 'lodash';

import {answers, surveyAddressState as surveyState} from '../constants';
import {Household} from '../model';

const storage = new StorageService('survey');

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
            return addresses;
        }
        return filter(addresses, address => address.surveyAddressState === surveyAddressState);
    }

    /**
     * Append a household to the given dwelling
     * @param {Dwelling} dwelling A dwelling to add a household.
     * @returns {Dwelling} The given dwelling including the new household.
     */
    static addHouseholdToDwelling(dwelling) {
        const maxOrder = max(map(dwelling.households, household => household.order)) || 0;
        dwelling.households.push(new Household({order: maxOrder + 1}));
        return dwelling;
    }

    static async findDwelling(id, order) {
        const survey = await SurveysService.findById(id);
        return {
            survey,
            dwelling: find(survey.dwellings, dwelling => dwelling.order === toNumber(order))
        };
    }

    static async updateDwelling(survey, dwelling) {
        const newSurvey = survey;
        if (dwelling.response === answers.YES) {
            SurveysService.addHouseholdToDwelling(dwelling);
        }
        const currentDwelling = find(newSurvey.dwellings, d => d.order === dwelling.order);
        merge(currentDwelling, dwelling);
        newSurvey.dwellingResponse = dwelling.response;
        return SurveysService.save(newSurvey);
    }

    static async fetchHouseholds(id, dwelling) {
        const dwellingOrder = toNumber(dwelling);
        const survey = await SurveysService.findById(id);
        const foundDwelling = find(survey.dwellings, d => d.order === dwellingOrder);
        return foundDwelling.households;
    }

    static async getMembers(id, dwelling, household) {
        const householdOrder = toNumber(household);
        const households = await SurveysService.fetchHouseholds(id, dwelling);
        return find(households, h => h.order === householdOrder).members || [];
    }
}
