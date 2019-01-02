import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {ComponentsRegistry} from '@indec/react-native-form-builder';

import Form from '../Form';
import NavigationButtons from '../NavigationButtons';
import ValidationsList from '../ValidationsList';
import validationResultsPropTypes from '../../util/validationResultsPropTypes';
import styles from './styles';

const Section = ({
    rows,
    onChange,
    section,
    entity,
    otherEntity,
    validationResults,
    componentsRegistry,
    ...props
}) => (
    <View style={styles.container}>
        <Form
            {...{
                rows, componentsRegistry, entity, otherEntity
            }}
            chapter={section}
            onChange={answer => onChange(answer)}
        />
        <ValidationsList validationResults={validationResults}/>
        <NavigationButtons {...props}/>
    </View>
);

Section.propTypes = {
    rows: PropTypes.arrayOf(
        PropTypes.shape({})
    ).isRequired,
    section: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
    componentsRegistry: PropTypes.instanceOf(ComponentsRegistry),
    entity: PropTypes.shape({}),
    otherEntity: PropTypes.arrayOf(
        PropTypes.shape({})
    ),
    validationResults: validationResultsPropTypes
};

Section.defaultProps = {
    componentsRegistry: new ComponentsRegistry(),
    entity: {},
    otherEntity: [],
    validationResults: null
};

export default Section;
