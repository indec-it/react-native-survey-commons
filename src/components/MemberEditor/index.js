import React, {Component, Fragment} from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, LoadingIndicator, Title} from '@indec/react-native-commons';
import {isFunction} from 'lodash';

import {requestInterruptMember, requestMember, requestSaveMember} from '../../actions/survey';
import {Member} from '../../model';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import chapterPropTypes from '../../util/chapterPropTypes';
import getMemberName from '../../util/getMemberName';
import alertIncompleteSection from '../../util/alertIncompleteSection';
import {getSection, handleChangeAnswer, setSectionValidity} from '../../util/section';
import Section from '../Section';
import styles from './styles';

class MemberEditor extends Component {
    static propTypes = {
        requestInterruptMember: PropTypes.func.isRequired,
        requestMember: PropTypes.func.isRequired,
        requestSaveMember: PropTypes.func.isRequired,
        onInterrupt: PropTypes.func,
        onPrevious: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        handlePreSave: PropTypes.func,
        match: matchParamsIdPropTypes.isRequired,
        chapter: chapterPropTypes.isRequired,
        member: PropTypes.instanceOf(Member).isRequired,
        interrupting: PropTypes.bool,
        saving: PropTypes.bool
    };

    static defaultProps = {
        onInterrupt: null,
        interrupting: false,
        handlePreSave: null,
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
        if (!this.props.interrupting && nextProps.interrupting) {
            this.props.onInterrupt();
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

    handleInterrupt() {
        const {id, dwellingOrder, householdOrder} = this.props.match.params;
        this.props.requestInterruptMember(id, dwellingOrder, householdOrder, this.state.member);
    }

    handleSubmit() {
        const {chapter} = this.props;
        const {id, dwellingOrder, householdOrder} = this.props.match.params;
        const {member} = this.state;
        if (this.props.handlePreSave) {
            this.props.handlePreSave(member, this.props.member);
        }
        return setSectionValidity(member, chapter)
            ? this.props.requestSaveMember(id, dwellingOrder, householdOrder, member)
            : alertIncompleteSection();
    }

    handlePrevious() {
        const {member} = this.props;
        this.props.onPrevious(member);
    }

    renderContent() {
        const {chapter, onInterrupt} = this.props;
        const {member} = this.state;
        const section = getSection(member, chapter);
        return (
            <Fragment>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>Nombre de la persona: {getMemberName(member)}</Text>
                </View>
                {isFunction(onInterrupt) &&
                <View style={styles.actionButtons}>
                    <Button
                        primary
                        title="Interrumpir encuesta"
                        onPress={() => this.handleInterrupt()}
                    />
                </View>}
                <Title>{chapter.title}</Title>
                <Section
                    section={section}
                    chapter={chapter.rows}
                    onChange={answer => this.handleChange(answer)}
                    onPrevious={() => this.handlePrevious()}
                    onSubmit={() => this.handleSubmit()}
                    entity={member}
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
        requestInterruptMember: (id, dwellingOrder, householdOrder, member) =>
            dispatch(requestInterruptMember(id, dwellingOrder, householdOrder, member)),
        requestMember: (id, dwellingOrder, householdOrder, memberOrder) =>
            dispatch(requestMember(id, dwellingOrder, householdOrder, memberOrder)),
        requestSaveMember: (id, dwellingOrder, householdOrder, member) =>
            dispatch(requestSaveMember(id, dwellingOrder, householdOrder, member))
    })
)(MemberEditor);
