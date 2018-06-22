import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LoadingIndicator, Title} from '@indec/react-native-commons';
import {noop} from 'lodash';

import {
    requestHousehold,
    requestUpdateHousehold,
    requestAddress,
    requestInterruptHousehold
} from '../../actions/survey';
import {Address, Household} from '../../model';
import {InterruptButton} from '../..';
import chapterPropTypes from '../../util/chapterPropTypes';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import alertIncompleteSection from '../../util/alertIncompleteSection';
import alertIncompleteSectionOnBack from '../../util/alertIncompleteSectionOnBack';
import {getSection, handleChangeAnswer, setSectionValidity} from '../../util/section';
import Section from '../Section';
import AddressCard from '../AddressCard';

class HouseholdResponse extends Component {
    static propTypes = {
        requestAddress: PropTypes.func.isRequired,
        requestInterruptHousehold: PropTypes.func.isRequired,
        requestHousehold: PropTypes.func.isRequired,
        requestUpdateHousehold: PropTypes.func.isRequired,
        onPrevious: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        onInterrupt: PropTypes.func,
        validate: PropTypes.func,
        match: matchParamsIdPropTypes.isRequired,
        chapter: chapterPropTypes.isRequired,
        household: PropTypes.instanceOf(Household).isRequired,
        address: PropTypes.instanceOf(Address).isRequired,
        saving: PropTypes.bool,
        interrupting: PropTypes.bool
    };

    static defaultProps = {
        saving: false,
        interrupting: false,
        onInterrupt: null,
        validate: noop
    };

    constructor(props) {
        super(props);
        this.goingBack = false;
        this.state = {};
    }

    static getDerivedStateFromProps(props, state) {
        if (props.household && (!state.household || props.household.id !== state.household.id)) {
            return {household: props.household};
        }
        return null;
    }

    componentDidMount() {
        const {id, dwellingOrder, householdOrder} = this.props.match.params;
        this.props.requestHousehold(id, dwellingOrder, householdOrder);
        this.props.requestAddress(id);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.interrupting && !this.props.interrupting) {
            this.props.onInterrupt();
        }
        if (prevProps.saving && !this.props.saving) {
            const {household} = this.state;
            if (this.goingBack) {
                this.props.onPrevious(household);
            } else {
                this.props.onSubmit(household);
            }
        }
    }

    handleChange(answer) {
        this.setState(state => ({
            household: handleChangeAnswer(state.household, this.props.chapter, answer)
        }));
    }

    handleInterrupt() {
        const {id, dwellingOrder} = this.props.match.params;
        this.props.requestInterruptHousehold(id, dwellingOrder, this.state.household);
    }

    handlePrevious() {
        const {chapter, onPrevious} = this.props;
        const {id, dwellingOrder} = this.props.match.params;
        const {household} = this.state;

        if (setSectionValidity(household, chapter)) {
            this.goingBack = true;
            this.props.requestUpdateHousehold(id, dwellingOrder, household);
        } else {
            alertIncompleteSectionOnBack(() => onPrevious(household));
        }
    }

    handleSubmit() {
        const {chapter} = this.props;
        const {id, dwellingOrder} = this.props.match.params;
        const {household} = this.state;

        if (setSectionValidity(household, chapter)) {
            this.goingBack = false;
            this.props.requestUpdateHousehold(id, dwellingOrder, household);
        } else {
            alertIncompleteSection();
        }
    }

    renderContent() {
        const {
            address, chapter, onInterrupt, validate
        } = this.props;
        const {household} = this.state;
        const section = getSection(household, chapter);
        return (
            <Fragment>
                <InterruptButton show={!!onInterrupt} onInterrupt={() => this.handleInterrupt()}/>
                <AddressCard address={address}/>
                <Title>{chapter.title}</Title>
                <Section
                    section={section}
                    chapter={chapter.rows}
                    onChange={answer => this.handleChange(answer)}
                    onPrevious={() => this.handlePrevious()}
                    onSubmit={() => this.handleSubmit()}
                    validationResults={validate(section)}
                />
            </Fragment>
        );
    }

    render() {
        return this.state.household && this.props.address ? this.renderContent() : <LoadingIndicator/>;
    }
}

export default connect(
    state => ({
        household: state.survey.household,
        address: state.survey.address,
        saving: state.survey.saving,
        interrupting: state.survey.interrupting
    }),
    dispatch => ({
        requestHousehold: (id, dwellingOrder, householdOrder) =>
            dispatch(requestHousehold(id, dwellingOrder, householdOrder)),
        requestUpdateHousehold: (id, dwellingOrder, household) =>
            dispatch(requestUpdateHousehold(id, dwellingOrder, household)),
        requestAddress: id => dispatch(requestAddress(id)),
        requestInterruptHousehold: (id, dwellingOrder, household) => dispatch(
            requestInterruptHousehold(id, dwellingOrder, household)
        )
    })
)(HouseholdResponse);
