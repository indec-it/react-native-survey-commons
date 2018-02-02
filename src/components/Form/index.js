import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LoadingIndicator} from '@indec/react-native-commons';

import {requestSurvey, requestSaveSurvey} from '../../actions/survey';
import FormBuilder from '../FormBuilder';
import cleanChildrenQuestions from '../../util/cleanChildrenQuestions';
import questionPropTypes from '../../util/questionPropTypes';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import NavigationButtons from '../NavigationButtons';

class Form extends Component {
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

    componentWillMount() {
        const {id} = this.props.match.params;
        this.props.requestSurvey(id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.survey) {
            this.state.survey = nextProps.survey;
        }
    }

    handleChangeAnswer(answer) {
        this.setState(state => ({
            survey: cleanChildrenQuestions(
                this.props.rows,
                Object.assign(state.survey, answer)
            )
        }));
    }

    goToDwellingResponse() {
        const {survey} = this.state;
        this.props.onPrevious(survey._id);
    }

    save() {
        const {survey} = this.state;
        this.props.requestSaveSurvey(survey);
        this.props.onSubmit(survey._id);
    }

    renderContent() {
        const {rows} = this.props;
        const {survey} = this.state;
        return (
            <Fragment>
                <FormBuilder
                    rows={rows}
                    chapter={survey}
                    onChange={answer => this.handleChangeAnswer(answer)}
                />
                <NavigationButtons
                    onBack={() => this.goToDwellingResponse()}
                    onSubmit={() => this.save()}
                />
            </Fragment>
        );
    }

    render() {
        return this.state.survey ? this.renderContent() : <LoadingIndicator/>;
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
)(Form);
