import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Title} from '@indec/react-native-commons';

import {requestHousehold, requestUpdateHousehold} from '../../actions/survey';
import {Household} from '../../model';
import chapterPropTypes from '../../util/chapterPropTypes';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import {getSection, handleChangeAnswer} from '../../util/section';
import Section from '../Section';

class HouseholdEditor extends Component {
    static propTypes = {
        requestHousehold: PropTypes.func.isRequired,
        requestUpdateHousehold: PropTypes.func.isRequired,
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
        this.state = {};
    }

    componentWillMount() {
        const {id, dwellingOrder, householdOrder} = this.props.match.params;
        this.props.requestHousehold(id, dwellingOrder, householdOrder);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.household) {
            this.state.household = new Household(nextProps.household);
        }
        if (this.props.saving && !nextProps.saving) {
            this.props.onSubmit(nextProps.household);
        }
    }

    onChange(answer) {
        const {chapter} = this.props;
        const {household} = this.state;
        this.setState({household: handleChangeAnswer(household, chapter, answer)});
    }

    onSubmit() {
        const {id, dwellingOrder} = this.props.match.params;
        const {household} = this.state;
        this.props.requestUpdateHousehold(id, dwellingOrder, household);
    }

    render() {
        const {chapter} = this.props;
        const {household} = this.state;
        if (!household) {
            return null;
        }
        const section = getSection(household, chapter);
        return (
            <Fragment>
                <Title>{chapter.title}</Title>
                <Section
                    section={section}
                    chapter={chapter.rows}
                    onChange={answer => this.onChange(answer)}
                    onPrevious={() => this.props.onPrevious()}
                    onSubmit={() => this.onSubmit()}
                />
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        household: state.survey.household,
        saving: state.survey.saving
    }),
    dispatch => ({
        requestHousehold: (id, dwellingOrder, householdOrder) =>
            dispatch(requestHousehold(id, dwellingOrder, householdOrder)),
        requestUpdateHousehold: (id, dwellingOrder, household) =>
            dispatch(requestUpdateHousehold(id, dwellingOrder, household))
    })
)(HouseholdEditor);
