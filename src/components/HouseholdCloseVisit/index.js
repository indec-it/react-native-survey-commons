import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LoadingIndicator, Title} from '@indec/react-native-commons';

import {requestCloseHouseholdVisit} from '../../actions/survey';
import {Household} from '../../model';
import chapterPropTypes from '../../util/chapterPropTypes';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import Form from '../Form';
import NavigationButtons from '../NavigationButtons';

class HouseholdCloseVisit extends Component {
    static propTypes = {
        requestCloseHouseholdVisit: PropTypes.func.isRequired,
        onPrevious: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        match: matchParamsIdPropTypes.isRequired,
        chapter: chapterPropTypes.isRequired,
        household: PropTypes.instanceOf(Household).isRequired,
        saving: PropTypes.bool
    };

    static defaultProps = {
        saving: false
    };

    constructor(props) {
        super(props);
        this.state = {
            visitDetails: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.saving && !nextProps.saving) {
            this.props.onSubmit(nextProps.household);
        }
    }

    handleChange(answer) {
        this.setState(state => ({visitDetails: Object.assign(state.visitDetails, answer)}));
    }

    handleSubmit() {
        this.props.requestCloseHouseholdVisit(
            this.props.match.params.id,
            this.props.match.params.dwellingOrder,
            this.props.match.params.householdOrder,
            this.state.visitDetails
        );
    }

    renderContent() {
        const {chapter} = this.props;
        const {visitDetails} = this.state;
        return (
            <Fragment>
                <Title>{chapter.title}</Title>
                <Form
                    rows={chapter.rows}
                    chapter={visitDetails}
                    onChange={answer => this.handleChange(answer)}
                />
                <NavigationButtons
                    onBack={() => this.props.onPrevious()}
                    onSubmit={() => this.handleSubmit()}
                    submitButtonText="Guardar y salir"
                />
            </Fragment>
        );
    }

    render() {
        return !this.props.saving ? this.renderContent() : <LoadingIndicator/>;
    }
}

export default connect(
    state => ({
        saving: state.survey.saving
    }),
    dispatch => ({
        requestCloseHouseholdVisit: (id, dwellingOrder, householdOrder, visitDetails) => dispatch(
            requestCloseHouseholdVisit(id, dwellingOrder, householdOrder, visitDetails)
        )
    })
)(HouseholdCloseVisit);
