import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Button} from '@indec/react-native-commons';

import styles from './styles';

const InterruptButton = ({show, onInterrupt, buttonLabel}) => show && (
    <View style={styles.actionButtons}>
        <Button onPress={onInterrupt} title={buttonLabel} primary/>
    </View>
);

InterruptButton.propTypes = {
    show: PropTypes.bool,
    onInterrupt: PropTypes.func,
    buttonLabel: PropTypes.string
};

InterruptButton.defaultProps = {
    show: false,
    onInterrupt: null,
    buttonLabel: 'Interrumpir encuesta'
};

export default InterruptButton;
