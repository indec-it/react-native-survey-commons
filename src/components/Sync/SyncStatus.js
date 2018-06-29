import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {Alert} from '@indec/react-native-commons';
import {getFontAwesome} from '@indec/react-native-commons/util';

import {syncStatus as syncStatusEnum} from '../../constants';
import styles from './styles';

const getSyncStatus = syncStatus => {
    switch (syncStatus) {
        case syncStatusEnum.LOADING_DATA:
            return (
                <Fragment>
                    <Text style={styles.syncStatusText}>
                        {'Cargando datos... '}
                    </Text>
                    <Icon {...getFontAwesome('refresh')} size={24}/>
                </Fragment>
            );
        case syncStatusEnum.SENDING_DATA:
            return (
                <Fragment>
                    <Text>
                        {'Enviando datos... '}
                    </Text>
                    <Icon {...getFontAwesome('refresh')} size={24}/>
                </Fragment>
            );
        case syncStatusEnum.SAVING_DATA:
            return (
                <Fragment>
                    <Text>
                        {'Guardando datos... '}
                    </Text>
                    <Icon {...getFontAwesome('refresh')} size={24}/>
                </Fragment>
            );
        case syncStatusEnum.COMPLETED:
            return (
                <Fragment>
                    <Text>
                        {'Sincronizado '}
                    </Text>
                    <Icon {...getFontAwesome('check', 'green')} size={24}/>
                </Fragment>
            );
        case syncStatusEnum.SESSION_EXPIRED:
            return (
                <Alert danger>
                    Su sesión ha expirado, debe cerrar sesión y volver a ingresar al sistema para poder sincronizar.
                </Alert>
            );
        case syncStatusEnum.HAS_ERROR:
            return (
                <Fragment>
                    <Text>
                        {'No sincronizado '}
                    </Text>
                    <Icon {...getFontAwesome('times')} size={24}/>
                </Fragment>
            );
        case syncStatusEnum.NOT_STARTED:
        default:
            return null;
    }
};

const SyncStatus = ({syncStatus}) => (
    <View style={styles.syncStatusRow}>
        {getSyncStatus(syncStatus)}
    </View>
);

SyncStatus.propTypes = {
    syncStatus: PropTypes.string.isRequired
};

export default SyncStatus;
