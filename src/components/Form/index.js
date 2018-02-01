import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LoadingIndicator} from '@indec/react-native-commons';

import FormBuilder from '../FormBuilder';
import {cleanChildrenQuestions, questionPropTypes} from '../../util';

import {requestSurvey} from '../../actions/survey';

class Form extends Component {
    static propTypes = {
        requestSurvey: PropTypes.func.isRequired,
        rows: questionPropTypes.isRequired,
        survey: PropTypes.shape({}).isRequired,
        id: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.requestSurvey(this.props.id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.survey) {
            this.state.survey = nextProps.survey;
        }
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
        const {rows} = this.props;
        const {survey} = this.state;
        return (
            <FormBuilder
                rows={rows}
                chapter={survey}
                onChange={answer => this.handleChangeAnswer(answer)}
            />
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
