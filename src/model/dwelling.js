import {reject} from 'lodash';

export default class Dwelling {
    order = 1;
    households = [];
    response = null;
    noResponseCause = null;

    constructor(obj) {
        Object.assign(this, obj);
    }

    getHouseholds() {
        return reject(this.households, household => household.disabled);
    }
}
