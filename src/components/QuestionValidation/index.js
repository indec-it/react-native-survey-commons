import React from 'react';
import PropTypes from 'prop-types';
import {isNil, map, reject} from 'lodash';

import ValidationsList from '../ValidationsList';
import questionAnswerPropTypes from '../../util/questionAnswerPropTypes';

const QuestionValidation = ({
    question, answer, entity, otherEntity
}) => {
    if (!question.validators || (!question.allowZero && !answer) || (question.allowZero && isNil(answer))) {
        return null;
    }
    return map(
        reject(
            question.validators,
            validator => validator.forThis(entity).against(otherEntity).isValid(answer)
        ),
        validator => <ValidationsList key={validator.id} validationResults={validator.getValidationResult()}/>
    );
};

QuestionValidation.propTypes = {
    question: PropTypes.shape({}).isRequired,
    entity: PropTypes.shape({}).isRequired,
    otherEntity: PropTypes.arrayOf(
        PropTypes.shape({})
    ),
    answer: questionAnswerPropTypes
};

QuestionValidation.defaultProps = {
    answer: null,
    otherEntity: null
};

export default QuestionValidation;
