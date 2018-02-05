export default class Dwelling {
    order = null;
    dwellingState = {
        response: null,
        noResponseCause: null
    };

    constructor(obj) {
        Object.assign(this, obj);
    }
}
