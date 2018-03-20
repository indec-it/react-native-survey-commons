export default class Address {
    state = null;
    street = null;
    departmentCode = null;
    departmentName = null;
    locality = null;
    localityName = null;
    agglomerate = null;
    entity = null;
    entityName = null;
    ups = null;
    area = null;
    fraction = null;
    radio = null;
    block = null;
    side = null;
    listNumber = null;
    streetNumber = null;
    floor = null;
    room = null;
    type = null;
    sector = null;
    building = null;
    entry = null;
    description = null;
    additionalDescription = null;
    segment = null;

    constructor(obj) {
        Object.assign(this, obj);
    }
}
