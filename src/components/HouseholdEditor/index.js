import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LoadingIndicator, Title} from '@indec/react-native-commons';
import {noop} from 'lodash';

import {
    requestHouseholds,
    requestUpdateHousehold,
    requestInterruptHousehold,
    requestHousehold
} from '../../actions/survey';
import {Household} from '../../model';
import chapterPropTypes from '../../util/chapterPropTypes';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import alertIncompleteSection from '../../util/alertIncompleteSection';
import alertIncompleteSectionOnBack from '../../util/alertIncompleteSectionOnBack';
import {getSection, handleChangeAnswer, setSectionValidity} from '../../util/section';
import Section from '../Section';
import InterruptButton from '../InterruptButton';

class HouseholdEditor extends Component {
    static propTypes = {
        requestHousehold: PropTypes.func.isRequired,
        requestHouseholds: PropTypes.func.isRequired,
        requestInterruptHousehold: PropTypes.func.isRequired,
        requestUpdateHousehold: PropTypes.func.isRequired,
        onPrevious: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        match: matchParamsIdPropTypes.isRequired,
        chapter: chapterPropTypes.isRequired,
        households: PropTypes.arrayOf(Household).isRequired,
        saving: PropTypes.bool,
        interrupting: PropTypes.bool,
        onInterrupt: PropTypes.func,
        validate: PropTypes.func
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
        this.props.requestHouseholds(id, dwellingOrder);
        this.props.requestHousehold(id, dwellingOrder, householdOrder);
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

    handleInterrupt() {
        const {id, dwellingOrder} = this.props.match.params;
        this.props.requestInterruptHousehold(id, dwellingOrder, this.state.household);
    }

    renderContent() {
        const {
            chapter, households, onInterrupt, validate
        } = this.props;
        const {household} = this.state;
        const section = getSection(household, chapter);
        return (
            <Fragment>
                <InterruptButton show={!!onInterrupt} onInterrupt={() => this.handleInterrupt()}/>
                <Title>{chapter.title}</Title>
                <Section
                    section={section}
                    chapter={chapter.rows}
                    onChange={answer => this.handleChange(answer)}
                    onPrevious={() => this.handlePrevious()}
                    onSubmit={() => this.handleSubmit()}
                    entity={household}
                    otherEntity={households}
                    validationResults={validate(section)}
                />
            </Fragment>
        );
    }

    render() {
        return this.state.household ? this.renderContent() : <LoadingIndicator/>;
    }
}

export default connect(
    state => ({
        households: state.survey.households,
        household: state.survey.household,
        saving: state.survey.saving,
        interrupting: state.survey.interrupting
    }),
    dispatch => ({
        requestHouseholds: (id, dwellingOrder) => dispatch(
            requestHouseholds(id, dwellingOrder)
        ),
        requestUpdateHousehold: (id, dwellingOrder, household) => dispatch(
            requestUpdateHousehold(id, dwellingOrder, household)
        ),
        requestInterruptHousehold: (id, dwellingOrder, household) => dispatch(
            requestInterruptHousehold(id, dwellingOrder, household)
        ),
        requestHousehold: (id, dwellingOrder, householdOrder) => dispatch(
            requestHousehold(id, dwellingOrder, householdOrder)
        )
    })
)(HouseholdEditor);
