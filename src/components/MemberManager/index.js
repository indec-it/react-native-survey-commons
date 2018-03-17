import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native';
import {List} from 'react-native-elements';
import {connect} from 'react-redux';
import {Button, LoadingIndicator, Title} from '@indec/react-native-commons';
import {Alert} from '@indec/react-native-commons/util';
import {concat, every, find, forEach, isNil, max, reject} from 'lodash';

import MemberCharacteristics from '../MemberCharacteristics';
import NavigationButtons from '../NavigationButtons';
import {requestMembers, requestSaveMembers} from '../../actions/survey';
import cleanChildrenQuestions from '../../util/cleanChildrenQuestions';
import chapterPropTypes from '../../util/chapterPropTypes';
import isMemberSelected from '../../util/isMemberSelected';
import isModuleValid from '../../util/isModuleValid';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import {Member} from '../../model';

class MemberManager extends Component {
    static propTypes = {
        match: matchParamsIdPropTypes.isRequired,
        requestMembers: PropTypes.func.isRequired,
        requestSaveMembers: PropTypes.func.isRequired,
        onPrevious: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        onPreSave: PropTypes.func,
        chapter: chapterPropTypes.isRequired,
        homeBossChapter: chapterPropTypes.isRequired,
        members: PropTypes.arrayOf(PropTypes.instanceOf(Member)),
        saving: PropTypes.bool
    };

    static defaultProps = {
        members: [],
        saving: false,
        onPreSave: null
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedMember: null
        };
    }

    componentDidMount() {
        const {id, dwellingOrder, householdOrder} = this.props.match.params;
        this.props.requestMembers(id, dwellingOrder, householdOrder);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.members) {
            this.state.members = nextProps.members.map(member => new Member(member));
        }
        if (this.props.saving && !nextProps.saving) {
            this.props.onSubmit();
        }
    }

    handleChange(answer, rows) {
        this.setState(
            state => {
                const characteristics = Object.assign(state.selectedMember.characteristics, answer);
                return ({
                    selectedMember: cleanChildrenQuestions(
                        rows,
                        Object.assign(state.selectedMember, characteristics)
                    )
                });
            }
        );
    }

    selectMember(member) {
        this.setState(
            state => ({
                selectedMember: isMemberSelected(state.selectedMember, member) ? null : member
            })
        );
    }

    createMember() {
        this.setState(state => {
            const maxOrder = max(reject(state.members, member => member.disabled).map(member => member.order)) || 0;
            return ({
                members: concat(state.members, new Member({order: maxOrder + 1})),
                selectedMember: null
            });
        });
    }

    removeMember(order) {
        Alert.alert(
            'Atención',
            `¿Desea eliminar la persona N° ${order}, recuerde que esto es permanente?`,
            [{
                text: 'Cancelar'
            }, {
                text: 'Confirmar',
                onPress: () => this.setState(
                    ({members}) => {
                        const member = find(members, m => m.order === order && !m.disabled);
                        member.disabled = true;
                        forEach(
                            reject(members, m => m.disabled),
                            (m, index) => Object.assign(m, {order: index + 1})
                        );
                        return ({members});
                    }
                )
            }]
        );
    }

    handleBack() {
        this.props.onPrevious();
    }

    handleSubmit() {
        const {id, dwellingOrder, householdOrder} = this.props.match.params;
        const {members} = this.state;
        forEach(
            members,
            member => Object.assign(
                member.characteristics,
                {
                    valid: isModuleValid(
                        member.characteristics,
                        member.isHomeBoss() ? this.props.homeBossChapter.rows : this.props.chapter.rows
                    )
                }
            )
        );
        if (!isNil(this.props.onPreSave)) {
            this.props.onPreSave(members, this.props.members);
        }
        const isValid = every(reject(members, member => member.disabled), member => member.characteristics.valid);
        return isValid
            ? this.props.requestSaveMembers(id, dwellingOrder, householdOrder, members)
            : Alert.alert(
                'Atención',
                'El módulo está incompleto, verifique que haya respondido todas las preguntas.',
                [{text: 'Aceptar'}]
            );
    }

    renderContent() {
        const {members, selectedMember} = this.state;
        return (
            <Fragment>
                <Button
                    title="Agregar una persona"
                    onPress={() => this.createMember()}
                    rounded
                    primary
                />
                <Title>Listado de Personas del Hogar</Title>
                <ScrollView>
                    <List>
                        {reject(members, member => member.disabled).map(member => (
                            <MemberCharacteristics
                                key={member.order}
                                onChange={(answer, rows) => this.handleChange(answer, rows)}
                                onRemove={({order}) => this.removeMember(order)}
                                onSelect={selected => this.selectMember(selected)}
                                chapter={member.isHomeBoss() ? this.props.homeBossChapter : this.props.chapter}
                                member={member}
                                isSelected={selectedMember && selectedMember.order === member.order}
                            />
                        ))}
                    </List>
                </ScrollView>
                <NavigationButtons
                    onBack={() => this.handleBack()}
                    onSubmit={() => this.handleSubmit()}
                    submitButtonText="Guardar y salir"
                />
            </Fragment>
        );
    }

    render() {
        return this.state.members ? this.renderContent() : <LoadingIndicator/>;
    }
}

export default connect(
    state => ({
        members: state.survey.members,
        saving: state.survey.saving
    }),
    dispatch => ({
        requestMembers: (id, dwelling, household) => dispatch(requestMembers(id, dwelling, household)),
        requestSaveMembers: (id, dwelling, household, members) => dispatch(
            requestSaveMembers(id, dwelling, household, members)
        )
    })
)(MemberManager);
