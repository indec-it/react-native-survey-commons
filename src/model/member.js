import {cloneDeep} from 'lodash';

export default class Member {
    order = 1;
    response = false;
    disabled = false;
    notResponseCause = null;
    characteristics = {};

    constructor(obj) {
        Object.assign(this, cloneDeep(obj));
    }

    isHomeBoss() {
        return this.order === 1;
    }
}
