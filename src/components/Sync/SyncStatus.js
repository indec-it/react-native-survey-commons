import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {getFontAwesome} from '@indec/react-native-commons/util';

import {syncStatus as syncStatusEnum} from '../../constants';
import styles from './styles';

const getSyncStatus = syncStatus => {
    switch (syncStatus) {
        case syncStatusEnum.LOADING_DATA:
            return (
                <View style={styles.syncStatusRow}>
                    <Text style={styles.syncStatusText}>Cargando datos.... </Text>
                    <Icon {...getFontAwesome('refresh')} size={32}/>
                </View>
            );
        case syncStatusEnum.SENDING_DATA:
            return (
                <View style={styles.syncStatusRow}>
                    <Text>Enviando datos.... </Text>
                    <Icon {...getFontAwesome('refresh')} size={32}/>
                </View>
            );
        case syncStatusEnum.SAVING_DATA:
            return (
                <View style={styles.syncStatusRow}>
                    <Text>Guardando datos... </Text>
                    <Icon {...getFontAwesome('refresh')} size={32}/>
                </View>
            );
        case syncStatusEnum.COMPLETED:
            return (
                <View style={styles.syncStatusRow}>
                    <Text>Sincronizado </Text>
                    <Icon {...getFontAwesome('check', 'green')} size={32}/>
                </View>
            );
        case syncStatusEnum.HAS_ERROR:
            return (
                <View style={styles.syncStatusRow}>
                    <Text>No sincronizado </Text>
                    <Icon {...getFontAwesome('times')} size={32}/>
                </View>
            );
        case syncStatusEnum.NOT_STARTED:
        default:
            return null;
    }
};

const SyncStatus = ({syncStatus}) => (
    <Fragment>
        {getSyncStatus(syncStatus)}
    </Fragment>
);

SyncStatus.propTypes = {
    syncStatus: PropTypes.string.isRequired
};

export default SyncStatus;
