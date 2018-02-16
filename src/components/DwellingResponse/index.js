import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
    requestAddress,
    requestCreateHousehold,
    requestDwelling,
    requestUpdateDwelling
} from '../../actions/survey';
import Form from '../Form';
import {Dwelling, Address, Survey} from '../../model';
import {answers} from '../../constants';
import questionPropTypes from '../../util/questionPropTypes';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import AddressCard from '../AddressCard';
import NavigationButtons from '../NavigationButtons';

class DwellingResponse extends Component {
    static propTypes = {
        requestAddress: PropTypes.func.isRequired,
        requestUpdateDwelling: PropTypes.func.isRequired,
        requestDwelling: PropTypes.func.isRequired,
        rows: questionPropTypes.isRequired,
        address: PropTypes.instanceOf(Address).isRequired,
        dwelling: PropTypes.instanceOf(Dwelling).isRequired,
        survey: PropTypes.instanceOf(Survey).isRequired,
        match: matchParamsIdPropTypes.isRequired,
        onPrevious: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        saving: PropTypes.bool
    };

    static defaultProps = {
        saving: false
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const {id, dwelling} = this.props.match.params;
        this.props.requestDwelling(id, dwelling);
        this.props.requestAddress(id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dwelling) {
            this.state.dwelling = nextProps.dwelling;
        }
        if (this.props.saving && !nextProps.saving && nextProps.survey) {
            this.props.onSubmit(nextProps.survey);
        }
    }

    handleChangeAnswer(answer) {
        this.setState(state => ({
            dwelling: Object.assign(state.dwelling, answer)
        }));
    }

    goToAddressList() {
        const {address} = this.props;
        this.props.onPrevious(address);
    }

    save() {
        const {dwelling} = this.state;
        const {id} = this.props.match.params;
        this.props.requestUpdateDwelling(id, dwelling);
    }

    render() {
        const {rows, address} = this.props;
        const {dwelling} = this.state;
        if (!address || !dwelling) {
            return null;
        }
        return (
            <Fragment>
                <AddressCard address={address}/>
                <Form
                    rows={rows}
                    chapter={dwelling}
                    onChange={answer => this.handleChangeAnswer(answer)}
                />
                <NavigationButtons
                    onBack={() => this.goToAddressList()}
                    onSubmit={() => this.save()}
                    submitButtonText={(dwelling.response === answers.NO ? 'Guardar y salir' : 'Siguiente')}
                />
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        address: state.survey.address,
        dwelling: state.survey.dwelling,
        survey: state.survey.survey,
        saving: state.survey.saving
    }),
    dispatch => ({
        requestCreateHousehold: dwelling => dispatch(requestCreateHousehold(dwelling)),
        requestDwelling: (survey, dwelling) => dispatch(requestDwelling(survey, dwelling)),
        requestUpdateDwelling: (id, dwelling) => dispatch(requestUpdateDwelling(id, dwelling)),
        requestAddress: id => dispatch(requestAddress(id))
    })
)(DwellingResponse);
