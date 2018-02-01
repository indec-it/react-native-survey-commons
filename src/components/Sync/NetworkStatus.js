import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {getFontAwesome} from '@indec/react-native-commons/util';

import styles from './styles';

const getConnectionIcon = isConnected => {
    const icon = isConnected ? getFontAwesome('check', 'green') : getFontAwesome('times', 'red');
    return (<Icon {...icon} size={32}/>);
};

const getServerStatusIcon = (isPinging, pong) => {
    let icon;
    if (isPinging) {
        icon = getFontAwesome('refresh');
    } else if (pong) {
        icon = getFontAwesome('check', 'green');
    } else {
        icon = getFontAwesome('times', 'red');
    }
    return (<Icon {...icon} size={32}/>);
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
    </View>
);

NetworkStatus.propTypes = {
    isConnected: PropTypes.bool.isRequired,
    isPinging: PropTypes.bool.isRequired,
    pong: PropTypes.shape({}).isRequired
};

export default NetworkStatus;
