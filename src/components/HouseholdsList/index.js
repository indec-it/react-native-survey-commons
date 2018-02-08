import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {Title} from '@indec/react-native-commons';
import Table, {TableIcon} from '@indec/react-native-table';

import NavigationButtons from '../NavigationButtons';
import {requestHouseholds, requestCloseSurvey} from '../../actions/survey';
import {Address} from '../../model';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import styles from '../AreasList/styles';
import AddressCard from '../AddressCard';

class HouseholdsList extends Component {
    static propTypes = {
        requestCloseSurvey: PropTypes.func.isRequired,
        requestHouseholds: PropTypes.func.isRequired,
        match: matchParamsIdPropTypes.isRequired,
        households: PropTypes.arrayOf(PropTypes.shape({})),
        survey: PropTypes.shape({
            address: PropTypes.instanceOf(Address).isRequired
        }).isRequired,
        onPrevious: PropTypes.func.isRequired,
        onSelect: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    static defaultProps = {
        households: null
    };

    constructor(props) {
        super(props);
        this.columns = [{
            id: 1,
            label: 'Nombre',
            field: 'name'
        }, {
            id: 2,
            label: 'Número',
            field: 'order'
        }, {
            id: 3,
            label: 'Jefa/e',
            field: 'householdHead'
        }, {
            id: 4,
            componentClass: TableIcon,
            icon: 'arrow-right',
            color: '#0295cf',
            onPress: household => this.props.onSelect(this.props.match.params.id, household.order)
        }];
    }

    componentDidMount() {
        const {id, dwelling} = this.props.match.params;
        this.props.requestHouseholds(id, dwelling);
    }

    back() {
        const {id} = this.props.match.params;
        this.props.onPrevious(id);
    }

    closeDwelling() {
        const {id} = this.props.match.params;
        this.props.requestCloseSurvey(id);
        this.props.onSubmit();
    }

    render() {
        const {survey, households} = this.props;
        if (!households || !survey) {
            return null;
        }
        return (
            <Fragment>
                <AddressCard address={survey.address}/>
                <Title>Listado de hogares</Title>
                <View style={styles.tableContainer}>
                    <Table columns={this.columns} data={households}/>
                </View>
                <NavigationButtons
                    onBack={() => this.back()}
                    onSubmit={() => this.closeDwelling()}
                    submitButtonText="Cerrar vivienda"
                />
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        survey: state.survey.survey,
        households: state.survey.households
    }),
    dispatch => ({
        requestHouseholds: (id, dwelling) => dispatch(requestHouseholds(id, dwelling)),
        requestCloseSurvey: id => dispatch(requestCloseSurvey(id))
    })
)(HouseholdsList);
