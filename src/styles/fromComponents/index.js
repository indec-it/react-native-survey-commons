import {types} from '@indec/react-native-form-builder';

import DecimalInput from './DecimalInput';
import YesNoButtons from './YesNoButtons';

export default {
    [types.DECIMAL_INPUT]: DecimalInput,
    [types.YES_NO_BUTTONS]: YesNoButtons,
    none: {
        style: null,
        textWithBadgeStyle: null
    }

};
