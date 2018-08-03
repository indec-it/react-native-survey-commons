import {get} from 'lodash';

const getValue = (member, field) => get(member.characteristics, field);

const formatMemberCharacteristics = member => (
    `${getValue(member, 'name') || '[Sin Nombre]'} - ${getValue(member, 'age') || '[Sin Edad]'}`
);

export default formatMemberCharacteristics;
