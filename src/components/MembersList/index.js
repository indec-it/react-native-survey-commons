import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Text, Switch, View} from 'react-native';
import Table, {TableIcon} from '@indec/react-native-table';
import {Col, Button, LoadingIndicator, Row, Title} from '@indec/react-native-commons';
import {Alert} from '@indec/react-native-commons/util';
import {isEmpty, map, reject} from 'lodash';

import NavigationButtons from '../NavigationButtons';
import {requestHousehold, requestRemoveMember, requestUpdateHousehold} from '../../actions/survey';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import {Member} from '../../model';
import styles from './styles';

const getMembersCharacteristics = members => map(
    reject(members, member => member.disabled),
    member => ({
        ...member,
        name: member.characteristics.name,
        relationship: member.characteristics.relationship,
        isHomeBoss: member.isHomeBoss()
    })
);

class MembersList extends Component {
    static propTypes = {
        requestHousehold: PropTypes.func.isRequired,
        requestUpdateHousehold: PropTypes.func.isRequired,
        requestRemoveMember: PropTypes.func.isRequired,
        onSelect: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        onViewDetection: PropTypes.func.isRequired,
        onViewDetails: PropTypes.func.isRequired,
        onAddMember: PropTypes.func.isRequired,
        showCharacteristicsButton: PropTypes.func,
        validationState: PropTypes.func.isRequired,
        match: matchParamsIdPropTypes.isRequired,
        household: PropTypes.shape({
            isPaperSurvey: PropTypes.bool.isRequired,
            members: PropTypes.arrayOf(PropTypes.instanceOf(Member))
        })
    };

    static defaultProps = {
        household: null,
        showCharacteristicsButton: true
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
            label: 'Relación',
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

    componentWillMount() {
        const {id, dwellingOrder, householdOrder} = this.props.match.params;
        this.props.requestHousehold(id, dwellingOrder, householdOrder);
    }

    renderButtons() {
        const {id, dwellingOrder, householdOrder} = this.props.match.params;
        const {showCharacteristicsButton, household} = this.props;
        return (
            <Col>
                <Row>
                    <Text style={styles.switchText}>Tablet o papel</Text>
                    <Switch
                        onValueChange={value => this.props.requestUpdateHousehold(
                            id,
                            dwellingOrder,
                            Object.assign(household, {isPaperSurvey: value})
                        )}
                        value={this.props.household.isPaperSurvey}
                    />
                </Row>
                <View style={styles.actionButtons}>
                    {showCharacteristicsButton(household.members) && <Button
                        onPress={
                            () => this.props.onViewDetails(dwellingOrder, householdOrder)
                        }
                        primary
                        title="Características habitacionales del hogar"
                    />}
                    <Button
                        onPress={() => this.props.onAddMember()}
                        primary
                        title="Gestión de personas"
                    />
                    <Button
                        buttonStyle={styles.marginTopButton}
                        onPress={
                            () => this.props.onViewDetection(dwellingOrder, householdOrder)
                        }
                        primary
                        title="Situación de la vivienda"
                    />
                </View>
            </Col>
        );
    }

    renderContent() {
        const {members} = this.props.household;
        return (
            <Fragment>
                {this.renderButtons()}
                <Title>Listado de Personas del Hogar</Title>
                {isEmpty(members) && <Text style={styles.informationText}>&nbsp; El hogar no posee personas</Text>}
                {!isEmpty(members) && <Table columns={this.columns} data={getMembersCharacteristics(members)}/>}
                <NavigationButtons
                    onSubmit={() => this.props.onSubmit()}
                    iconRight={{
                        name: 'lock',
                        color: '#333'
                    }}
                    submitButtonText="Cerrar visita"
                />
            </Fragment>
        );
    }

    render() {
        return this.props.household ? this.renderContent() : <LoadingIndicator/>;
    }
}

export default connect(
    state => ({
        household: state.survey.household,
        saving: state.survey.saving
    }),
    dispatch => ({
        requestHousehold: (id, dwellingOrder, householdOrder) => (
            dispatch(requestHousehold(id, dwellingOrder, householdOrder))
        ),
        requestUpdateHousehold: (id, dwellingOrder, household) => (
            dispatch(requestUpdateHousehold(id, dwellingOrder, household))
        ),
        requestRemoveMember: (id, dwellingOrder, householdOrder, memberOrder) => dispatch(
            requestRemoveMember(id, dwellingOrder, householdOrder, memberOrder)
        )
    })
)(MembersList);
