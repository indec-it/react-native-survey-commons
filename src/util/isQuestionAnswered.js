import {types} from '@indec/react-native-form-builder';
import {isArray, isEmpty} from 'lodash';

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
        case types.TOTAL:
            return true;
        case types.RADIO_TABLE:
            return question.questions.map(q => isAnswered(question, section, section[question.name + q.name]));
        default:
            return isAnswered(question, section, section[question.name]);
    }
};

export default isQuestionAnswered;
