import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import {Button, LoadingIndicator, Title} from '@indec/react-native-commons';
import Table, {TableIcon} from '@indec/react-native-table';
import {isEmpty} from 'lodash';

import NavigationButtons from '../NavigationButtons';
import {requestMembers, requestCloseHouseholdVisit, requestRemoveMember} from '../../actions/survey';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import styles from './styles';

class MembersList extends Component {
    static propTypes = {
        requestCloseHouseholdVisit: PropTypes.func.isRequired,
        requestMembers: PropTypes.func.isRequired,
        requestRemoveMember: PropTypes.func.isRequired,
        match: matchParamsIdPropTypes.isRequired,
        members: PropTypes.arrayOf(PropTypes.shape({})),
        onPrevious: PropTypes.func.isRequired,
        onSelect: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        onViewDetection: PropTypes.func.isRequired,
        onViewDetails: PropTypes.func.isRequired,
        onAddMember: PropTypes.func.isRequired,
        saving: PropTypes.bool
    };

    static defaultProps = {
        members: null,
        saving: false
    };

    constructor(props) {
        super(props);
        this.columns = [{
            id: 1,
            label: 'Número',
            field: 'order'
        }, {
            id: 2,
            label: 'Nombre',
            field: 'name'
        }, {
            id: 3,
            label: 'Relación',
            field: 'relation'
        }, {
            id: 4,
            componentClass: TableIcon,
            icon: 'arrow-right',
            color: '#0295cf',
            onPress: member => this.props.onSelect(member.order)
        }, {
            id: 5,
            componentClass: TableIcon,
            icon: 'trash',
            color: 'red',
            hideValue: member => member.isHomeBoss(),
            onPress: member => this.props.requestRemoveMember(
                this.props.match.params.id,
                this.props.match.params.dwellingOrder,
                this.props.match.params.householdOrder,
                member.order
            )
        }];
    }

    componentWillMount() {
        const {id, dwellingOrder, householdOrder} = this.props.match.params;
        this.props.requestMembers(id, dwellingOrder, householdOrder);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.saving && !nextProps.saving) {
            this.props.onSubmit();
        }
    }

    goBack() {
        const {id} = this.props.match.params;
        this.props.onPrevious(id);
    }

    closeHouseholdVisit() {
        const {id, dwellingOrder, householdOrder} = this.props.match.params;
        this.props.requestCloseHouseholdVisit(id, dwellingOrder, householdOrder);
    }

    renderContent() {
        const {members} = this.props;
        const {dwellingOrder, householdOrder} = this.props.match.params;
        return (
            <Fragment>
                <View style={styles.actionButtons}>
                    <Button
                        onPress={
                            () => this.props.onViewDetails(dwellingOrder, householdOrder)
                        }
                        primary
                        title="Caracteristicas"
                    />
                    <Button
                        onPress={() => this.props.onAddMember()}
                        primary
                        title="Gestión de miembros"
                    />
                    <Button
                        buttonStyle={styles.marginTopButton}
                        onPress={
                            () => this.props.onViewDetection(dwellingOrder, householdOrder)
                        }
                        primary
                        title="Detección de viviendas y hogares"
                    />
                </View>
                <View style={styles.tableContainer}>
                    <Title>Listado de Miembros</Title>
                    {isEmpty(members) && <Text style={styles.informationText}>(No posee miembros)</Text>}
                    {!isEmpty(members) &&
                    <View style={styles.tableContainer}>
                        <Table columns={this.columns} data={members}/>
                    </View>}
                </View>
                <NavigationButtons
                    onBack={() => this.goBack()}
                    onSubmit={() => this.closeHouseholdVisit()}
                    submitButtonText="Cerrar visita"
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
        requestCloseHouseholdVisit: (id, dwellingOrder, householdOrder) => dispatch(
            requestCloseHouseholdVisit(id, dwellingOrder, householdOrder)
        ),
        requestRemoveMember: (id, dwellingOrder, householdOrder, memberOrder) => dispatch(
            requestRemoveMember(id, dwellingOrder, householdOrder, memberOrder)
        )
    })
)(MembersList);
