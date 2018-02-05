import {isEmpty, map} from 'lodash';

import {Address, Dwelling} from '.';

export default class Survey {
    constructor(obj) {
        Object.assign(this, obj);
        if (obj) {
            if (!isEmpty(obj.dwellings)) {
                this.dwellings = map(obj.dwellings, dwelling => new Dwelling(dwelling));
            } else {
                this.dwellings = [new Dwelling({order: 1})];
            }
            this.address = new Address(obj.address);
        }
    }
}
