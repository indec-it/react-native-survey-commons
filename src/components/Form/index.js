import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native';
import {Row} from '@indec/react-native-commons';
import {ComponentsRegistry} from '@indec/react-native-form-builder';
import {stylePropType} from '@indec/react-native-commons/util';

import canAnswerQuestion from '../../util/canAnswerQuestion';

const registry = new ComponentsRegistry();

const Form = ({
    chapter, onChange, rows, style, questionStyles
}) => (
    <ScrollView style={style.container}>
        {rows.map(row => (
            <Row key={row.id} style={style.row}>
                {row.questions.map(question => {
                    const QuestionComponent = registry.get(question.type);
                    const questionStyle = questionStyles[question.type] || {};
                    return (
                        <QuestionComponent
                            key={question.number}
                            question={question}
                            section={chapter}
                            answer={chapter[question.name]}
                            onChange={answer => onChange(answer)}
                            disabled={!canAnswerQuestion(question, chapter)}
                            style={questionStyle.style}
                            textWithBadgeStyle={questionStyle.textWithBadgeStyle}
                        />
                    );
                })}
            </Row>
        ))}
    </ScrollView>
);

Form.propTypes = {
    rows: PropTypes.shape({}).isRequired,
    chapter: PropTypes.shape({}),
    onChange: PropTypes.func.isRequired,
    questionStyles: PropTypes.shape({}),
    style: stylePropType
};

Form.defaultProps = {
    chapter: {},
    style: {},
    questionStyles: {}
};

export default Form;
