import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';

import Form from '../Form';
import chapterPropTypes from '../../util/chapterPropTypes';
import NavigationButtons from '../NavigationButtons';
import Validations from '../Validations';
import validationResultsPropTypes from '../../util/validationResultsPropTypes';
import styles from './styles';

const Section = ({
    chapter, onChange, onPrevious, onSubmit, section, entity, otherEntity, validationResults
}) => (
    <View style={styles.container}>
        <Form
            rows={chapter}
            chapter={section}
            onChange={answer => onChange(answer)}
            entity={entity}
            otherEntity={otherEntity}
        />
        <Validations validationResults={validationResults}/>
        <NavigationButtons
            onBack={() => onPrevious()}
            onSubmit={() => onSubmit()}
        />
    </View>
);

Section.propTypes = {
    chapter: chapterPropTypes.isRequired,
    section: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    entity: PropTypes.shape({}),
    otherEntity: PropTypes.arrayOf(PropTypes.shape({})),
    validationResults: validationResultsPropTypes
};

Section.defaultProps = {
    entity: {},
    otherEntity: [],
    validationResults: null
};

export default Section;
