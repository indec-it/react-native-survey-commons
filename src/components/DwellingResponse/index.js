import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {requestSurvey, requestSaveSurvey} from '../../actions/survey';
import FormBuilder from '../FormBuilder';
import {Survey} from '../../model';
import {answers} from '../../constants';
import questionPropTypes from '../../util/questionPropTypes';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import AddressCard from '../AddressCard';
import NavigationButtons from '../NavigationButtons';

const handleChangeSubmitButtonText = response => (response === answers.NO ? 'Cerrar Vivienda' : 'Siguiente');

class DwellingResponse extends Component {
    static propTypes = {
        requestSaveSurvey: PropTypes.func.isRequired,
        requestSurvey: PropTypes.func.isRequired,
        rows: questionPropTypes.isRequired,
        survey: PropTypes.instanceOf(Survey).isRequired,
        match: matchParamsIdPropTypes.isRequired,
        onPrevious: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            survey: new Survey(),
            submitButtonText: 'Siguiente'
        };
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.requestSurvey(id);
    }

    componentWillReceiveProps(nextProps) {
        const {survey} = nextProps;
        if (survey) {
            this.state.survey = new Survey(survey);
        }
    }

    handleChangeAnswer(answer) {
        const {survey} = this.state;
        Object.assign(survey.dwellings[0].dwellingState, answer);
        this.setState({
            survey: new Survey(survey),
            submitButtonText: handleChangeSubmitButtonText(survey.dwellings[0].dwellingState.response)
        });
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
        const {submitButtonText, survey} = this.state;
        if (!survey || !survey.dwellings) {
            return null;
        }
        return (
            <Fragment>
                <AddressCard address={survey.address}/>
                <FormBuilder
                    rows={rows}
                    chapter={survey.dwellings[0].dwellingState}
                    onChange={answer => this.handleChangeAnswer(answer)}
                />
                <NavigationButtons
                    onBack={() => this.goToAddressList()}
                    onSubmit={() => this.save()}
                    submitButtonText={submitButtonText}
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
