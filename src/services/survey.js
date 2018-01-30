import {StorageService} from '@indec/react-native-commons/services';
import {filter, uniqBy, map} from 'lodash';

const storage = new StorageService('survey');

export default class SurveysService {
    static async findAll() {
        return storage.findAll();
    }

    static async filteredSearch(filterState) {
        const surveys = await SurveysService.findAll();
        return filter(surveys, survey => survey.surveyAddressState === filterState);
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
}
