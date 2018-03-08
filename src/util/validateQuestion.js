import {every} from 'lodash';

const validateQuestion = ({validators}, answer) => {
    if (!validators || !answer) {
        return true;
    }
    return every(validators, validator => validator.isValid(answer));
};

export default validateQuestion;
