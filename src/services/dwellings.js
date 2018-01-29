import {AsyncStorage} from 'react-native';
import {filter, startsWith} from 'lodash';

export default class DwellingsService {
    PREFIX = 'dwelling:';

    createKey(id) {
        return `${this.PREFIX}${id}`;
    }

    async getAllKeys() {
        const keys = await AsyncStorage.getAllKeys();
        return filter(keys, key =>
            startsWith(key, this.PREFIX)
        );
    }

    static findAll() {
        return Promise.all(this.getAllKeys().map(
            async key => JSON.parse(
                await AsyncStorage.getItem(key)
            )
        ));
    }

    static async findById(id) {
        const key = this.createKey(id);
        return JSON.parse(
            await AsyncStorage.getItem(key)
        );
    }
}
