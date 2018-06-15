import {Alert} from '@indec/react-native-commons/src/util';

/**
 * Launches an alert that says that the module is not completed.
 */
const alertIncompleteSection = () => Alert.alert(
    'Atención',
    'El módulo está incompleto, verifique que haya respondido todas las preguntas.',
    [{text: 'Aceptar'}]
);

export default alertIncompleteSection;
