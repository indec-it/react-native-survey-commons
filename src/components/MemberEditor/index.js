import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LoadingIndicator, Title} from '@indec/react-native-commons';
import {noop} from 'lodash';

import {requestInterruptMember, requestMember, requestSaveMember} from '../../actions/survey';
import {Member} from '../../model';
import MemberData from '../MemberData';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import chapterPropTypes from '../../util/chapterPropTypes';
import alertIncompleteSection from '../../util/alertIncompleteSection';
import alertIncompleteSectionOnBack from '../../util/alertIncompleteSectionOnBack';
import {getSection, handleChangeAnswer, setSectionValidity} from '../../util/section';
import Section from '../Section';
import InterruptButton from '../InterruptButton';

class MemberEditor extends Component {
    static propTypes = {
        requestMember: PropTypes.func.isRequired,
        requestSaveMember: PropTypes.func.isRequired,
        requestInterruptMember: PropTypes.func.isRequired,
        onInterrupt: PropTypes.func,
        onPreSave: PropTypes.func,
        onPrevious: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        validate: PropTypes.func,
        match: matchParamsIdPropTypes.isRequired,
        chapter: chapterPropTypes.isRequired,
        member: PropTypes.instanceOf(Member).isRequired,
        interrupting: PropTypes.bool,
        saving: PropTypes.bool
    };

    static defaultProps = {
        onInterrupt: null,
        interrupting: false,
        onPreSave: null,
        saving: false,
        validate: noop
    };

    constructor(props) {
        super(props);
        this.goingBack = false;
        this.state = {};
    }

    componentDidMount() {
        const {
            id, dwellingOrder, householdOrder, memberOrder
        } = this.props.match.params;
        this.props.requestMember(id, dwellingOrder, householdOrder, memberOrder);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.interrupting && !this.props.interrupting) {
            this.props.onInterrupt();
        }
        if (prevProps.saving && !this.props.saving) {
            const {member} = this.state;
            if (this.goingBack) {
                this.props.onPrevious(member);
            } else {
                this.props.onSubmit(member);
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.member && (!state.member || props.member.id !== state.member.id)) {
            return {member: props.member};
        }
        return null;
    }

    handleInterrupt() {
        const {id, dwellingOrder, householdOrder} = this.props.match.params;
        this.props.requestInterruptMember(id, dwellingOrder, householdOrder, this.state.member);
    }

    handleChange(answer) {
        this.setState(state => ({
            member: handleChangeAnswer(state.member, this.props.chapter, answer)
        }));
    }

    handlePrevious() {
        const {chapter, onPreSave, onPrevious} = this.props;
        const {id, dwellingOrder, householdOrder} = this.props.match.params;
        const {member} = this.state;

        if (onPreSave) {
            onPreSave(member, this.props.member);
        }
        if (setSectionValidity(member, chapter)) {
            this.goingBack = true;
            this.props.requestSaveMember(id, dwellingOrder, householdOrder, member);
        } else {
            alertIncompleteSectionOnBack(() => onPrevious(member));
        }
    }

    handleSubmit() {
        const {chapter, onPreSave} = this.props;
        const {id, dwellingOrder, householdOrder} = this.props.match.params;
        const {member} = this.state;

        if (onPreSave) {
            onPreSave(member, this.props.member);
        }
        if (setSectionValidity(member, chapter)) {
            this.goingBack = false;
            this.props.requestSaveMember(id, dwellingOrder, householdOrder, member);
        } else {
            alertIncompleteSection();
        }
    }

    renderContent() {
        const {chapter, onInterrupt, validate} = this.props;
        const {member} = this.state;
        const section = getSection(member, chapter);
        return (
            <Fragment>
                <MemberData member={member}/>
                <InterruptButton show={!!onInterrupt} onInterrupt={() => this.handleInterrupt()}/>
                <Title>
                    {chapter.title}
                </Title>
                <Section
                    section={section}
                    rows={chapter.rows}
                    onChange={answer => this.handleChange(answer)}
                    onPrevious={() => this.handlePrevious()}
                    onSubmit={() => this.handleSubmit()}
                    entity={member}
                    validationResults={validate(section)}
                />
            </Fragment>
        );
    }

    render() {
        return this.state.member ? this.renderContent() : <LoadingIndicator/>;
    }
}

export default connect(
    state => ({
        member: state.survey.member,
        interrupting: state.survey.interrupting,
        saving: state.survey.saving
    }),
    dispatch => ({
        requestInterruptMember: (id, dwellingOrder, householdOrder, member) => dispatch(
            requestInterruptMember(id, dwellingOrder, householdOrder, member)
        ),
        requestMember: (id, dwellingOrder, householdOrder, memberOrder) => dispatch(
            requestMember(id, dwellingOrder, householdOrder, memberOrder)
        ),
        requestSaveMember: (id, dwellingOrder, householdOrder, member) => dispatch(
            requestSaveMember(id, dwellingOrder, householdOrder, member)
        )
    })
)(MemberEditor);
