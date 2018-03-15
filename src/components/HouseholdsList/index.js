import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View} from 'react-native';
import Table, {TableIcon} from '@indec/react-native-table';
import {Button, LoadingIndicator, Title} from '@indec/react-native-commons';
import {Alert} from '@indec/react-native-commons/util';

import NavigationButtons from '../NavigationButtons';
import {
    requestDwelling,
    requestCloseSurvey,
    requestCreateHousehold,
    requestAddress,
    requestRemoveHousehold
} from '../../actions/survey';
import {Address, Dwelling} from '../../model';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import styles from './styles';
import AddressCard from '../AddressCard';

class HouseholdsList extends Component {
    static propTypes = {
        requestAddress: PropTypes.func.isRequired,
        requestCloseSurvey: PropTypes.func.isRequired,
        requestCreateHousehold: PropTypes.func.isRequired,
        requestRemoveHousehold: PropTypes.func.isRequired,
        requestDwelling: PropTypes.func.isRequired,
        onViewDwelling: PropTypes.func.isRequired,
        match: matchParamsIdPropTypes.isRequired,
        dwelling: PropTypes.arrayOf(PropTypes.instanceOf(Dwelling)),
        address: PropTypes.arrayOf(PropTypes.instanceOf(Address)),
        onPrevious: PropTypes.func.isRequired,
        onSelect: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        dwellingValidationState: PropTypes.func.isRequired,
        householdValidationState: PropTypes.func.isRequired,
        saving: PropTypes.bool
    };

    static defaultProps = {
        dwelling: null,
        address: null,
        saving: false
    };

    constructor(props) {
        super(props);
        this.state = {};
        this.columns = [{
            id: 1,
            label: 'Número',
            field: 'order'
        }, {
            id: 2,
            label: 'Jefa/e',
            field: 'householdHead'
        }, {
            id: 1,
            label: 'Estado',
            componentClass: TableIcon,
            icon: household => (
                this.props.householdValidationState(household) ? 'check' : 'times'
            ),
            color: household => (
                this.props.householdValidationState(household) ? 'green' : 'red'
            )
        }, {
            id: 3,
            componentClass: TableIcon,
            icon: 'arrow-right',
            color: '#0295cf',
            onPress: household => this.props.onSelect(this.props.match.params.id, household)
        }, {
            id: 4,
            componentClass: TableIcon,
            icon: 'trash',
            color: 'red',
            showValue: household => household.order !== 1,
            onPress: household => Alert.alert(
                'Atención',
                `¿Desea eliminar el hogar N° ${household.order}, recuerde que esto es permanente?`,
                [{
                    text: 'Cancelar'
                }, {
                    text: 'Confirmar',
                    onPress: () => this.props.requestRemoveHousehold(
                        this.props.match.params.id,
                        this.props.match.params.dwellingOrder,
                        household.order
                    )
                }]
            )
        }];
    }

    componentWillMount() {
        const {id, dwellingOrder} = this.props.match.params;
        this.props.requestDwelling(id, dwellingOrder);
        this.props.requestAddress(id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dwelling) {
            this.state.dwelling = new Dwelling(nextProps.dwelling);
        }
        if (this.props.saving && !nextProps.saving) {
            this.props.onSubmit();
        }
    }

    closeDwelling() {
        const {id} = this.props.match.params;
        return this.props.dwellingValidationState(this.state.dwelling)
            ? Alert.alert(
                'Atención',
                'Usted está por cerrar la vivienda, ¿Desea continuar?. Recuerde que esta operación es irreversible.',
                [{
                    text: 'Cancelar'
                }, {
                    text: 'Confirmar',
                    onPress: () => this.props.requestCloseSurvey(id)
                }]
            )
            : Alert.alert(
                'Atención',
                'La vivienda no se puede cerrar porque no es válida.',
                [{text: 'Aceptar'}]
            );
    }

    renderContent() {
        const {address} = this.props;
        const {dwelling} = this.state;
        const {id, dwellingOrder} = this.props.match.params;
        return (
            <Fragment>
                <AddressCard address={address}/>
                <View style={styles.actionButtons}>
                    <Button
                        primary
                        title="Modificar respuestas de vivienda"
                        onPress={() => this.props.onViewDwelling(dwellingOrder)}
                    />
                    <Button
                        buttonStyle={styles.createButton}
                        primary
                        title="Agregar Hogar"
                        onPress={() => this.props.requestCreateHousehold(id, dwellingOrder)}
                    />
                </View>
                <Title>Listado de hogares</Title>
                <View style={styles.tableContainer}>
                    <Table columns={this.columns} data={dwelling.getHouseholds()}/>
                </View>
                <NavigationButtons
                    onBack={() => this.props.onPrevious(dwelling)}
                    onSubmit={() => this.closeDwelling()}
                    submitButtonText="Cerrar vivienda"
                />
            </Fragment>
        );
    }

    render() {
        return this.state.dwelling && this.props.address ? this.renderContent() : <LoadingIndicator/>;
    }
}

export default connect(
    state => ({
        dwelling: state.survey.dwelling,
        address: state.survey.address,
        saving: state.survey.saving
    }),
    dispatch => ({
        requestDwelling: (id, dwellingOrder) => dispatch(requestDwelling(id, dwellingOrder)),
        requestCloseSurvey: id => dispatch(requestCloseSurvey(id)),
        requestCreateHousehold: (id, dwellingOrder) => dispatch(requestCreateHousehold(id, dwellingOrder)),
        requestAddress: id => dispatch(requestAddress(id)),
        requestRemoveHousehold: (id, dwellingOrder, householdOrder) => (
            dispatch(requestRemoveHousehold(id, dwellingOrder, householdOrder))
        )
    })
)(HouseholdsList);
