import {isNil, map, reject} from 'lodash';

const renderQuestionErrors = (question, section, answer, renderErrorMessage, entity, otherEntity) => {
    if (!question.validators || (!question.allowZero && !answer) || (question.allowZero && isNil(answer))) {
        return true;
    }

    return map(
        reject(
            question.validators,
            validator => validator.forThis(entity).against(otherEntity).isValid(answer)
        ),
        validator => renderErrorMessage(validator.getValidationResult())
    );
};

export default renderQuestionErrors;
