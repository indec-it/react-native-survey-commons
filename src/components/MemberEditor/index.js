import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Title} from '@indec/react-native-commons';

import {requestMember, requestSaveMember} from '../../actions/survey';
import {Member} from '../../model';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import chapterPropTypes from '../../util/chapterPropTypes';
import {getSection, handleChangeAnswer} from '../../util/section';
import Section from '../Section';

class MemberEditor extends Component {
    static propTypes = {
        requestMember: PropTypes.func.isRequired,
        requestSaveMember: PropTypes.func.isRequired,
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

    componentWillMount() {
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

    onChange(answer) {
        const {chapter} = this.props;
        const {member} = this.state;
        this.setState({member: handleChangeAnswer(member, chapter, answer)});
    }

    onSubmit() {
        const {
            id, dwellingOrder, householdOrder
        } = this.props.match.params;
        const {member} = this.state;
        this.props.requestSaveMember(id, dwellingOrder, householdOrder, member);
    }

    render() {
        const {chapter} = this.props;
        const {member} = this.state;
        if (!member) {
            return null;
        }
        const section = getSection(member, chapter);
        return (
            <Fragment>
                <Title>{chapter.title}</Title>
                <Section
                    section={section}
                    chapter={chapter.rows}
                    onChange={answer => this.onChange(answer)}
                    onPrevious={() => this.props.onPrevious(member)}
                    onSubmit={() => this.onSubmit()}
                />
            </Fragment>
        );
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
