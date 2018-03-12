import {forEach} from 'lodash';

import {canAnswerQuestion, getQuestionsWithParents} from '.';

/**
 * Clean children questions when the parent condition is false
 * @param {Array<object>} rows An rows array where questions come from..
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
                delete cleanedChapter[question.name];
            }
        }
    );
    return cleanedChapter;
};

export default cleanChildrenQuestions;
