import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect} from 'react-redux';
import Table, {TableIcon} from '@indec/react-native-table';
import {LoadingIndicator} from '@indec/react-native-commons';
import {filter, isEmpty} from 'lodash';

import {TabNavigator} from '../common';
import {tabs, enums} from '../../constants';
import styles from './styles';

import {requestAllDwellings, requestFetchDwelling} from '../../actions/dwellings';

class DwellingsList extends Component {
    static propTypes = {
        requestAllDwellings: PropTypes.func.isRequired,
        requestFetchDwelling: PropTypes.func.isRequired,
        dwellings: PropTypes.arrayOf(PropTypes.shape())
    };

    static defaultProps = {
        dwellings: []
    };

    constructor(props) {
        super(props);
        this.state = {
            tabSelected: enums.surveyState.OPENED
        };
    }

    componentWillMount() {
        this.props.requestAllDwellings();
    }

    componentWillReceiveProps(nextProps) {
        if (!isEmpty(nextProps.dwellings)) {
            this.filterDwellings(this.state.selected);
        }
    }

    getColumns() {
        return [{
            id: 1,
            label: 'Nombre de calle',
            field: 'addresses.street',
            style: {flex: 4}
        }, {
            id: 2,
            label: 'Altura',
            field: 'addresses.streetNumber',
            style: {flex: 1}
        }, {
            id: 3,
            label: 'Piso',
            field: 'addresses.floor',
            style: {flex: 1}
        }, {
            id: 4,
            label: 'Depto.',
            field: 'addresses.departamentName',
            style: {flex: 1}
        }, {
            id: 5,
            componentClass: TableIcon,
            icon: 'chevron-circle-right',
            color: '#fff',
            style: {flex: 1},
            onPress: id => this.props.requestFetchDwelling(id)
        }];
    }

    filterDwellings(idGroup) {
        this.setState(() => ({
            filteredDwellings: filter(this.props.dwellings, dwelling => dwelling.state === idGroup)
        }));
    }

    renderContent() {
        const {tabSelected, filteredDwellings} = this.state;
        return (
            <View style={styles.container}>
                <TabNavigator
                    tabs={tabs.surveyList}
                    selected={tabSelected}
                    onChange={idGroup => this.filterDwellings(idGroup)}
                />
                <Table
                    columns={this.getColumns()}
                    data={filteredDwellings}
                />
            </View>
        );
    }

    render() {
        return this.state.filteredDwellings ? this.renderContent() : <LoadingIndicator/>;
    }
}

export default connect(
    state => ({
        dwellings: state.dwellings.dwellings
    }),
    dispatch => ({
        requestAllDwellings: () => dispatch(requestAllDwellings()),
        requestFetchDwelling: id => dispatch(requestFetchDwelling(id))
    })
)(DwellingsList);
