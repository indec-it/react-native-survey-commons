import {filter, forEach} from 'lodash';

import {canAnswerQuestion, getQuestionsWithParents} from '.';

export default (rows, chapter) => {
    const newChapter = {...chapter};
    forEach(
        filter(
            getQuestionsWithParents(rows),
            question => !canAnswerQuestion(question, chapter)
        ),
        question => delete newChapter[question.name]
    );
    return newChapter;
};
