import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native';
import {Col, Row, TextError} from '@indec/react-native-commons';
import {ComponentsRegistry} from '@indec/react-native-form-builder';
import {stylePropType} from '@indec/react-native-commons/util';

import canAnswerQuestion from '../../util/canAnswerQuestion';
import renderQuestionErrors from '../../util/renderQuestionErrors';

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
                    const questionAnswer = chapter[question.name];
                    return (
                        <Col>
                            <QuestionComponent
                                key={question.number}
                                question={question}
                                section={chapter}
                                answer={questionAnswer}
                                onChange={answer => onChange(answer)}
                                disabled={!canAnswerQuestion(question, chapter)}
                                style={questionStyle.style}
                                textWithBadgeStyle={questionStyle.textWithBadgeStyle}
                            />
                            {renderQuestionErrors(
                                question,
                                questionAnswer,
                                message => <TextError key={message}>{message}</TextError>
                            )}
                        </Col>
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
