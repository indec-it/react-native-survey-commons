import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import styles from './styles';

const QuestionMessages = ({
    answer, errorValidators, warningValidators
}) => (
    <View style={styles.messagesContainer}>
        {
            errorValidators
                .filter(v => v.isValid(answer))
                .map(v => (
                    <Text style={[styles.message, styles.errorMessage]}>
                        {v.getErrorMessage()}
                    </Text>
                ))
        }
        {
            warningValidators
                .filter(v => v.isValid(answer))
                .map(v => (
                    <Text style={[styles.message, styles.warningMessage]}>
                        {v.getErrorMessage()}
                    </Text>
                ))
        }
    </View>
);

QuestionMessages.propTypes = {
    answer: PropTypes.isRequired,
    errorValidators: PropTypes.shape([]),
    warningValidators: PropTypes.shape([])
};

QuestionMessages.defaultProps = {
    errorValidators: [],
    warningValidators: []
};

export default QuestionMessages;
