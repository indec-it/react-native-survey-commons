import NetInfo from '@react-native-community/netinfo';
import {http} from '@indec/heimdall/native';

export default class PingService {
    static async isConnected() {
        return NetInfo.fetch();
    }

    static async ping(endpoint) {
        const {version} = await http.get(endpoint);
        return !!version;
    }
}
