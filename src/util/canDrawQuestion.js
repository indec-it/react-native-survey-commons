import {operators} from '@indec/react-native-form-builder';
import lang from 'lodash/lang';
import {some, isNil} from 'lodash';

export default ({parents}, chapter) => {
    if (!parents) {
        return true;
    }
    return some(
        parents.map(parent => {
            switch (parent.type) {
                case operators.EXISTS:
                    return !isNil(chapter[parent.id]) === parent.value;
                case operators.NOT_EQUALS:
                    return !lang.eq(chapter[parent.id], parent.value);
                default:
                    return lang[parent.type](chapter[parent.id], parent.value);
            }
        }),
        status => status === true
    );
};
