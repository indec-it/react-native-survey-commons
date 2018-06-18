import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LoadingIndicator, Title} from '@indec/react-native-commons';
import {noop} from 'lodash';

import {requestDwelling, requestUpdateDwelling} from '../../actions/survey';
import {Dwelling, Survey} from '../../model';
import chapterPropTypes from '../../util/chapterPropTypes';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import alertIncompleteSection from '../../util/alertIncompleteSection';
import alertIncompleteSectionOnBack from '../../util/alertIncompleteSectionOnBack';
import {getSection, handleChangeAnswer, setSectionValidity} from '../../util/section';
import Section from '../Section';

class DwellingEditor extends Component {
    static propTypes = {
        requestDwelling: PropTypes.func.isRequired,
        requestUpdateDwelling: PropTypes.func.isRequired,
        onPrevious: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        validate: PropTypes.func,
        match: matchParamsIdPropTypes.isRequired,
        chapter: chapterPropTypes.isRequired,
        // eslint-disable-next-line react/no-unused-prop-types
        dwelling: PropTypes.instanceOf(Dwelling).isRequired,
        survey: PropTypes.instanceOf(Survey).isRequired,
        saving: PropTypes.bool
    };

    static defaultProps = {
        saving: false,
        validate: noop
    };

    constructor(props) {
        super(props);
        this.goingBack = false;
        this.state = {};
    }

    static getDerivedStateFromProps(nextProps, state) {
        if (!state.dwelling && nextProps.dwelling) {
            return {dwelling: new Dwelling(nextProps.dwelling)};
        }
        return null;
    }

    componentDidMount() {
        const {id, dwellingOrder} = this.props.match.params;
        this.props.requestDwelling(id, dwellingOrder);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.saving && !this.props.saving) {
            if (this.goingBack) {
                this.props.onPrevious(this.state.dwelling);
            } else {
                this.props.onSubmit(this.props.survey);
            }
        }
    }

    handleChange(answer) {
        this.setState(state => ({
            dwelling: handleChangeAnswer(state.dwelling, this.props.chapter, answer)
        }));
    }

    handlePrevious() {
        const {chapter, onPrevious} = this.props;
        const {id} = this.props.match.params;
        const {dwelling} = this.state;

        if (setSectionValidity(dwelling, chapter)) {
            this.goingBack = true;
            this.props.requestUpdateDwelling(id, dwelling);
        } else {
            alertIncompleteSectionOnBack(() => onPrevious(dwelling));
        }
    }

    handleSubmit() {
        const {chapter} = this.props;
        const {id} = this.props.match.params;
        const {dwelling} = this.state;

        if (setSectionValidity(dwelling, chapter)) {
            this.goingBack = false;
            this.props.requestUpdateDwelling(id, dwelling);
        } else {
            alertIncompleteSection();
        }
    }

    renderContent() {
        const {chapter, validate} = this.props;
        const {dwelling} = this.state;
        const section = getSection(dwelling, chapter);
        return (
            <Fragment>
                <Title>{chapter.title}</Title>
                <Section
                    section={section}
                    chapter={chapter.rows}
                    onChange={answer => this.handleChange(answer)}
                    onPrevious={() => this.handlePrevious()}
                    onSubmit={() => this.handleSubmit()}
                    validationResults={validate(section)}
                />
            </Fragment>
        );
    }

    render() {
        return this.state.dwelling ? this.renderContent() : <LoadingIndicator/>;
    }
}

export default connect(
    state => ({
        dwelling: state.survey.dwelling,
        saving: state.survey.saving,
        survey: state.survey.survey
    }),
    dispatch => ({
        requestDwelling: (id, dwellingOrder) => dispatch(
            requestDwelling(id, dwellingOrder)
        ),
        requestUpdateDwelling: (id, dwelling) => dispatch(
            requestUpdateDwelling(id, dwelling)
        )
    })
)(DwellingEditor);
