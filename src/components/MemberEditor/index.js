import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, LoadingIndicator, Title} from '@indec/react-native-commons';

import {requestMember, requestSaveMember} from '../../actions/survey';
import {Member} from '../../model';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import chapterPropTypes from '../../util/chapterPropTypes';
import alertIncompleteSection from '../../util/alertIncompleteSection';
import {getSection, handleChangeAnswer, setSectionValidity} from '../../util/section';
import Section from '../Section';

class MemberEditor extends Component {
    static propTypes = {
        requestMember: PropTypes.func.isRequired,
        requestSaveMember: PropTypes.func.isRequired,
        onInterrupt: PropTypes.func.isRequired,
        onPrevious: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        match: matchParamsIdPropTypes.isRequired,
        chapter: chapterPropTypes.isRequired,
        member: PropTypes.instanceOf(Member).isRequired,
        saving: PropTypes.bool
    };

    static defaultProps = {
        saving: false
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const {
            id, dwellingOrder, householdOrder, memberOrder
        } = this.props.match.params;
        this.props.requestMember(id, dwellingOrder, householdOrder, memberOrder);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.member) {
            this.state.member = new Member(nextProps.member);
        }
        if (this.props.saving && !nextProps.saving) {
            this.props.onSubmit(nextProps.member);
        }
    }

    handleChange(answer) {
        this.setState(state => ({
            member: handleChangeAnswer(state.member, this.props.chapter, answer)
        }));
    }

    handleSubmit() {
        const {chapter} = this.props;
        const {id, dwellingOrder, householdOrder} = this.props.match.params;
        const {member} = this.state;
        return setSectionValidity(member, chapter)
            ? this.props.requestSaveMember(id, dwellingOrder, householdOrder, member)
            : alertIncompleteSection();
    }

    renderContent() {
        const {chapter} = this.props;
        const {member} = this.state;
        const section = getSection(member, chapter);
        return (
            <Fragment>
                <Button
                    primary
                    title="Interrumpir encuesta"
                    onPress={() => this.props.onInterrupt()}
                />
                <Title>{chapter.title}</Title>
                <Section
                    section={section}
                    chapter={chapter.rows}
                    onChange={answer => this.handleChange(answer)}
                    onPrevious={() => this.props.onPrevious(member)}
                    onSubmit={() => this.handleSubmit()}
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
        saving: state.survey.saving
    }),
    dispatch => ({
        requestMember: (id, dwellingOrder, householdOrder, memberOrder) =>
            dispatch(requestMember(id, dwellingOrder, householdOrder, memberOrder)),
        requestSaveMember: (id, dwellingOrder, householdOrder, member) =>
            dispatch(requestSaveMember(id, dwellingOrder, householdOrder, member))
    })
)(MemberEditor);
