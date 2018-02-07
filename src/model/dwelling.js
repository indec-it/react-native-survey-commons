export default class Dwelling {
    order = 1;
    households = [];
    dwellingState = {
        response: null,
        noResponseCause: null
    };

    constructor(obj) {
        Object.assign(this, obj);
    }
}
