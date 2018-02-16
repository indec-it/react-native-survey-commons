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
    chapter, onChange, rows, style
}) => (
    <ScrollView style={style.container}>
        {rows.map(row => (
            <Row key={row.id} style={style.row}>
                {filter(
                    row.questions,
                    question => canDrawQuestion(question, chapter)
                ).map(question => {
                    const QuestionComponent = registry.get(question.type);
                    return (
                        <View style={{flex: 1}}>
                            <QuestionComponent
                                key={question.number}
                                question={question}
                                section={chapter}
                                answer={chapter[question.name]}
                                onChange={answer => onChange(answer)}
                            />
                            {
                                chapter[question.name] &&
                                <QuestionMessages
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
    style: stylePropType
};

Form.defaultProps = {
    chapter: {},
    style: {}
};

export default Form;
