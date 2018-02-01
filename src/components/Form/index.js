import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LoadingIndicator} from '@indec/react-native-commons';

import AddressCard from '../AddressCard';
import FormBuilder from '../FormBuilder';
import {cleanChildrenQuestions, questionPropTypes} from '../../util';

import {requestSurvey} from '../../actions/survey';

class Form extends Component {
    static propTypes = {
        requestSurvey: PropTypes.func.isRequired,
        rows: questionPropTypes.isRequired,
        survey: PropTypes.shape({}).isRequired,
        id: PropTypes.string.isRequired,
        showAddressCard: PropTypes.bool
    };

    static defaultProps = {
        showAddressCard: false
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.requestSurvey(this.props.id);
    }

    componentWillReceiveProps(nextProps) {
        const {survey} = nextProps;
        this.setState(() => ({survey}));
    }

    handleChangeAnswer(answer) {
        this.setState(state => ({
            survey: cleanChildrenQuestions(
                this.props.rows,
                Object.assign(state.survey, answer)
            )
        }));
    }

    renderContent() {
        const {rows, showAddressCard} = this.props;
        const {survey} = this.state;
        return (
            <Fragment>
                {showAddressCard && <AddressCard address={survey.address}/>}
                <FormBuilder
                    rows={rows}
                    chapter={survey}
                    onChange={answer => this.handleChangeAnswer(answer)}
                />
            </Fragment>
        );
    }

    render() {
        return this.state.survey ? this.renderContent() : <LoadingIndicator/>;
    }
}

export default connect(
    state => ({
        survey: state.surveys.survey
    }),
    dispatch => ({
        requestSurvey: id => dispatch(requestSurvey(id))
    })
)(Form);
