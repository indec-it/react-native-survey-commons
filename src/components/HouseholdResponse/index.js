import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LoadingIndicator, Title} from '@indec/react-native-commons';
import {noop} from 'lodash';

import {
    requestHousehold,
    requestAddress,
    requestFetchCurrentHouseholdVisit,
    requestSaveHouseholdVisit
} from '../../actions/survey';
import {Address, Household} from '../../model';
import InterruptButton from '../InterruptButton';
import chapterPropTypes from '../../util/chapterPropTypes';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import alertIncompleteSection from '../../util/alertIncompleteSection';
import alertIncompleteSectionOnBack from '../../util/alertIncompleteSectionOnBack';
import householdVisitPropTypes from '../../util/householdVisitPropTypes';
import {getSection, handleChangeAnswer, setSectionValidity} from '../../util/section';
import Section from '../Section';
import AddressCard from '../AddressCard';

class HouseholdResponse extends Component {
    static propTypes = {
        requestAddress: PropTypes.func.isRequired,
        requestFetchCurrentHouseholdVisit: PropTypes.func.isRequired,
        requestHousehold: PropTypes.func.isRequired,
        requestSaveHouseholdVisit: PropTypes.func.isRequired,
        onPrevious: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        onInterrupt: PropTypes.func,
        validate: PropTypes.func,
        match: matchParamsIdPropTypes.isRequired,
        chapter: chapterPropTypes.isRequired,
        household: PropTypes.instanceOf(Household).isRequired,
        address: PropTypes.instanceOf(Address).isRequired,
        // eslint-disable-next-line react/no-unused-prop-types
        currentHouseholdVisit: householdVisitPropTypes,
        saving: PropTypes.bool,
        lastUserLogged: PropTypes.string
    };

    static defaultProps = {
        saving: false,
        validate: noop,
        onInterrupt: null,
        lastUserLogged: null,
        currentHouseholdVisit: {}
    };

    constructor(props) {
        super(props);
        this.goingBack = false;
        this.state = {};
    }

    componentDidMount() {
        const {id, dwellingOrder, householdOrder} = this.props.match.params;
        this.props.requestHousehold(id, dwellingOrder, householdOrder);
        this.props.requestFetchCurrentHouseholdVisit(id, dwellingOrder, householdOrder);
        this.props.requestAddress(id);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.saving && !this.props.saving) {
            const {household} = this.props;
            if (this.goingBack) {
                this.props.onPrevious(household);
            } else {
                this.props.onSubmit(household);
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.household && props.currentHouseholdVisit && (
            !state.currentHouseholdVisit || props.household.id !== state.householdId
        )) {
            return {
                currentHouseholdVisit: props.currentHouseholdVisit,
                householdId: props.household.id
            };
        }
        return null;
    }

    handleChange(answer) {
        this.setState(state => ({
            currentHouseholdVisit: handleChangeAnswer(state.currentHouseholdVisit, this.props.chapter, answer)
        }));
    }

    handlePrevious() {
        const {chapter, household, onPrevious} = this.props;
        const {id, dwellingOrder} = this.props.match.params;
        const {currentHouseholdVisit} = this.state;
        if (setSectionValidity(currentHouseholdVisit, chapter)) {
            this.goingBack = true;
            this.props.requestSaveHouseholdVisit(id, dwellingOrder, household.order, currentHouseholdVisit);
        } else {
            alertIncompleteSectionOnBack(() => onPrevious(household));
        }
    }

    handleSubmit() {
        const {chapter, household, lastUserLogged} = this.props;
        const {id, dwellingOrder} = this.props.match.params;
        const {currentHouseholdVisit} = this.state;
        if (setSectionValidity(currentHouseholdVisit, chapter)) {
            this.goingBack = false;
            currentHouseholdVisit.user = lastUserLogged;
            this.props.requestSaveHouseholdVisit(id, dwellingOrder, household.order, currentHouseholdVisit);
        } else {
            alertIncompleteSection();
        }
    }

    renderContent() {
        const {
            address, chapter, household, onInterrupt, validate
        } = this.props;
        const {currentHouseholdVisit} = this.state;
        const section = getSection(household, chapter);
        return (
            <Fragment>
                <InterruptButton show={!!onInterrupt} onInterrupt={onInterrupt}/>
                <AddressCard address={address}/>
                <Title>
                    {chapter.title}
                </Title>
                <Section
                    section={currentHouseholdVisit}
                    rows={chapter.rows}
                    onChange={answer => this.handleChange(answer)}
                    onPrevious={() => this.handlePrevious()}
                    onSubmit={() => this.handleSubmit()}
                    validationResults={validate(section)}
                />
            </Fragment>
        );
    }

    render() {
        return this.props.household && this.state.currentHouseholdVisit ? this.renderContent() : <LoadingIndicator/>;
    }
}

export default connect(
    state => ({
        household: state.survey.household,
        address: state.survey.address,
        currentHouseholdVisit: state.survey.currentHouseholdVisit,
        saving: state.survey.saving,
        lastUserLogged: state.session.lastUserLogged
    }),
    dispatch => ({
        requestHousehold: (id, dwellingOrder, householdOrder) => dispatch(
            requestHousehold(id, dwellingOrder, householdOrder)
        ),
        requestSaveHouseholdVisit: (id, dwellingOrder, householdOrder, visit) => dispatch(
            requestSaveHouseholdVisit(id, dwellingOrder, householdOrder, visit)
        ),
        requestAddress: id => dispatch(requestAddress(id)),
        requestFetchCurrentHouseholdVisit: (id, dwellingOrder, householdOrder) => dispatch(
            requestFetchCurrentHouseholdVisit(id, dwellingOrder, householdOrder)
        )
    })
)(HouseholdResponse);
