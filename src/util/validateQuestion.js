import {every} from 'lodash';

const validateQuestion = ({validators}, answer, entity) => {
    if (!validators || !answer) {
        return true;
    }
    return every(validators, validator => !validator.forThis(entity).hasBlockerState(answer));
};

export default validateQuestion;
