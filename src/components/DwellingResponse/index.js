import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ScrollView, View} from 'react-native';

import {
    requestAddress,
    requestCreateHousehold,
    requestDwelling,
    requestUpdateDwelling
} from '../../actions/survey';
import Form from '../Form';
import {Dwelling, Address, Survey} from '../../model';
import questionPropTypes from '../../util/questionPropTypes';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import canSubmitChapter from '../../util/canSubmitChapter';
import AddressCard from '../AddressCard';
import NavigationButtons from '../NavigationButtons';
import styles from './styles';

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
            this.state.dwelling = new Dwelling(nextProps.dwelling);
        }
        if (this.props.saving && !nextProps.saving && nextProps.survey) {
            this.props.onSubmit(nextProps.survey);
        }
    }

    handleChangeAnswer(answer) {
        this.setState(state => ({
            dwelling: new Dwelling(Object.assign(state.dwelling, answer))
        }));
    }

    handleBack() {
        const {address} = this.props;
        this.props.onPrevious(address);
    }

    handleSubmit() {
        const {dwelling} = this.state;
        const {id} = this.props.match.params;
        this.props.requestUpdateDwelling(id, dwelling);
    }

    disableSubmit() {
        const {rows, dwelling} = this.props;
        return !canSubmitChapter(rows, dwelling);
    }

    render() {
        const {rows, address} = this.props;
        const {dwelling} = this.state;
        if (!address || !dwelling) {
            return null;
        }
        return (
            <View style={styles.container}>
                <ScrollView>
                    <AddressCard address={address}/>
                    <Form
                        rows={rows}
                        chapter={dwelling}
                        onChange={answer => this.handleChangeAnswer(answer)}
                    />
                    <View>
                        <NavigationButtons
                            onBack={() => this.handleBack()}
                            onSubmit={() => this.handleSubmit()}
                            disableSubmit={this.disableSubmit()}
                        />
                    </View>
                </ScrollView>
            </View>
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
