import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native';
import {Col, Row, TextError} from '@indec/react-native-commons';
import {ComponentsRegistry} from '@indec/react-native-form-builder';
import {stylePropType} from '@indec/react-native-commons/util';

import {callFunc, canAnswerQuestion, renderQuestionErrors} from '../../util';
import rowsPropTypes from '../../util/rowsPropTypes';

const registry = new ComponentsRegistry();

const Form = ({
    chapter, onChange, rows, style, questionStyles, entity, otherEntity
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
                                required={
                                    question.required && callFunc(question.required, chapter)
                                }
                                onChange={answer => onChange(answer)}
                                disabled={!canAnswerQuestion(question, chapter)}
                                style={questionStyle.style}
                                textWithBadgeStyle={questionStyle.textWithBadgeStyle}
                            />
                            {renderQuestionErrors(
                                question,
                                questionAnswer,
                                message => <TextError key={message}>{message}</TextError>,
                                entity,
                                otherEntity
                            )}
                        </Col>
                    );
                })}
            </Row>
        ))}
    </ScrollView>
);

Form.propTypes = {
    rows: rowsPropTypes.isRequired,
    chapter: PropTypes.shape({}),
    onChange: PropTypes.func.isRequired,
    questionStyles: PropTypes.shape({}),
    style: stylePropType,
    entity: PropTypes.shape({}),
    otherEntity: PropTypes.shape({})
};

Form.defaultProps = {
    chapter: {},
    style: {},
    questionStyles: {},
    entity: {},
    otherEntity: PropTypes.shape({})
};

export default Form;
