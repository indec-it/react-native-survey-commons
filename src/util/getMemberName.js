import {get, find, values} from 'lodash';

/**
 * Get the name of the given member
 * @param {object} member A member to lookup for the given name.
 * @returns {string} Returns the name of the given member.
 */
const getMemberName = member => get(
    find(
        values(member),
        section => section && section.name
    )
);

export default getMemberName;
