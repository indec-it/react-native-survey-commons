import {find, get, values} from 'lodash';

const getHouseholdHeadName = household => get(
    find(
        values(household.members[0]),
        item => item && item.name
    ), 'name'
);

export default getHouseholdHeadName;
