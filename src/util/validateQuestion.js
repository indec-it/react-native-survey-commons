import {every, isNil} from 'lodash';

const validateQuestion = (question, answer, entity, otherEntity) => {
    if (!question.validators || (!question.allowZero && !answer) || (question.allowZero && isNil(answer))) {
        return true;
    }

    return every(
        question.validators,
        validator => !validator.forThis(entity).against(otherEntity).hasBlockerState(answer)
    );
};

export default validateQuestion;
