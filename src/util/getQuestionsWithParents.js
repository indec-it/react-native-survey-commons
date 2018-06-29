import {filter, size} from 'lodash';
import getQuestions from './getQuestions';

export default rows => (filter(
    getQuestions(rows),
    question => size(question.parents)
));
