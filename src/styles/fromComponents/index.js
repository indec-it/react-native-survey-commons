import {types} from '@indec/react-native-form-builder';

import DecimalInput from './DecimalInput';
import Radio from './Radio';
import YesNoButtons from './YesNoButtons';

export default {
    [types.DECIMAL_INPUT]: DecimalInput,
    [types.RADIO]: Radio,
    [types.YES_NO_BUTTONS]: YesNoButtons,
    none: {
        style: null,
        badgeStyle: null,
        textStyle: null,
        textBoxStyle: null
    }
};
