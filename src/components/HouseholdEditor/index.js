import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LoadingIndicator, Title} from '@indec/react-native-commons';
import {reject} from 'lodash';

import {
    requestHousehold,
    requestHouseholds,
    requestUpdateHousehold,
    requestInterruptHousehold
} from '../../actions/survey';
import {Household} from '../../model';
import chapterPropTypes from '../../util/chapterPropTypes';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import alertIncompleteSection from '../../util/alertIncompleteSection';
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
        onInterrupt: PropTypes.func,
        match: matchParamsIdPropTypes.isRequired,
        chapter: chapterPropTypes.isRequired,
        household: PropTypes.instanceOf(Household).isRequired,
        households: PropTypes.arrayOf(Household).isRequired,
        saving: PropTypes.bool,
        interrupting: PropTypes.bool
    };

    static defaultProps = {
        saving: false,
        interrupting: false,
        onInterrupt: null
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const {id, dwellingOrder, householdOrder} = this.props.match.params;
        this.props.requestHouseholds(id, dwellingOrder);
        this.props.requestHousehold(id, dwellingOrder, householdOrder);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.household) {
            this.state.household = new Household(nextProps.household);
        }
        if (!this.props.interrupting && nextProps.interrupting) {
            this.props.onInterrupt();
        }
        if (this.props.saving && !nextProps.saving) {
            this.props.onSubmit(nextProps.household);
        }
    }

    handleChange(answer) {
        this.setState(state => ({
            household: handleChangeAnswer(state.household, this.props.chapter, answer)
        }));
    }

    handleSubmit() {
        const {chapter} = this.props;
        const {id, dwellingOrder} = this.props.match.params;
        const {household} = this.state;
        return setSectionValidity(household, chapter)
            ? this.props.requestUpdateHousehold(id, dwellingOrder, household)
            : alertIncompleteSection();
    }

    handleInterrupt() {
        const {id, dwellingOrder} = this.props.match.params;
        this.props.requestInterruptHousehold(id, dwellingOrder, this.state.household);
    }

    handlePrevious() {
        this.props.onPrevious(this.props.household);
    }

    renderContent() {
        const {chapter, households, onInterrupt} = this.props;
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
                    otherEntity={reject(households, item => item.disabled)}
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
        household: state.survey.household,
        households: state.survey.households,
        saving: state.survey.saving,
        interrupting: state.survey.interrupting
    }),
    dispatch => ({
        requestHousehold: (id, dwellingOrder, householdOrder) =>
            dispatch(requestHousehold(id, dwellingOrder, householdOrder)),
        requestHouseholds: (id, dwellingOrder) =>
            dispatch(requestHouseholds(id, dwellingOrder)),
        requestUpdateHousehold: (id, dwellingOrder, household) =>
            dispatch(requestUpdateHousehold(id, dwellingOrder, household)),
        requestInterruptHousehold: (id, dwellingOrder, household) => dispatch(
            requestInterruptHousehold(id, dwellingOrder, household)
        )
    })
)(HouseholdEditor);
