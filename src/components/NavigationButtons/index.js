import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Button, Col, Row} from '@indec/react-native-commons';
import {getFontAwesome} from '@indec/react-native-commons/util';

import styles from './styles';

const NavigatorButtons = ({onBack, submitButtonText, onSubmit}) => (
    <View style={styles.container}>
        <Row>
            <Col>
                <Button
                    icon={getFontAwesome('chevron-left', '#333')}
                    title="Anterior"
                    onPress={onBack}
                    rounded
                    buttonStyle={styles.button}
                />
            </Col>
            <Col>
                <Button
                    icon={getFontAwesome('chevron-right', '#333')}
                    title={submitButtonText}
                    onPress={onSubmit}
                    rounded
                    buttonStyle={styles.button}
                />
            </Col>
        </Row>
    </View>
);

NavigatorButtons.propTypes = {
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitButtonText: PropTypes.string
};

NavigatorButtons.defaultProps = {
    submitButtonText: 'Siguiente'
};

export default NavigatorButtons;
