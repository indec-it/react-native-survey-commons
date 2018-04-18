import {NetInfo} from 'react-native';
import {http} from '@indec/heimdall/native';

export default class PingService {
    static async isConnected() {
        return NetInfo.isConnected.fetch();
    }

    static async ping(endpoint) {
        const {version} = await http.get(endpoint);
        return !!version;
    }
}
