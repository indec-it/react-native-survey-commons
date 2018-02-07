import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
    requestSurvey,
    requestSaveSurvey,
    requestCreateHousehold,
    requestDwelling,
    requestUpdateSurvey
} from '../../actions/survey';
import FormBuilder from '../FormBuilder';
import {Dwelling, Survey} from '../../model';
import {answers} from '../../constants';
import questionPropTypes from '../../util/questionPropTypes';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import AddressCard from '../AddressCard';
import NavigationButtons from '../NavigationButtons';

class DwellingResponse extends Component {
    static propTypes = {
        requestUpdateSurvey: PropTypes.func.isRequired,
        requestDwelling: PropTypes.func.isRequired,
        rows: questionPropTypes.isRequired,
        survey: PropTypes.instanceOf(Survey).isRequired,
        dwelling: PropTypes.instanceOf(Dwelling).isRequired,
        match: matchParamsIdPropTypes.isRequired,
        onPrevious: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const {id, order} = this.props.match.params;
        this.props.requestDwelling(id, order);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dwelling) {
            this.state.dwelling = nextProps.dwelling;
        }
    }

    handleChangeAnswer(answer) {
        this.setState(state => ({
            dwelling: Object.assign(state.dwelling, answer)
        }));
    }

    goToAddressList() {
        const {address} = this.props.survey;
        this.props.onPrevious(address);
    }

    save() {
        const {dwelling} = this.state;
        const {survey} = this.props;
        this.props.requestUpdateSurvey(survey, dwelling);
        this.props.onSubmit(survey);
    }

    render() {
        const {rows, survey} = this.props;
        const {dwelling} = this.state;
        if (!survey || !dwelling) {
            return null;
        }
        return (
            <Fragment>
                <AddressCard address={survey.address}/>
                <FormBuilder
                    rows={rows}
                    chapter={dwelling}
                    onChange={answer => this.handleChangeAnswer(answer)}
                />
                <NavigationButtons
                    onBack={() => this.goToAddressList()}
                    onSubmit={() => this.save()}
                    submitButtonText={(dwelling.response === answers.NO ? 'Guardar y salir' : 'Siguiente')}
                />
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        survey: state.survey.survey,
        dwelling: state.survey.dwelling
    }),
    dispatch => ({
        requestSurvey: id => dispatch(requestSurvey(id)),
        requestSaveSurvey: survey => dispatch(requestSaveSurvey(survey)),
        requestCreateHousehold: dwelling => dispatch(requestCreateHousehold(dwelling)),
        requestDwelling: (survey, order) => dispatch(requestDwelling(survey, order)),
        requestUpdateSurvey: (survey, dwelling) => dispatch(requestUpdateSurvey(survey, dwelling))
    })
)(DwellingResponse);
