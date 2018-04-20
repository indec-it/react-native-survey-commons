import {map, reject} from 'lodash';

const renderQuestionErrors = ({validators}, answer, renderErrorMessage, entity, otherEntity) => {
    if (!validators || !answer) {
        return true;
    }
    return map(
        reject(
            validators,
            validator => validator.forThis(entity).against(otherEntity).isValid(answer)
        ),
        validator => renderErrorMessage(validator.errorMessage())
    );
};

export default renderQuestionErrors;
