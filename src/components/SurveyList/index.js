import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect} from 'react-redux';
import Table, {TableIcon} from '@indec/react-native-table';
import {LoadingIndicator} from '@indec/react-native-commons';
import {filter, isEmpty} from 'lodash';

import {TabNavigator} from '../common';
import {surveyList, surveyState} from '../../constants';
import styles from './styles';

import {requestSurveys, requestSurvey} from '../../actions/survey';

class SurveyList extends Component {
    static propTypes = {
        requestSurveys: PropTypes.func.isRequired,
        requestSurvey: PropTypes.func.isRequired,
        surveys: PropTypes.arrayOf(PropTypes.shape())
    };

    static defaultProps = {
        surveys: []
    };

    constructor(props) {
        super(props);
        this.columns = [{
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
            onPress: id => props.requestSurvey(id)
        }];
        this.state = {
            stateSelected: surveyState.OPENED
        };
    }

    componentWillMount() {
        this.props.requestSurveys();
    }

    componentWillReceiveProps(nextProps) {
        if (!isEmpty(nextProps.surveys)) {
            this.filterSurveys(this.state.stateSelected);
        }
    }

    filterSurveys(state) {
        this.setState(() => ({
            filteredSurveys: filter(this.props.surveys, survey => survey.state === state)
        }));
    }

    renderContent() {
        const {stateSelected, filteredSurveys} = this.state;
        return (
            <View style={styles.container}>
                <TabNavigator
                    tabs={surveyList}
                    selected={stateSelected}
                    onChange={state => this.filterSurveys(state)}
                />
                <Table
                    columns={this.columns}
                    data={filteredSurveys}
                />
            </View>
        );
    }

    render() {
        return this.state.filteredSurveys ? this.renderContent() : <LoadingIndicator/>;
    }
}

export default connect(
    state => ({
        surveys: state.survey.surveys
    }),
    dispatch => ({
        requestSurveys: () => dispatch(requestSurveys()),
        requestSurvey: id => dispatch(requestSurvey(id))
    })
)(SurveyList);
