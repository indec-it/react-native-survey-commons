import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View} from 'react-native';
import Table, {TableIcon} from '@indec/react-native-table';
import {Button, LoadingIndicator} from '@indec/react-native-commons';
import {Alert} from '@indec/react-native-commons/util';
import {columnPropType} from '@indec/react-native-table/util';
import {noop} from 'lodash';

import {
    requestDwelling,
    requestCreateHousehold,
    requestRemoveHousehold
} from '../../actions/survey';
import {Dwelling} from '../../model';
import getHouseholdHeadName from '../../util/getHouseholdHeadName';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import ValidationsList from '../ValidationsList';
import styles from './styles';

class HouseholdsList extends Component {
    static propTypes = {
        requestCreateHousehold: PropTypes.func.isRequired,
        requestRemoveHousehold: PropTypes.func.isRequired,
        requestDwelling: PropTypes.func.isRequired,
        onSelect: PropTypes.func.isRequired,
        showAddHousehold: PropTypes.func.isRequired,
        householdValidationState: PropTypes.func.isRequired,
        validate: PropTypes.func,
        match: matchParamsIdPropTypes.isRequired,
        // eslint-disable-next-line react/no-unused-prop-types
        dwelling: PropTypes.arrayOf(PropTypes.instanceOf(Dwelling)),
        columns: PropTypes.arrayOf(columnPropType)
    };

    static defaultProps = {
        dwelling: null,
        columns: null,
        validate: noop
    };

    constructor(props) {
        super(props);
        this.columns = [{
            id: 1,
            label: 'Número',
            field: 'order'
        }, {
            id: 2,
            label: 'Jefa/e',
            field: household => getHouseholdHeadName(household) || '[Sin nombre]'
        }, {
            id: 3,
            label: 'Estado',
            componentClass: TableIcon,
            icon: household => (
                this.props.householdValidationState(household) ? 'check' : 'times'
            ),
            color: household => (
                this.props.householdValidationState(household) ? 'green' : 'red'
            )
        }, {
            id: 4,
            componentClass: TableIcon,
            icon: 'arrow-right',
            color: '#0295cf',
            onPress: household => this.props.onSelect(this.props.match.params.id, household)
        }, {
            id: 5,
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
        this.state = {};
    }

    componentDidMount() {
        const {id, dwellingOrder} = this.props.match.params;
        this.props.requestDwelling(id, dwellingOrder);
    }

    static getDerivedStateFromProps(props) {
        if (props.dwelling) {
            return {dwelling: props.dwelling};
        }
        return null;
    }

    renderContent() {
        const {columns, validate, showAddHousehold} = this.props;
        const {dwelling} = this.state;
        const {id, dwellingOrder} = this.props.match.params;
        return (
            <Fragment>
                {showAddHousehold(dwelling) && (
                    <View style={styles.buttonContainer}>
                        <Button
                            primary
                            title="Agregar Hogar"
                            onPress={() => this.props.requestCreateHousehold(id, dwellingOrder)}
                        />
                    </View>
                )}
                <Table columns={columns || this.columns} data={dwelling.getHouseholds()}/>
                {validate && <ValidationsList validationResults={validate(dwelling)}/>}
            </Fragment>
        );
    }

    render() {
        return this.state.dwelling ? this.renderContent() : <LoadingIndicator/>;
    }
}

export default connect(
    state => ({
        dwelling: state.survey.dwelling
    }),
    dispatch => ({
        requestDwelling: (id, dwellingOrder) => dispatch(requestDwelling(id, dwellingOrder)),
        requestCreateHousehold: (id, dwellingOrder) => dispatch(requestCreateHousehold(id, dwellingOrder)),
        requestRemoveHousehold: (id, dwellingOrder, householdOrder) => (
            dispatch(requestRemoveHousehold(id, dwellingOrder, householdOrder))
        )
    })
)(HouseholdsList);
