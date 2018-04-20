import {every} from 'lodash';

import validateQuestion from './validateQuestion';
import isQuestionAnswered from './isQuestionAnswered';

const isSectionValid = (section, rows, entity, otherEntity) => every(
    rows,
    row => every(
        row.questions,
        question => isQuestionAnswered(question, section) &&
            validateQuestion(question, section[question.name], entity, otherEntity)
    )
);

export default isSectionValid;
