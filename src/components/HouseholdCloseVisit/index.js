import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LoadingIndicator, Title} from '@indec/react-native-commons';
import {last, isEmpty} from 'lodash';

import {requestHouseholdVisits, requestCloseHouseholdVisit} from '../../actions/survey';
import {Household} from '../../model';
import chapterPropTypes from '../../util/chapterPropTypes';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import Form from '../Form';
import NavigationButtons from '../NavigationButtons';

class HouseholdCloseVisit extends Component {
    static propTypes = {
        requestCloseHouseholdVisit: PropTypes.func.isRequired,
        requestHouseholdVisits: PropTypes.func.isRequired,
        onPrevious: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        match: matchParamsIdPropTypes.isRequired,
        chapter: chapterPropTypes.isRequired,
        household: PropTypes.instanceOf(Household).isRequired,
        householdVisits: PropTypes.arrayOf(
            PropTypes.shape({})
        ),
        saving: PropTypes.bool
    };

    static defaultProps = {
        saving: false,
        householdVisits: []
    };

    constructor(props) {
        super(props);
        this.state = {
            currentVisit: null
        };
    }

    componentWillMount() {
        const {id, dwellingOrder, householdOrder} = this.props.match.params;
        this.props.requestHouseholdVisits(id, dwellingOrder, householdOrder);
    }

    componentWillReceiveProps(nextProps) {
        const {saving, household, householdVisits} = nextProps;
        if (!isEmpty(householdVisits)) {
            this.state.currentVisit = last(householdVisits);
        }
        if (this.props.saving && !saving) {
            this.props.onSubmit(household);
        }
    }

    handleChange(answer) {
        this.setState(state => ({currentVisit: Object.assign(state.currentVisit, answer)}));
    }

    handleSubmit() {
        this.props.requestCloseHouseholdVisit(
            this.props.match.params.id,
            this.props.match.params.dwellingOrder,
            this.props.match.params.householdOrder,
            this.state.currentVisit
        );
    }

    renderContent() {
        const {chapter} = this.props;
        const {currentVisit} = this.state;
        return (
            <Fragment>
                <Title>{chapter.title}</Title>
                <Form
                    rows={chapter.rows}
                    chapter={currentVisit}
                    onChange={answer => this.handleChange(answer)}
                />
                <NavigationButtons
                    onBack={() => this.props.onPrevious()}
                    onSubmit={() => this.handleSubmit()}
                    submitButtonText="Guardar y salir"
                    iconRight={{name: 'floppy-o', color: 'red'}}
                    styleRightButton={{
                        primary: false,
                        danger: true,
                        rounded: true
                    }}
                />
            </Fragment>
        );
    }

    render() {
        return this.state.currentVisit ? this.renderContent() : <LoadingIndicator/>;
    }
}

export default connect(
    state => ({
        saving: state.survey.saving,
        householdVisits: state.survey.householdVisits
    }),
    dispatch => ({
        requestCloseHouseholdVisit: (id, dwellingOrder, householdOrder, currentVisit) => dispatch(
            requestCloseHouseholdVisit(id, dwellingOrder, householdOrder, currentVisit)
        ),
        requestHouseholdVisits: (id, dwellingOrder, householdOrder) => dispatch(
            requestHouseholdVisits(id, dwellingOrder, householdOrder)
        )
    })
)(HouseholdCloseVisit);
