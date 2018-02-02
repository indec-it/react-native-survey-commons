import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {Title} from '@indec/react-native-commons';
import Table, {TableIcon} from '@indec/react-native-table';

import {requestSurvey, requestSaveSurvey} from '../../actions/survey';
import NavigatorButtons from '../NavigationButtons';
import {surveyAddressState} from '../../constants';
import AddressCard from '../AddressCard';
import styles from '../AreasList/styles';

class Households extends Component {
    static propTypes = {
        requestSaveSurvey: PropTypes.func.isRequired,
        requestSurvey: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
        survey: PropTypes.shape({}),
        onSelect: PropTypes.func.isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired
    };

    static defaultProps = {
        survey: {}
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
            onPress: household => this.props.onSelect(household.order)
        }];
    }

    componentDidMount() {
        this.props.requestSurvey(this.props.id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.survey) {
            this.state.survey = nextProps.survey;
        }
    }

    closeDwelling() {
        const {survey} = this.state;
        survey.surveyAddressState = surveyAddressState.CLOSED;
        this.props.requestSaveSurvey(survey);
        this.props.history.push(`/addressesList/${survey.address.area}/${survey.address.ups}`);
    }

    goToAreas() {
        this.props.history.push('/areas');
    }

    render() {
        const {survey} = this.state;
        if (!survey) {
            return null;
        }
        return (
            <Fragment>
                <AddressCard address={survey.address}/>
                <Title>Listado de hogares</Title>
                <View style={styles.tableContainer}>
                    <Table columns={this.columns} data={survey.dwellings[0].households}/>
                </View>
                <NavigatorButtons
                    onBack={() => this.goToAreas}
                    onSubmit={() => this.closeDwelling()}
                    submitButtonText="Cerrar vivienda"
                />
            </Fragment>
        );
    }
}

export default connect(
    state => ({survey: state.survey.survey}),
    dispatch => ({
        requestSurvey: () => dispatch(requestSurvey()),
        requestSaveSurvey: survey => dispatch(requestSaveSurvey(survey))
    })
)(Households);
