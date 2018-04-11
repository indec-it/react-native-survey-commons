import {map, reject} from 'lodash';

const renderQuestionErrors = ({validators}, answer, renderErrorMessage, entity) => {
    if (!validators || !answer) {
        return true;
    }
    return map(
        reject(
            validators,
            validator => validator.forThis(entity).isValid(answer)
        ),
        validator => renderErrorMessage(validator.errorMessage())
    );
};

export default renderQuestionErrors;
