import {isEmpty, map, reject} from 'lodash';

import Household from './household';

export default class Dwelling {
    order = 1;
    households = [];
    response = null;
    noResponseCause = null;
    id = Date.now();
    visits = [];

    constructor(obj) {
        Object.assign(this, obj);
        if (obj && !isEmpty(obj.households)) {
            this.households = map(obj.households, household => new Household(household));
        } else {
            this.households = [new Household()];
        }
    }

    getHouseholds() {
        return reject(this.households, household => household.disabled);
    }
}
