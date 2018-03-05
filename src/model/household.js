import {isEmpty, map} from 'lodash';

import Member from './member';

export default class Household {
    order = 1;
    members = [];
    response = null;
    noResponseCause = null;
    disabled = false;
    id = Date.now();
    visits = [];

    constructor(obj) {
        Object.assign(this, obj);
        if (obj && !isEmpty(obj.members)) {
            this.members = map(obj.members, member => new Member(member));
        }
    }
}
