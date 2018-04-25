import {types} from '@indec/react-native-form-builder';
import {every, isArray, isEmpty, isNumber} from 'lodash';

import canAnswerQuestion from './canAnswerQuestion';

const isAnswered = (question, section, answer) => {
    if (isArray(answer) && isEmpty(answer)) {
        return false;
    }
    return !!answer || !canAnswerQuestion(question, section);
};

const isQuestionAnswered = (question, section) => {
    switch (question.type) {
        case types.TEXT_WITH_BADGE:
        case types.TITLE:
        case types.SUM:
            return true;
        case types.RADIO_TABLE:
            return isAnswered(question, section, every(question.questions, q => section[question.name + q.name]));
        case types.DECIMAL_INPUT:
            return isNumber(section[question.name]);
        default:
            return isAnswered(question, section, section[question.name]);
    }
};

export default isQuestionAnswered;
