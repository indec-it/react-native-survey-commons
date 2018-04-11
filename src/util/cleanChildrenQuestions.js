import {types} from '@indec/react-native-form-builder';
import {forEach} from 'lodash';

import {canAnswerQuestion, getQuestionsWithParents} from '.';

/**
 * Clean children questions when the parent condition is false
 * @param {Array<object>} rows Rows where questions come from.
 * @param {object} chapter A chapter to be cleaned.
 * @returns {object} Returns a cleaned chapter of invalid children answers.
 */
const cleanChildrenQuestions = (rows, chapter) => {
    const cleanedChapter = {...chapter};
    forEach(
        getQuestionsWithParents(rows),
        question => {
            // We can't filter before the forEach because we need to clean the chain of questions dependency.
            if (!canAnswerQuestion(question, cleanedChapter)) {
                if (question.type === types.RADIO_TABLE) {
                    forEach(question.questions, q => delete cleanedChapter[question.name + q.name]);
                } else {
                    delete cleanedChapter[question.name];
                }
            }
        }
    );
    return cleanedChapter;
};

export default cleanChildrenQuestions;
