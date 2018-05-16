import {every, isNil} from 'lodash';

const validateQuestion = (question, answer, entity, otherEntity) => {
    if (!question.validators || (!question.allowZero && isNil(answer)) || !answer) {
        return true;
    }

    return every(
        question.validators,
        validator => !validator.forThis(entity).against(otherEntity).hasBlockerState(answer)
    );
};

export default validateQuestion;
