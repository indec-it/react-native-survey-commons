import {operators} from '@indec/react-native-form-builder';
import lang from 'lodash/lang';
import {every, isArray, isNil, some} from 'lodash';

const canShowQuestion = (parent, chapter) => {
    switch (parent.type) {
        case operators.EXISTS:
            return !isNil(chapter[parent.id]) === parent.value;
        case operators.NOT_EQUALS:
            return !lang.eq(chapter[parent.id], parent.value);
        default:
            return lang[parent.type](chapter[parent.id], parent.value);
    }
};

const canAnswerQuestion = ({parents}, chapter) => {
    if (!parents) {
        return true;
    }
    return some(
        parents,
        parent => {
            if (isArray(parent)) {
                return every(parent, p => canShowQuestion(p, chapter));
            }
            return canShowQuestion(parent, chapter);
        }
    );
};

export default canAnswerQuestion;
