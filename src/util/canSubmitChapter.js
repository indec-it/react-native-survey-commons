import {some, flatten} from 'lodash';
import getQuestions from './getQuestions';

export default (rows, chapter) => {
    const questions = getQuestions(rows);

    const validatedQuestions = flatten(questions.map(q => {
        const answer = chapter[q.name];
        const errorValidators = q.errorValidators || [];

        return errorValidators.map(v => v.isValid(answer));
    }));

    return !some(validatedQuestions);
};
