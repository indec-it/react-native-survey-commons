import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';

import Form from '../Form';
import NavigationButtons from '../NavigationButtons';
import ValidationsList from '../ValidationsList';
import validationResultsPropTypes from '../../util/validationResultsPropTypes';
import styles from './styles';

const Section = ({
    rows, onChange, onPrevious, onSubmit, section, entity, otherEntity, validationResults
}) => (
    <View style={styles.container}>
        <Form
            rows={rows}
            chapter={section}
            onChange={answer => onChange(answer)}
            entity={entity}
            otherEntity={otherEntity}
        />
        <ValidationsList validationResults={validationResults}/>
        <NavigationButtons
            onBack={() => onPrevious()}
            onSubmit={() => onSubmit()}
        />
    </View>
);

Section.propTypes = {
    rows: PropTypes.arrayOf(
        PropTypes.shape({})
    ).isRequired,
    section: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    entity: PropTypes.shape({}),
    otherEntity: PropTypes.arrayOf(
        PropTypes.shape({})
    ),
    validationResults: validationResultsPropTypes
};

Section.defaultProps = {
    entity: {},
    otherEntity: [],
    validationResults: null
};

export default Section;
