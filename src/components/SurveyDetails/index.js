import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, LoadingIndicator, Title, Row, Col} from '@indec/react-native-commons';
import {Alert} from '@indec/react-native-commons/util';

import AddressCard from '../AddressCard';
import {Survey} from '../../model';
import {requestSurvey, requestCloseSurvey} from '../../actions/survey';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';

class SurveyDetails extends Component {
    static propTypes = {
        requestSurvey: PropTypes.func.isRequired,
        onPrevious: PropTypes.func.isRequired,
        closeSurvey: PropTypes.func.isRequired,
        showCloseSurveyButton: PropTypes.func,
        survey: PropTypes.instanceOf(Survey).isRequired,
        match: matchParamsIdPropTypes.isRequired,
        closeSurveyButtonText: PropTypes.string,
        backButtonLabel: PropTypes.string
    };

    static defaultProps = {
        showCloseSurveyButton: null,
        closeSurveyButtonText: 'Cerrar encuesta',
        backButtonLabel: 'Volver'
    };

    componentDidMount() {
        this.props.requestSurvey(this.props.match.params.id);
    }

    handleCloseSurvey() {
        Alert.alert(
            'Atención',
            '¿Desea realizar un cierre forzoso a esta dirección?',
            [{
                text: 'Cancelar'
            }, {
                text: 'Confirmar',
                onPress: () => this.props.closeSurvey(this.props.match.params.id)
            }]
        );
    }

    renderContent() {
        const {
            survey, backButtonLabel, onPrevious, showCloseSurveyButton, closeSurveyButtonText
        } = this.props;
        const {address} = survey;
        return (
            <Fragment>
                <Button
                    title={backButtonLabel}
                    rounded
                    primary
                    onPress={() => onPrevious()}
                />
                <Title>Detalles de la encuesta</Title>
                <AddressCard address={address}/>
                <Row>
                    <Col>
                        {showCloseSurveyButton(survey) &&
                        <Button
                            title={closeSurveyButtonText}
                            onPress={() => this.handleCloseSurvey()}
                            rounded
                            primary
                        />}
                    </Col>
                </Row>
            </Fragment>
        );
    }

    render() {
        return this.props.survey ? this.renderContent() : <LoadingIndicator/>;
    }
}

export default connect(
    state => ({
        survey: state.survey.survey
    }),
    dispatch => ({
        requestSurvey: id => dispatch(requestSurvey(id)),
        closeSurvey: id => dispatch(requestCloseSurvey(id))
    })
)(SurveyDetails);
