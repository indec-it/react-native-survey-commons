import {map, isEmpty} from 'lodash';

import {Dwelling, Address} from '.';

export default class Survey {
    constructor(obj) {
        Object.assign(this, obj);
        this.address = new Address(obj && obj.address);
        if (obj && !isEmpty(obj.dwellings)) {
            this.dwellings = map(obj.dwellings, dwelling => new Dwelling(dwelling));
        } else {
            this.dwellings = [new Dwelling()];
        }
    }
}
