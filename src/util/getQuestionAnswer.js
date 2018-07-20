import {includes} from 'lodash';

const getQuestionAnswer = (chapter, name) => {
    if (includes(name, ' ')) {
        throw new Error(`'${name}' is not allowed, only a trimmed string`);
    }
    return chapter[name];
};

export default getQuestionAnswer;
