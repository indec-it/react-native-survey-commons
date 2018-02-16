import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LoadingIndicator} from '@indec/react-native-commons';
import {ScrollView, View} from 'react-native';

import {requestSurvey, requestSaveSurvey} from '../../actions/survey';
import Form from '../Form';
import {Survey} from '../../model';
import cleanChildrenQuestions from '../../util/cleanChildrenQuestions';
import questionPropTypes from '../../util/questionPropTypes';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import NavigationButtons from '../NavigationButtons';
import styles from './styles';

class Section extends Component {
    static propTypes = {
        requestSaveSurvey: PropTypes.func.isRequired,
        requestSurvey: PropTypes.func.isRequired,
        rows: questionPropTypes.isRequired,
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

    componentWillMount() {
        const {id} = this.props.match.params;
        this.props.requestSurvey(id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.survey) {
            this.state.survey = nextProps.survey;
        }
        if (this.props.saving && !nextProps.saving) {
            this.props.onSubmit();
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

    handleBack() {
        const {survey} = this.state;
        this.props.onPrevious(survey._id);
    }

    handleSubmit() {
        const {survey} = this.state;
        this.props.requestSaveSurvey(survey);
    }

    renderContent() {
        const {rows} = this.props;
        const {survey} = this.state;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Form
                        rows={rows}
                        chapter={survey}
                        onChange={answer => this.handleChangeAnswer(answer)}
                    />
                    <View>
                        <NavigationButtons
                            onBack={() => this.handleBack()}
                            onSubmit={() => this.handleSubmit()}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }

    render() {
        return this.state.survey ? this.renderContent() : <LoadingIndicator/>;
    }
}

export default connect(
    state => ({
        survey: state.survey.survey,
        saving: state.survey.saving
    }),
    dispatch => ({
        requestSurvey: id => dispatch(requestSurvey(id)),
        requestSaveSurvey: survey => dispatch(requestSaveSurvey(survey))
    })
)(Section);
