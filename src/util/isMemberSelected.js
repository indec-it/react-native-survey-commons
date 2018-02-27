import {isNil} from 'lodash';

export default (selected, member) => !isNil(selected) && member.order === selected.order;
