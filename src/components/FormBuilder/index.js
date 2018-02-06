import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native';
import {Row} from '@indec/react-native-commons';
import {ComponentsMapper} from '@indec/react-native-form-builder';
import {filter} from 'lodash';

import {canDrawQuestion} from '../../util';
import fromComponentsStyles from '../../styles/fromComponents';

const FormBuilder = ({chapter, onChange, rows}) => {
    const mapper = new ComponentsMapper();
    return (
        <ScrollView>
            {rows.map(row => (
                <Row key={row.id}>
                    {filter(
                        row.questions,
                        question => canDrawQuestion(question, chapter)
                    ).map(question => {
                        const QuestionComponent = mapper.getComponent(question.type);
                        const componentStyle = fromComponentsStyles[question.type] || fromComponentsStyles.none;
                        return (
                            <QuestionComponent
                                key={question.number}
                                question={question}
                                answer={chapter[question.name]}
                                onChange={answer => onChange(answer)}
                                style={componentStyle.style}
                                badgeStyle={componentStyle.badgeStyle}
                                textStyle={componentStyle.textStyle}
                                textBoxStyle={componentStyle.textBoxStyle}
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
