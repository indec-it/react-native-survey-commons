import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {types} from '@indec/react-native-form-builder';
import YesNoButtons from '@indec/react-native-form-builder/src/components/YesNoButtons';
import Radio from '@indec/react-native-form-builder/src/components/Radio';
import {Row} from '@indec/react-native-commons';

import {answers} from '../../constants';
import {requestSurvey, requestSaveSurvey} from '../../actions/survey';
import questionPropTypes from '../../util/questionPropTypes';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import AddressCard from '../AddressCard';
import NavigationButtons from '../NavigationButtons';

class DwellingResponse extends Component {
    static propTypes = {
        requestSaveSurvey: PropTypes.func.isRequired,
        requestSurvey: PropTypes.func.isRequired,
        rows: questionPropTypes.isRequired,
        survey: PropTypes.shape({}).isRequired,
        match: matchParamsIdPropTypes.isRequired,
        onPrevious: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.requestSurvey(id);
    }

    componentWillReceiveProps(nextProps) {
        const {survey} = nextProps;
        if (survey) {
            this.state.survey = survey;
            if (!survey.dwellingResponse) {
                this.state.survey.dwellingResponse = null;
                this.state.survey.noResponseCause = null;
            }
        }
    }

    handleChangeAnswer(answer) {
        this.setState(state => ({
            survey: Object.assign(state.survey, answer)
        }));
    }

    goToAddressList() {
        const {address} = this.state.survey;
        this.props.onPrevious(address);
    }

    save() {
        const {survey} = this.state;
        this.props.requestSaveSurvey(survey);
        this.props.onSubmit(survey._id);
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
                <NavigationButtons
                    onBack={() => this.goToAddressList()}
                    onSubmit={() => this.save()}
                />
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        survey: state.survey.survey
    }),
    dispatch => ({
        requestSurvey: id => dispatch(requestSurvey(id)),
        requestSaveSurvey: survey => dispatch(requestSaveSurvey(survey))
    })
)(DwellingResponse);
