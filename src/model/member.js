export default class Member {
    order = 1;
    response = false;
    notResponseCause = null;
    characteristics = {};

    constructor(obj) {
        Object.assign(this, obj);
    }

    isHomeBoss() {
        return this.order === 1;
    }
}
