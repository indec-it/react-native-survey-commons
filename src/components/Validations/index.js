import React from 'react';
import {View} from 'react-native';
import {Alert} from '@indec/react-native-commons';
import {castArray, isNil, map} from 'lodash';

import validationResultsPropTypes from '../../util/validationResultsPropTypes';
import styles from './styles';

const Validations = ({validationResults}) => (
    !isNil(validationResults) &&
    <View style={styles.container}>
        {map(castArray(validationResults), result => (
            <Alert key={result.message} danger={result.hasFailed} success={result.hasPassed}>
                {result.message}
            </Alert>
        ))}
    </View>
);

Validations.propTypes = {
    validationResults: validationResultsPropTypes
};

Validations.defaultProps = {
    validationResults: []
};

export default Validations;
