import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Button, Col, Row} from '@indec/react-native-commons';
import {getFontAwesome} from '@indec/react-native-commons/util';

import buttonStyleDefaultProps from '../../util/buttonStyleDefaultProps';
import buttonStylePropTypes from '../../util/buttonStylePropTypes';
import iconPropTypes from '../../util/iconPropTypes';
import styles from './styles';

const NavigatorButtons = ({
    onBack,
    onInterrupt,
    backButtonText,
    interruptButtonText,
    submitButtonText,
    onSubmit,
    iconLeft,
    iconRight,
    styleRightButton,
    styleCenterButton,
    styleLeftButton
}) => (
    <View style={styles.container}>
        <Row>
            {onBack && (
                <Col>
                    <Button
                        {...styleLeftButton}
                        icon={getFontAwesome(iconLeft.name, iconLeft.color)}
                        title={backButtonText}
                        onPress={onBack}
                    />
                </Col>
            )}
            {onInterrupt && (
                <Col>
                    <Button
                        {...styleCenterButton}
                        title={interruptButtonText}
                        onPress={onInterrupt}
                    />
                </Col>
            )}
            {onSubmit && (
                <Col>
                    <Button
                        {...styleRightButton}
                        iconRight={getFontAwesome(iconRight.name, iconRight.color)}
                        title={submitButtonText}
                        onPress={onSubmit}
                    />
                </Col>
            )}
        </Row>
    </View>
);

NavigatorButtons.propTypes = {
    onBack: PropTypes.func,
    onInterrupt: PropTypes.func,
    onSubmit: PropTypes.func,
    submitButtonText: PropTypes.string,
    interruptButtonText: PropTypes.string,
    backButtonText: PropTypes.string,
    iconLeft: iconPropTypes,
    iconRight: iconPropTypes,
    styleRightButton: buttonStylePropTypes,
    styleCenterButton: buttonStylePropTypes,
    styleLeftButton: buttonStylePropTypes
};

NavigatorButtons.defaultProps = {
    submitButtonText: 'Siguiente',
    interruptButtonText: 'Interrumpir encuesta',
    backButtonText: 'Anterior',
    onBack: null,
    onInterrupt: null,
    onSubmit: null,
    iconLeft: {
        name: 'chevron-left',
        color: '#333'
    },
    iconRight: {
        name: 'chevron-right',
        color: '#333'
    },
    styleRightButton: buttonStyleDefaultProps,
    styleCenterButton: buttonStyleDefaultProps,
    styleLeftButton: buttonStyleDefaultProps
};

export default NavigatorButtons;
