
export default class Member {
    order = 1;
    response = null;
    notResponseCause = null;
    id = Date.now();

    constructor(obj) {
        Object.assign(this, obj);
    }
}
