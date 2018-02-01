import {flatMap} from 'lodash';

export default rows => flatMap(rows, row => row.questions);
