import {map, isEmpty} from 'lodash';

import {Dwelling, Address} from '.';

export default class Survey {
    constructor(obj) {
        Object.assign(this, obj);
        if (!obj) {
            this.dwellings = [new Dwelling({order: 1})];
            this.address = new Address();
            return;
        }
        if (!isEmpty(obj.dwellings)) {
            this.dwellings = map(obj.dwellings, dwelling => new Dwelling(dwelling));
        }
        this.address = new Address(obj.address);
    }
}
