import {head} from 'lodash';

import getMemberName from './getMemberName';

/**
 * Gets the name of the head member
 * @param {object} household A household to lookup for head member.
 * @returns {string} Returns the name of the head member.
 */
const getHouseholdHeadName = household => getMemberName(head(household.members));
export default getHouseholdHeadName;
