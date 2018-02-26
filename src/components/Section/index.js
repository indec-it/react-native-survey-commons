import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';

import Form from '../Form';
import chapterPropTypes from '../../util/chapterPropTypes';
import NavigationButtons from '../NavigationButtons';
import styles from './styles';

const Section = ({
    chapter, onChange, onPrevious, onSubmit, section
}) => (
    <View style={styles.container}>
        <Form
            rows={chapter}
            chapter={section}
            onChange={answer => onChange(answer)}
        />
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
    onSubmit: PropTypes.func.isRequired
};

export default Section;
