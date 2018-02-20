
export default class Member {
    order = 1;
    response = null;
    notResponseCause = null;

    constructor(obj) {
        Object.assign(this, obj);
    }
}
