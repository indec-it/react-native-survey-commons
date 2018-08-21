import {Alert} from '@indec/react-native-commons/src/util';

/**
 * Launches an alert and this advice that progress will not be saved.
 * This is used to confirm when user want to get back.
 * @param {Function} onAccept Event handler when the accept button is pressed.
 */
const alertIncompleteSectionOnBack = onAccept => Alert.alert(
    'Atención',
    'El módulo está incompleto, si continúa perderá los datos ingresados en este capítulo. Para retroceder y que '
    + 'esto no suceda, presione Cancelar y complete el módulo. Si desea continuar y perder la información ingresada, '
    + 'presione Aceptar.',
    [{
        text: 'Cancelar'
    }, {
        text: 'Aceptar',
        onPress: onAccept
    }]
);

export default alertIncompleteSectionOnBack;
