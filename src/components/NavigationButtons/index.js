import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Button, Col, Row} from '@indec/react-native-commons';
import {getFontAwesome} from '@indec/react-native-commons/util';

import styles from './styles';

const NavigatorButtons = ({
    onBack, submitButtonText, onSubmit, iconLeft, iconRight, backButtonText
}) => (
    <View style={styles.container}>
        <Row>
            {onBack &&
            <Col>
                <Button
                    icon={getFontAwesome(iconLeft.name, iconLeft.color)}
                    title={backButtonText}
                    onPress={onBack}
                    rounded
                />
            </Col>}
            {onSubmit &&
            <Col>
                <Button
                    iconRight={getFontAwesome(iconRight.name, iconRight.color)}
                    title={submitButtonText}
                    onPress={onSubmit}
                    rounded
                />
            </Col>}
        </Row>
    </View>
);

NavigatorButtons.propTypes = {
    onBack: PropTypes.func,
    onSubmit: PropTypes.func,
    submitButtonText: PropTypes.string,
    backButtonText: PropTypes.string,
    iconLeft: PropTypes.shape({
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired
    }),
    iconRight: PropTypes.shape({
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired
    })
};

NavigatorButtons.defaultProps = {
    submitButtonText: 'Siguiente',
    backButtonText: 'Anterior',
    onBack: null,
    onSubmit: null,
    iconLeft: {
        name: 'chevron-left',
        color: '#333'
    },
    iconRight: {
        name: 'chevron-right',
        color: '#333'
    }
};

export default NavigatorButtons;
