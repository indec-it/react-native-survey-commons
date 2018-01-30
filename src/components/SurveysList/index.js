import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect} from 'react-redux';
import Table, {TableIcon} from '@indec/react-native-table';
import {TabNavigator} from '@indec/react-native-commons';

import {surveysListTabs, surveyAddressState as surveyAddressStateEnum} from '../../constants';
import styles from './styles';

import {requestSurveysByState, requestSurvey} from '../../actions/survey';

class SurveysList extends Component {
    static propTypes = {
        requestSurveysByState: PropTypes.func.isRequired,
        requestSurvey: PropTypes.func.isRequired,
        surveys: PropTypes.arrayOf(PropTypes.shape({}))
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
            onPress: (area, ups) => this.props.requestSurvey(area, ups)
        }];
        this.state = {
            surveyAddressState: surveyAddressStateEnum.OPENED
        };
    }

    componentWillMount() {
        this.props.requestSurveysByState(surveyAddressStateEnum.OPENED);
    }

    render() {
        const {surveyAddressState} = this.state;
        const {surveys} = this.props;
        return (
            <View style={styles.container}>
                <TabNavigator
                    tabs={surveysListTabs}
                    selected={surveyAddressState}
                    onChange={state => this.props.requestSurveysByState(state)}
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
        requestSurveysByState: state => dispatch(requestSurveysByState(state)),
        requestSurvey: (area, ups) => dispatch(requestSurvey(area, ups))
    })
)(SurveysList);
