import {StorageService} from '@indec/react-native-commons/services';

const storage = new StorageService('survey');

export default class SurveysService {
    static async findAll() {
        return storage.findAll();
    }

    static async findById(id) {
        return storage.findById(id);
    }

    static async save(survey) {
        return storage.save(survey, ({id}) => id);
    }

    static async removeAll() {
        return storage.removeAll();
    }
}
