import {every} from 'lodash';

const validateQuestion = ({validators}, answer, entity, otherEntity) => {
    if (!validators || !answer) {
        return true;
    }
    return every(validators, validator => !validator.forThis(entity).against(otherEntity).hasBlockerState(answer));
};

export default validateQuestion;
