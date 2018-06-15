import {Alert} from '@indec/react-native-commons/src/util';

/**
 * Launches an alert and this advice that progress will not be saved.
 * This is used to confirm when user want to get back.
 * @param {Function} onAccept Event handler when the accept button is pressed.
 */
const alertIncompleteSectionOnBack = onAccept => Alert.alert(
    'Atención',
    'El módulo está incompleto, si continúa perderá todos los datos. Para retroceder y que esto' +
    ' no suceda, complete el módulo',
    [{
        text: 'Cancelar'
    }, {
        text: 'Aceptar',
        onPress: onAccept
    }]
);

export default alertIncompleteSectionOnBack;
