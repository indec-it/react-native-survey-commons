import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View} from 'react-native';
import {Row} from '@indec/react-native-commons';
import {ComponentsRegistry} from '@indec/react-native-form-builder';
import {stylePropType} from '@indec/react-native-commons/util';
import {filter} from 'lodash';

import QuestionMessages from '../QuestionMessages';
import {canDrawQuestion} from '../../util';

const registry = new ComponentsRegistry();

const Form = ({
    chapter, onChange, rows, style, componentStyles
}) => (
    <ScrollView style={style.container}>
        {rows.map(row => (
            <Row key={row.id} style={style.row}>
                {filter(
                    row.questions,
                    question => canDrawQuestion(question, chapter)
                ).map(question => {
                    const QuestionComponent = registry.get(question.type);
                    const componentStyle = componentStyles[question.type] || {};
                    return (
                        <View style={{flex: 1}}>
                            <QuestionComponent
                                key={question.number}
                                question={question}
                                section={chapter}
                                answer={chapter[question.name]}
                                onChange={answer => onChange(answer)}
                                style={componentStyle.style}
                                textWithBadgeStyle={componentStyle.textWithBadgeStyle}
                            />
                            {
                                (chapter[question.name] == null || chapter[question.name] == undefined) &&
                                <QuestionMessages
                                    chapter={chapter}
                                    answer={chapter[question.name]}
                                    errorValidators={question.errorValidators}
                                    warningValidators={question.warningValidators}
                                />
                            }
                        </View>
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
    componentStyles: PropTypes.shape({stylePropType}),
    style: stylePropType
};

Form.defaultProps = {
    chapter: {},
    style: {},
    componentStyles: {}
};

export default Form;
