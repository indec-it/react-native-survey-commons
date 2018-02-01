import {filter, forEach} from 'lodash';

import {canDrawQuestion, getQuestionsWithParents} from '.';

export default (rows, chapter) => {
    const newChapter = {...chapter};
    forEach(
        filter(
            getQuestionsWithParents(rows),
            question => !canDrawQuestion(question, chapter)
        ),
        question => delete newChapter[question.name]
    );
    return newChapter;
};
