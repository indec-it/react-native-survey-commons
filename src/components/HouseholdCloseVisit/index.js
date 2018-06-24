import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LoadingIndicator, Title} from '@indec/react-native-commons';

import {requestFetchCurrentHouseholdVisit, requestCloseHouseholdVisit} from '../../actions/survey';
import chapterPropTypes from '../../util/chapterPropTypes';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import householdVisitPropTypes from '../../util/householdVisitPropTypes';
import Form from '../Form';
import NavigationButtons from '../NavigationButtons';

class HouseholdCloseVisit extends Component {
    static propTypes = {
        requestCloseHouseholdVisit: PropTypes.func.isRequired,
        requestFetchCurrentHouseholdVisit: PropTypes.func.isRequired,
        onPrevious: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        match: matchParamsIdPropTypes.isRequired,
        chapter: chapterPropTypes.isRequired,
        // eslint-disable-next-line react/no-unused-prop-types
        currentHouseholdVisit: householdVisitPropTypes,
        saving: PropTypes.bool
    };

    static defaultProps = {
        saving: false,
        currentHouseholdVisit: null
    };

    constructor(props) {
        super(props);
        this.state = {
            currentHouseholdVisit: null
        };
    }

    componentDidMount() {
        const {id, dwellingOrder, householdOrder} = this.props.match.params;
        this.props.requestFetchCurrentHouseholdVisit(id, dwellingOrder, householdOrder);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.currentHouseholdVisit && (
            !state.currentHouseholdVisit || props.currentHouseholdVisit.id !== state.currentHouseholdVisit.id)
        ) {
            return {currentHouseholdVisit: props.currentHouseholdVisit};
        }
        return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.saving && !this.props.saving) {
            this.props.onSubmit();
        }
    }

    handleChange(answer) {
        this.setState(state => ({currentHouseholdVisit: Object.assign(state.currentHouseholdVisit, answer)}));
    }

    handleSubmit() {
        this.props.requestCloseHouseholdVisit(
            this.props.match.params.id,
            this.props.match.params.dwellingOrder,
            this.props.match.params.householdOrder,
            this.state.currentHouseholdVisit
        );
    }

    renderContent() {
        const {chapter} = this.props;
        const {currentHouseholdVisit} = this.state;
        return (
            <Fragment>
                <Title>{chapter.title}</Title>
                <Form
                    rows={chapter.rows}
                    chapter={currentHouseholdVisit}
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
        return this.state.currentHouseholdVisit ? this.renderContent() : <LoadingIndicator/>;
    }
}

export default connect(
    state => ({
        saving: state.survey.saving,
        currentHouseholdVisit: state.survey.currentHouseholdVisit
    }),
    dispatch => ({
        requestCloseHouseholdVisit: (id, dwellingOrder, householdOrder, currentVisit) => dispatch(
            requestCloseHouseholdVisit(id, dwellingOrder, householdOrder, currentVisit)
        ),
        requestFetchCurrentHouseholdVisit: (id, dwellingOrder, householdOrder) => dispatch(
            requestFetchCurrentHouseholdVisit(id, dwellingOrder, householdOrder)
        )
    })
)(HouseholdCloseVisit);
