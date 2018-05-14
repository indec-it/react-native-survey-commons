import {get, find, values} from 'lodash';

/**
 * Get the age of the given member
 * @param {object} member A member to lookup for the given age.
 * @returns {number} Returns the age of the given member.
 */
const getMemberAge = member => get(
    find(
        values(member),
        section => section && section.age
    ),
    'age'
);

export default getMemberAge;
