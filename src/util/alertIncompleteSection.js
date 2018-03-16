import {Alert} from '@indec/react-native-commons/src/util';

const alertIncompleteSection = () => Alert.alert(
    'Atención',
    'El módulo está incompleto, verifique que haya respondido todas las preguntas.',
    [{text: 'Aceptar'}]
);

export default alertIncompleteSection;
