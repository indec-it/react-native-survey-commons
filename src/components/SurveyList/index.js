import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect} from 'react-redux';
import Table, {TableIcon} from '@indec/react-native-table';
import {TabNavigator} from '@indec/react-native-commons';

import {surveyList, surveyState} from '../../constants';
import styles from './styles';

import {requestFilteredSurveys, requestSurvey} from '../../actions/survey';

class SurveyList extends Component {
    static propTypes = {
        requestFilteredSurveys: PropTypes.func.isRequired,
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
            label: 'Calle',
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
            onPress: id => this.props.requestSurvey(id)
        }];
        this.state = {
            surveyAddressState: surveyState.OPENED
        };
    }

    componentWillMount() {
        this.props.requestFilteredSurveys(surveyState.OPENED);
    }

    render() {
        const {surveyAddressState} = this.state;
        const {surveys} = this.props;
        return (
            <View style={styles.container}>
                <TabNavigator
                    tabs={surveyList}
                    selected={surveyAddressState}
                    onChange={filter => this.props.requestFilteredSurveys(filter)}
                />
                <Table
                    columns={this.columns}
                    data={surveys}
                />
            </View>
        );
    }
}

export default connect(
    state => ({
        surveys: state.survey.surveys
    }),
    dispatch => ({
        requestFilteredSurveys: filter => dispatch(requestFilteredSurveys(filter)),
        requestSurvey: id => dispatch(requestSurvey(id))
    })
)(SurveyList);
