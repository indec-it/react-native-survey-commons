import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {Button, LoadingIndicator, TabNavigator} from '@indec/react-native-commons';
import {columnPropType} from '@indec/react-native-table/util';
import {Alert} from '@indec/react-native-commons/util';

import AddressCard from '../AddressCard';
import NavigationButtons from '../NavigationButtons';
import DwellingVisits from '../DwellingVisits';
import HouseholdsList from '../HouseholdsList';
import {requestAddress, requestCloseSurvey} from '../../actions/survey';
import {Address, Dwelling} from '../../model';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import styles from './styles';
import {surveyDetailsListTabs, surveyDetailsTabs} from '../../constants';

class SurveyDetails extends Component {
    static propTypes = {
        requestAddress: PropTypes.func.isRequired,
        requestCloseSurvey: PropTypes.func.isRequired,
        onViewDwelling: PropTypes.func.isRequired,
        onPrevious: PropTypes.func.isRequired,
        dwellingValidationState: PropTypes.func.isRequired,
        householdValidationState: PropTypes.func.isRequired,
        showAddHousehold: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        validate: PropTypes.func,
        onSelect: PropTypes.func,
        address: PropTypes.instanceOf(Address).isRequired,
        dwelling: PropTypes.instanceOf(Dwelling).isRequired,
        match: matchParamsIdPropTypes.isRequired,
        backButtonText: PropTypes.string,
        householdsListColumns: columnPropType,
        saving: PropTypes.bool
    };

    static defaultProps = {
        validate: null,
        onSelect: null,
        householdsListColumns: null,
        backButtonText: 'Anterior',
        saving: false
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: surveyDetailsTabs.DWELLING_VISITS
        };
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.requestAddress(id);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.saving && !nextProps.saving) {
            this.props.onSubmit();
        }
    }

    closeDwelling() {
        const {id} = this.props.match.params;
        return this.props.dwellingValidationState(this.props.dwelling)
            ? Alert.alert(
                'Atención',
                'Usted está por cerrar la vivienda, ¿Desea continuar?. Recuerde que esta operación es irreversible.',
                [{
                    text: 'Cancelar'
                }, {
                    text: 'Confirmar',
                    onPress: () => this.props.requestCloseSurvey(id)
                }]
            )
            : Alert.alert(
                'Atención',
                'La vivienda no se puede cerrar porque no es válida.',
                [{text: 'Aceptar'}]
            );
    }

    handleChangeTab(selectedTab) {
        this.setState(() => ({selectedTab}));
    }

    renderTabContent() {
        const {selectedTab} = this.state;
        const {
            match, validate, onSelect, householdValidationState, householdsListColumns, showAddHousehold
        } = this.props;
        switch (selectedTab) {
            case surveyDetailsTabs.DWELLING_VISITS:
                return <DwellingVisits match={match}/>;
            case surveyDetailsTabs.HOUSEHOLDS_LIST:
                return (
                    <HouseholdsList
                        match={match}
                        showAddHousehold={showAddHousehold}
                        householdValidationState={householdValidationState}
                        validate={validate}
                        columns={householdsListColumns}
                        onSelect={onSelect}
                    />
                );
            default:
                return null;
        }
    }

    renderContent() {
        const {
            address,
            backButtonText,
            dwelling,
            onViewDwelling,
            onPrevious
        } = this.props;
        const {selectedTab} = this.state;
        const {dwellingOrder} = this.props.match.params;
        return (
            <Fragment>
                <AddressCard address={address}/>
                <View style={styles.actionButtons}>
                    <Button
                        primary
                        title="Indicar respuesta de vivienda"
                        onPress={() => onViewDwelling(dwellingOrder)}
                    />
                </View>
                <TabNavigator
                    tabs={surveyDetailsListTabs}
                    idSelected={selectedTab}
                    onChange={state => this.handleChangeTab(state)}
                />
                {this.renderTabContent()}
                <NavigationButtons
                    onBack={() => onPrevious(dwelling)}
                    backButtonText={backButtonText}
                    onSubmit={() => this.closeDwelling()}
                    submitButtonText="Cerrar vivienda"
                    iconRight={{
                        name: 'lock',
                        color: 'red'
                    }}
                    styleRightButton={{
                        primary: false,
                        danger: true,
                        rounded: true
                    }}
                />
            </Fragment>
        );
    }

    render() {
        return this.props.address ? this.renderContent() : <LoadingIndicator/>;
    }
}

export default connect(
    state => ({
        address: state.survey.address,
        saving: state.survey.saving,
        dwelling: state.survey.dwelling
    }), dispatch => ({
        requestAddress: surveyId => dispatch(requestAddress(surveyId)),
        requestCloseSurvey: surveyId => dispatch(requestCloseSurvey(surveyId))
    })
)(SurveyDetails);
