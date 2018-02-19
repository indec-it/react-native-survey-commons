import React from 'react';
import PropTypes from 'prop-types';
import {Button, Col, Row} from '@indec/react-native-commons';

import styles from './styles';

const NavigatorButtons = ({
    onBack, submitButtonText, onSubmit, disableSubmit
}) => (
    <Row>
        <Col>
            <Button
                title="Anterior"
                onPress={onBack}
                rounded
                buttonStyle={styles.button}
            />
        </Col>
        <Col>
            <Button
                disabled={disableSubmit}
                title={submitButtonText}
                onPress={onSubmit}
                rounded
                buttonStyle={styles.button}
            />
        </Col>
    </Row>
);

NavigatorButtons.propTypes = {
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitButtonText: PropTypes.string,
    disableSubmit: PropTypes.bool
};

NavigatorButtons.defaultProps = {
    submitButtonText: 'Siguiente',
    disableSubmit: false
};

export default NavigatorButtons;
