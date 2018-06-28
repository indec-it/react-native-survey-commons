import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import Table, {TableIcon} from '@indec/react-native-table';
import {Button, LoadingIndicator, Title} from '@indec/react-native-commons';
import {Alert} from '@indec/react-native-commons/util';
import {columnPropType} from '@indec/react-native-table/util';
import {
    isEmpty, map, noop, reject
} from 'lodash';

import NavigationButtons from '../NavigationButtons';
import ValidationsList from '../ValidationsList';
import {requestMembers, requestRemoveMember} from '../../actions/survey';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import {Member} from '../../model';
import styles from './styles';

const getMembersCharacteristics = (members, getRelationLabel) => map(
    reject(members, member => member.disabled),
    member => ({
        ...member,
        name: member.characteristics.name,
        relationship: getRelationLabel(member),
        isHomeBoss: member.isHomeBoss()
    })
);

class MembersList extends Component {
    static propTypes = {
        requestMembers: PropTypes.func.isRequired,
        requestRemoveMember: PropTypes.func.isRequired,
        onSelect: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        onViewDetection: PropTypes.func.isRequired,
        onViewDetails: PropTypes.func.isRequired,
        onAddMember: PropTypes.func.isRequired,
        showCharacteristicsButton: PropTypes.func,
        validationState: PropTypes.func.isRequired,
        validate: PropTypes.func,
        getRelationLabel: PropTypes.func.isRequired,
        match: matchParamsIdPropTypes.isRequired,
        members: PropTypes.arrayOf(PropTypes.instanceOf(Member)),
        columns: columnPropType,
        detectionButtonLabel: PropTypes.string,
        householdCharacteristicsLabel: PropTypes.string,
        membersManagerLabel: PropTypes.string
    };

    static defaultProps = {
        members: null,
        showCharacteristicsButton: true,
        detectionButtonLabel: 'Detección de viviendas y hogares',
        householdCharacteristicsLabel: 'Características del hogar',
        membersManagerLabel: 'Componentes del hogar',
        columns: null,
        validate: noop
    };

    constructor(props) {
        super(props);
        this.columns = [{
            id: 2,
            label: 'Número',
            field: 'order'
        }, {
            id: 3,
            label: 'Nombre',
            field: 'name'
        }, {
            id: 4,
            label: 'Relación con el jefe del hogar',
            field: 'relationship'
        }, {
            id: 1,
            label: 'Estado',
            componentClass: TableIcon,
            icon: member => (
                this.props.validationState(member) ? 'check' : 'times'
            ),
            color: member => (
                this.props.validationState(member) ? 'green' : 'red'
            )
        }, {
            id: 5,
            componentClass: TableIcon,
            icon: 'arrow-right',
            color: '#0295cf',
            onPress: member => this.props.onSelect(member)
        }, {
            id: 6,
            componentClass: TableIcon,
            icon: 'trash',
            color: 'red',
            hideValue: member => member.isHomeBoss,
            onPress: member => Alert.alert(
                'Atención',
                `¿Desea eliminar la persona N° ${member.order}, recuerde que esto es permanente?`,
                [{
                    text: 'Cancelar'
                }, {
                    text: 'Confirmar',
                    onPress: () => this.props.requestRemoveMember(
                        this.props.match.params.id,
                        this.props.match.params.dwellingOrder,
                        this.props.match.params.householdOrder,
                        member.order
                    )
                }]
            )
        }];
    }

    componentDidMount() {
        const {id, dwellingOrder, householdOrder} = this.props.match.params;
        this.props.requestMembers(id, dwellingOrder, householdOrder);
    }

    renderButtons() {
        const {dwellingOrder, householdOrder} = this.props.match.params;
        const {
            showCharacteristicsButton,
            members,
            detectionButtonLabel,
            householdCharacteristicsLabel,
            membersManagerLabel
        } = this.props;
        return (
            <View style={styles.actionButtons}>
                <Button
                    buttonStyle={styles.marginTopButton}
                    onPress={
                        () => this.props.onViewDetection(dwellingOrder, householdOrder)
                    }
                    primary
                    title={detectionButtonLabel}
                />
                <Button
                    onPress={() => this.props.onAddMember()}
                    primary
                    title={membersManagerLabel}
                />
                {showCharacteristicsButton(members) && (
                    <Button
                        onPress={
                            () => this.props.onViewDetails(dwellingOrder, householdOrder)
                        }
                        primary
                        title={householdCharacteristicsLabel}
                    />
                )}
            </View>
        );
    }

    renderContent() {
        const {
            columns, getRelationLabel, members, validate
        } = this.props;
        return (
            <Fragment>
                {this.renderButtons()}
                <Title>
                    Listado de Personas del Hogar
                </Title>
                {isEmpty(members) && (
                    <Text style={styles.informationText}>
                        &nbsp; El hogar no posee personas
                    </Text>
                )}
                {!isEmpty(members) && (
                    <Table
                        columns={columns || this.columns}
                        data={getMembersCharacteristics(members, getRelationLabel)}
                    />
                )}
                {validate && <ValidationsList validationResults={validate(members)}/>}
                <NavigationButtons
                    onSubmit={() => this.props.onSubmit()}
                    submitButtonText="Cerrar visita"
                    iconRight={{name: 'lock', color: 'red'}}
                    styleRightButton={{
                        primary: false,
                        danger: true,
                        rounded: true
                    }}
                />
            </Fragment>
        );
    }

    render() {
        return this.props.members ? this.renderContent() : <LoadingIndicator/>;
    }
}

export default connect(
    state => ({
        members: state.survey.members,
        saving: state.survey.saving
    }),
    dispatch => ({
        requestMembers: (id, dwellingOrder, householdOrder) => (
            dispatch(requestMembers(id, dwellingOrder, householdOrder))
        ),
        requestRemoveMember: (id, dwellingOrder, householdOrder, memberOrder) => dispatch(
            requestRemoveMember(id, dwellingOrder, householdOrder, memberOrder)
        )
    })
)(MembersList);
