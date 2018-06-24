import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {getFontAwesome} from '@indec/react-native-commons/util';
import {Alert} from '@indec/react-native-commons';

import styles from './styles';

const getConnectionIcon = isConnected => {
    const icon = isConnected ? getFontAwesome('check', '#276e0f') : getFontAwesome('times', '#e00000');
    return (<Icon {...icon} size={24}/>);
};

const getServerStatusIcon = (isPinging, pong) => {
    let icon;
    if (isPinging) {
        icon = getFontAwesome('refresh');
    } else if (pong) {
        icon = getFontAwesome('check', '#276e0f');
    } else {
        icon = getFontAwesome('times', '#e00000');
    }
    return (<Icon {...icon} size={24}/>);
};

const NetworkStatus = ({isConnected, isPinging, pong}) => (
    <View style={styles.network}>
        <View style={styles.networkConnection}>
            <Text style={styles.networkText}>
                Conexión a internet
            </Text>
            {getConnectionIcon(isConnected)}
        </View>
        <View style={styles.networkConnection}>
            <Text style={styles.networkText}>
                Servidor online
            </Text>
            {getServerStatusIcon(isPinging, pong)}
        </View>
        {!isConnected &&
        <Alert danger>
            El dispositivo no está conectado a Internet.
        </Alert>}
        {isConnected && isPinging &&
        <Alert>
            El dispositivo está verificando la conexion con el Servidor.
        </Alert>}
        {isConnected && !isPinging && !pong &&
        <Alert danger>
            El servidor no esta disponible momentáneamente.
        </Alert>}
        {isConnected && !isPinging && pong &&
        <Alert success>
            El Servidor está disponible, haga click en el botón Sincronizar para recibir y/o enviar encuestas.
        </Alert>}
    </View>
);

NetworkStatus.propTypes = {
    isConnected: PropTypes.bool.isRequired,
    isPinging: PropTypes.bool.isRequired,
    pong: PropTypes.bool.isRequired
};

export default NetworkStatus;
