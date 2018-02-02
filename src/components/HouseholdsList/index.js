import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-native';
import {View} from 'react-native';
import {Title} from '@indec/react-native-commons';
import Table, {TableIcon} from '@indec/react-native-table';

import NavigationButtons from '../NavigationButtons';
import {requestSurvey, requestSaveSurvey} from '../../actions/survey';
import matchPropTypes from '../../util/matchPropTypes';
import historyPropTypes from '../../util/historyPropTypes';
import {surveyAddressState} from '../../constants';
import styles from '../AreasList/styles';

class HouseholdsList extends Component {
    static propTypes = {
        requestSaveSurvey: PropTypes.func.isRequired,
        requestSurvey: PropTypes.func.isRequired,
        match: matchPropTypes.isRequired,
        survey: PropTypes.shape({}),
        history: historyPropTypes.isRequired
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
            onPress: () => this.props.history.push('/areas')
        }];
        this.state = {};
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.requestSurvey(id);
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
        this.props.history.push('/area');
    }

    back() {
        const {survey} = this.state;
        this.props.history.push(`/form/${survey._id}/dwelling`);
    }

    render() {
        const {survey} = this.state;
        if (!survey) {
            return null;
        }
        return (
            <Fragment>
                <Title>Listado de hogares</Title>
                <View style={styles.tableContainer}>
                    <Table columns={this.columns} data={survey.dwellings[0].households}/>
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

export default withRouter(connect(
    state => ({survey: state.survey.survey}),
    dispatch => ({
        requestSurvey: id => dispatch(requestSurvey(id)),
        requestSaveSurvey: survey => dispatch(requestSaveSurvey(survey))
    })
)(HouseholdsList));
