export default class Household {
    order = 1;
    householdState = {
        response: null,
        noResponseCause: null
    };

    constructor(obj) {
        Object.assign(this, obj);
    }
}
