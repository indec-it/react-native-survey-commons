import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-native';
import {types} from '@indec/react-native-form-builder';
import YesNoButtons from '@indec/react-native-form-builder/src/components/YesNoButtons';
import Radio from '@indec/react-native-form-builder/src/components/Radio';
import {Row} from '@indec/react-native-commons';

import {answers} from '../../constants';
import {requestSurvey, requestSaveSurvey} from '../../actions/survey';
import questionPropTypes from '../../util/questionPropTypes';
import historyPropTypes from '../../util/historyPropTypes';
import matchPropTypes from '../../util/matchPropTypes';
import AddressCard from '../AddressCard';
import NavigationButtons from '../NavigationButtons';

class DwellingResponse extends Component {
    static propTypes = {
        requestSaveSurvey: PropTypes.func.isRequired,
        requestSurvey: PropTypes.func.isRequired,
        rows: questionPropTypes.isRequired,
        survey: PropTypes.shape({}).isRequired,
        match: matchPropTypes.isRequired,
        history: historyPropTypes.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.requestSurvey(id);
    }

    componentWillReceiveProps(nextProps) {
        const {survey} = nextProps;
        this.state.survey = survey;
        if (survey && !survey.dwellingResponse) {
            this.state.survey.dwellingResponse = null;
            this.state.survey.noResponseCause = null;
        }
    }

    handleChangeAnswer(answer) {
        this.setState(state => ({
            survey: Object.assign(state.survey, answer)
        }));
    }

    goToAddressList() {
        const {area, ups} = this.state.survey.address;
        this.props.history.push(`/addressesList/${area}/${ups}`);
    }

    async save() {
        const {survey} = this.state;
        await this.props.requestSaveSurvey(survey);
        if (this.state.survey.dwellingResponse === answers.NO) {
            this.props.history.push('/');
        }
    }

    render() {
        const {rows} = this.props;
        const {survey} = this.state;
        if (!survey) {
            return null;
        }
        return (
            <Fragment>
                <AddressCard address={survey.address}/>
                {rows.map(row => (
                    <Row key={row.id}>
                        {row.questions.map(question => (
                            <Fragment key={question.number}>
                                {question.type === types.YES_NO_BUTTONS &&
                                <YesNoButtons
                                    question={question}
                                    answer={survey.dwellingResponse}
                                    onChange={answer => this.handleChangeAnswer(answer)}
                                />}
                                {question.type === types.RADIO && survey.dwellingResponse === answers.NO &&
                                <Radio
                                    question={question}
                                    answer={survey.noResponseCause}
                                    onChange={answer => this.handleChangeAnswer(answer)}
                                />}
                            </Fragment>
                        ))}
                    </Row>
                ))}
                <NavigationButtons
                    onBack={() => this.goToAddressList()}
                    onSubmit={() => this.save()}
                    submitButtonText="Siguiente"
                />
            </Fragment>
        );
    }
}

export default withRouter(connect(
    state => ({
        survey: state.survey.survey
    }),
    dispatch => ({
        requestSurvey: id => dispatch(requestSurvey(id)),
        requestSaveSurvey: survey => dispatch(requestSaveSurvey(survey))
    })
)(DwellingResponse));
