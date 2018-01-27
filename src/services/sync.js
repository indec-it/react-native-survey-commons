import {http} from '@indec/heimdall/native';

export default class SyncService {
    static async sync(surveys, endpoint) {
        return http.post(`${endpoint}/api/sync`, {surveys});
    }
}
