import {map, reject} from 'lodash';

const renderQuestionErrors = ({validators}, answer, renderErrorMessage) => {
    if (!validators || !answer) {
        return true;
    }
    return map(
        reject(
            validators,
            validator => validator.isValid(answer)
        ),
        validator => renderErrorMessage(validator.errorMessage())
    );
};

export default renderQuestionErrors;
