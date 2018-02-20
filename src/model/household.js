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
    }
}
