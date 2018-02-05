import {StorageService} from '@indec/react-native-commons/services';
import {filter, map, toNumber, uniqBy, max, isEmpty} from 'lodash';

import {Household} from '../model';

const storage = new StorageService('survey');

export default class SurveysService {
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

    static createHousehold(survey) {
        const newSurvey = survey;
        if (!isEmpty(newSurvey.dwellings[0].households)) {
            const maxOrder = max(map(newSurvey.dwellings[0].households, household => household.order));
            newSurvey.dwellings[0].households.push(new Household({order: maxOrder + 1}));
        } else {
            newSurvey.dwellings[0].households.push(new Household());
        }
    }
}
