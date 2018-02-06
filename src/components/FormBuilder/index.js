import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native';
import {Row} from '@indec/react-native-commons';
import {ComponentsRegistry} from '@indec/react-native-form-builder';
import {filter} from 'lodash';

import {canDrawQuestion} from '../../util';

const FormBuilder = ({chapter, onChange, rows}) => {
    const registry = new ComponentsRegistry();
    return (
        <ScrollView>
            {rows.map(row => (
                <Row key={row.id}>
                    {filter(
                        row.questions,
                        question => canDrawQuestion(question, chapter)
                    ).map(question => {
                        const QuestionComponent = registry.get(question.type);
                        return (
                            <QuestionComponent
                                key={question.number}
                                question={question}
                                section={chapter}
                                answer={chapter[question.name]}
                                onChange={answer => onChange(answer)}
                            />
                        );
                    })}
                </Row>
            ))}
        </ScrollView>
    );
};

FormBuilder.propTypes = {
    rows: PropTypes.shape({}).isRequired,
    chapter: PropTypes.shape({}),
    onChange: PropTypes.func.isRequired
};

FormBuilder.defaultProps = {
    chapter: {}
};

export default FormBuilder;
