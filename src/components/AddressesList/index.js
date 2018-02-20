import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect} from 'react-redux';
import Table, {TableIcon} from '@indec/react-native-table';
import {TabNavigator} from '@indec/react-native-commons';

import {requestAddressesBySurveyState} from '../../actions/survey';
import {Address} from '../../model';
import {addressesListTabs, surveyAddressState as surveyAddressStateEnum} from '../../constants';
import styles from './styles';

class AddressesList extends Component {
    static propTypes = {
        requestAddressesBySurveyState: PropTypes.func.isRequired,
        addresses: PropTypes.arrayOf(PropTypes.instanceOf(Address)),
        match: PropTypes.shape({
            params: PropTypes.shape({
                area: PropTypes.string.isRequired,
                ups: PropTypes.string.isRequired
            })
        }).isRequired,
        onSelect: PropTypes.func.isRequired
    };

    static defaultProps = {
        addresses: []
    };

    constructor(props) {
        super(props);
        this.columns = [{
            id: 1,
            label: 'Calle',
            field: 'street',
            style: styles.streetColumn
        }, {
            id: 2,
            label: 'Altura',
            field: 'streetNumber',
            style: styles.column
        }, {
            id: 3,
            label: 'Piso',
            field: 'floor',
            style: styles.column
        }, {
            id: 4,
            label: 'Depto.',
            field: 'departamentName',
            style: styles.column
        }, {
            id: 5,
            label: 'N° list.',
            field: 'listNumber',
            style: styles.column
        }, {
            id: 6,
            componentClass: TableIcon,
            icon: 'arrow-right',
            color: '#0295cf',
            style: styles.column,
            onPress: address => this.props.onSelect(address)
        }];
        this.state = {
            surveyAddressState: surveyAddressStateEnum.OPENED
        };
    }

    componentWillMount() {
        this.handleChangeSurveyAddressState(surveyAddressStateEnum.OPENED);
    }

    handleChangeSurveyAddressState(state) {
        const {area, ups} = this.props.match.params;
        this.setState(() => ({surveyAddressState: state}));
        this.props.requestAddressesBySurveyState(ups, area, state);
    }

    render() {
        const {surveyAddressState} = this.state;
        const {addresses} = this.props;
        return (
            <View style={styles.container}>
                <TabNavigator
                    tabs={addressesListTabs}
                    idSelected={surveyAddressState}
                    onChange={state => this.handleChangeSurveyAddressState(state)}
                />
                <Table columns={this.columns} data={addresses}/>
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
