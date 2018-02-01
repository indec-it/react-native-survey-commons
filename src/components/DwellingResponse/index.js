import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {types} from '@indec/react-native-form-builder';
import YesNoButtons from '@indec/react-native-form-builder/src/components/YesNoButtons';
import Radio from '@indec/react-native-form-builder/src/components/Radio';
import {Row} from '@indec/react-native-commons';

import {answers} from '../../constants';
import {requestSurvey} from '../../actions/survey';
import {questionPropTypes} from '../../util';

import AddressCard from '../AddressCard';

class DwellingResponse extends Component {
    static propTypes = {
        requestSurvey: PropTypes.func.isRequired,
        rows: questionPropTypes.isRequired,
        survey: PropTypes.shape({}).isRequired,
        id: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.requestSurvey(this.props.id);
    }

    componentWillReceiveProps(nextProps) {
        const {survey} = nextProps;
        if (survey && !survey.dwellingResponse) {
            this.state.survey.dwellingResponse = null;
            this.state.survey.noResponseCause = null;
        }
    }

    handleChangeAnswer(answer) {
        this.setState(state => ({
            survey: Object.assign(state.survey, answer)
        }));
    }

    render() {
        const {rows} = this.props;
        const {survey} = this.state;
        if (!survey) {
            return null;
        }
        return (
            <Fragment>
                <AddressCard address={survey.address}/>
                {rows.map(row => (
                    <Row key={row.id}>
                        {row.questions.map(question => (
                            <Fragment key={question.number}>
                                {question.type === types.YES_NO_BUTTONS &&
                                <YesNoButtons
                                    question={question}
                                    answer={survey.dwellingResponse}
                                    onChange={answer => this.handleChangeAnswer(answer)}
                                />}
                                {question.type === types.RADIO && survey.dwellingResponse === answers.NO &&
                                <Radio
                                    question={question}
                                    answer={survey.noResponseCause}
                                    onChange={answer => this.handleChangeAnswer(answer)}
                                />}
                            </Fragment>
                        ))}
                    </Row>
                ))}
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        survey: state.surveys.survey
    }),
    dispatch => ({
        requestSurvey: id => dispatch(requestSurvey(id))
    })
)(DwellingResponse);
