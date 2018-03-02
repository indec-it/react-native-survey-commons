import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import styles from './styles';

const QuestionMessages = ({
    chapter, answer, errorValidators, warningValidators
}) => (
    <View style={styles.messagesContainer}>
        {
            errorValidators
                .filter(v => v.isValid(answer, chapter))
                .map(v => (
                    <View style={[styles.messageContainer, styles.errorMessageContainer]}>
                        <Text style={styles.message}>
                            {v.getErrorMessage()}
                        </Text>
                    </View>
                ))
        }
        {
            warningValidators
                .filter(v => v.isValid(answer, chapter))
                .map(v => (
                    <View style={[styles.messageContainer, styles.warningMessageContainer]}>
                        <Text style={styles.message}>
                            {v.getErrorMessage()}
                        </Text>
                    </View>
                ))
        }
    </View>
);

QuestionMessages.propTypes = {
    answer: PropTypes.isRequired,
    chapter: PropTypes.isRequired,
    errorValidators: PropTypes.shape([]),
    warningValidators: PropTypes.shape([])
};

QuestionMessages.defaultProps = {
    errorValidators: [],
    warningValidators: []
};

export default QuestionMessages;
