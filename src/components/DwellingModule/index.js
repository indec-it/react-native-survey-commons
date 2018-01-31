import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row} from '@indec/react-native-commons';
import Radio from '@indec/react-native-form-builder/src/components/Radio';
import YesNoButtons from '@indec/react-native-form-builder/src/components/YesNoButtons';
import DecimalInput from '@indec/react-native-form-builder/src/components/DecimalInput';
import {types} from '@indec/react-native-form-builder';

import {answers} from '../../constants';
import questionPropTypes from '../questionPropTypes';

import {requestSurvey} from '../../actions/survey';

class DwellingModule extends Component {
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
        if (survey && !survey.dwellingState) {
            this.state.survey.dwellingState.response = null;
            this.state.survey.dwellingSituation.numberOfPersons = null;
            this.state.survey.dwellingSituation.sharingFoodCost = null;
            this.state.survey.dwellingSituation.sharingFoodCostGroups = null;
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
                {rows.map(row => (
                    <Row key={row.id}>
                        {row.questions.map(question => (
                            <Fragment key={question.number}>
                                {question.type === types.RADIO &&
                                <Radio
                                    question={question}
                                    answer={survey[question.name]}
                                    onChange={answer => this.handleChangeAnswer(answer)}
                                />}
                                {question.type === types.YES_NO_BUTTONS && survey.dwellingState.response &&
                                survey.dwellingSituation.numberOfPersons &&
                                <YesNoButtons
                                    question={question}
                                    answer={survey[question.name]}
                                    onChange={answer => this.handleChangeAnswer(answer)}
                                />}
                                {question.type === types.DECIMAL_INPUT &&
                                survey.dwellingSituation.sharingFoodCost === answers.NO &&
                                <DecimalInput
                                    question={question}
                                    answer={survey[question.name]}
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
)(DwellingModule);
