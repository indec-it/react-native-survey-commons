import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect} from 'react-redux';
import Table, {TableIcon} from '@indec/react-native-table';
import {TabNavigator} from '@indec/react-native-commons';
import {columnPropType} from '@indec/react-native-table/util';

import {requestAddressesBySurveyState} from '../../actions/survey';
import {Address} from '../../model';
import {addressesListTabs, surveyAddressState as surveyAddressStateEnum} from '../../constants';
import styles from './styles';

class AddressesList extends Component {
    static propTypes = {
        requestAddressesBySurveyState: PropTypes.func.isRequired,
        onSelect: PropTypes.func,
        addresses: PropTypes.arrayOf(
            PropTypes.instanceOf(Address)
        ),
        match: PropTypes.shape({
            params: PropTypes.shape({
                area: PropTypes.string.isRequired,
                ups: PropTypes.string.isRequired
            })
        }).isRequired,
        columns: PropTypes.arrayOf(columnPropType)
    };

    static defaultProps = {
        onSelect: null,
        columns: null,
        addresses: []
    };

    constructor(props) {
        super(props);
        this.columns = [{
            id: 1,
            label: 'Manzana',
            field: 'block',
            style: styles.column
        }, {
            id: 2,
            label: 'Lado manzana',
            field: 'side',
            style: styles.column
        }, {
            id: 3,
            label: 'Nombre de calle',
            field: 'street',
            style: styles.streetColumn
        }, {
            id: 4,
            label: 'Puerta N°',
            field: 'streetNumber',
            style: styles.column
        }, {
            id: 5,
            label: 'Piso N°',
            field: 'floor',
            style: styles.column
        }, {
            id: 6,
            label: 'Depto/Pieza',
            field: 'room',
            style: styles.column
        }, {
            id: 7,
            label: 'N° viv. list.',
            field: 'listNumber',
            style: styles.column
        }, {
            id: 8,
            componentClass: TableIcon,
            icon: 'arrow-right',
            color: '#0295cf',
            style: styles.column,
            onPress: address => this.props.onSelect(address)
        }];
        this.state = {
            surveyAddressState: surveyAddressStateEnum.OPEN
        };
    }

    componentDidMount() {
        this.handleChangeSurveyAddressState(surveyAddressStateEnum.OPEN);
    }

    handleChangeSurveyAddressState(state) {
        const {area, ups} = this.props.match.params;
        this.setState(() => ({surveyAddressState: state}));
        this.props.requestAddressesBySurveyState(ups, area, state);
    }

    render() {
        const {surveyAddressState} = this.state;
        const {addresses, columns} = this.props;
        return (
            <View style={styles.container}>
                <TabNavigator
                    tabs={addressesListTabs}
                    idSelected={surveyAddressState}
                    onChange={state => this.handleChangeSurveyAddressState(state)}
                />
                <Table columns={columns || this.columns} data={addresses}/>
            </View>
        );
    }
}

export default connect(
    state => ({
        addresses: state.survey.addresses
    }),
    dispatch => ({
        requestAddressesBySurveyState: (ups, area, state) => dispatch(requestAddressesBySurveyState(ups, area, state))
    })
)(AddressesList);
