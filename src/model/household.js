export default class Household {
    order = 1;
    members = [];
    response = null;
    noResponseCause = null;

    constructor(obj) {
        Object.assign(this, obj);
    }
}
