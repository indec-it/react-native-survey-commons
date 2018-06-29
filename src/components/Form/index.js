import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native';
import {Col, Row} from '@indec/react-native-commons';
import {ComponentsRegistry} from '@indec/react-native-form-builder';
import {stylePropType} from '@indec/react-native-commons/util';

import QuestionValidation from '../QuestionValidation';
import {callFunc, canAnswerQuestion} from '../../util';
import rowsPropTypes from '../../util/rowsPropTypes';

const Form = ({
    chapter, onChange, rows, style, questionStyles, entity, otherEntity, componentsRegistry
}) => (
    <ScrollView style={style.container}>
        {rows.map(row => (
            <Row key={row.id} style={style.row}>
                {row.questions.map(question => {
                    const QuestionComponent = componentsRegistry.get(question.type);
                    const questionStyle = questionStyles[question.type] || {};
                    const questionAnswer = chapter[question.name];
                    return (
                        <Col key={question.id}>
                            <QuestionComponent
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
                            <QuestionValidation
                                question={question}
                                answer={questionAnswer}
                                entity={entity}
                                otherEntity={otherEntity}
                            />
                        </Col>
                    );
                })}
            </Row>
        ))}
    </ScrollView>
);

Form.propTypes = {
    rows: rowsPropTypes.isRequired,
    onChange: PropTypes.func.isRequired,
    componentsRegistry: PropTypes.instanceOf(ComponentsRegistry),
    chapter: PropTypes.shape({}),
    questionStyles: PropTypes.shape({}),
    style: stylePropType,
    entity: PropTypes.shape({}),
    otherEntity: PropTypes.arrayOf(
        PropTypes.shape({})
    )
};

Form.defaultProps = {
    componentsRegistry: new ComponentsRegistry(),
    chapter: {},
    style: {},
    questionStyles: {},
    entity: {},
    otherEntity: PropTypes.shape({})
};

export default Form;
