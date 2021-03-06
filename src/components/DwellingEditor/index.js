import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LoadingIndicator, Title} from '@indec/react-native-commons';
import {noop} from 'lodash';

import {requestDwelling, requestSaveDwelling} from '../../actions/survey';
import {Dwelling} from '../../model';
import chapterPropTypes from '../../util/chapterPropTypes';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import alertIncompleteSection from '../../util/alertIncompleteSection';
import alertIncompleteSectionOnBack from '../../util/alertIncompleteSectionOnBack';
import {getSection, handleChangeAnswer, setSectionValidity} from '../../util/section';
import Section from '../Section';

class DwellingEditor extends Component {
    static propTypes = {
        requestDwelling: PropTypes.func.isRequired,
        requestSaveDwelling: PropTypes.func.isRequired,
        onPrevious: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        validate: PropTypes.func,
        match: matchParamsIdPropTypes.isRequired,
        chapter: chapterPropTypes.isRequired,
        // eslint-disable-next-line react/no-unused-prop-types
        dwelling: PropTypes.instanceOf(Dwelling).isRequired,
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

    componentDidMount() {
        const {id, dwellingOrder} = this.props.match.params;
        this.props.requestDwelling(id, dwellingOrder);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.saving && !this.props.saving) {
            const {dwelling} = this.state;
            if (this.goingBack) {
                this.props.onPrevious(dwelling);
            } else {
                this.props.onSubmit(dwelling);
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.dwelling && (!state.dwelling || props.dwelling.id !== state.dwelling.id)) {
            return {dwelling: props.dwelling};
        }
        return null;
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
            this.props.requestSaveDwelling(id, dwelling);
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
            this.props.requestSaveDwelling(id, dwelling);
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
                <Title>
                    {chapter.title}
                </Title>
                <Section
                    section={section}
                    rows={chapter.rows}
                    onChange={answer => this.handleChange(answer)}
                    onBack={() => this.handlePrevious()}
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
        saving: state.survey.saving
    }),
    dispatch => ({
        requestDwelling: (id, dwellingOrder) => dispatch(
            requestDwelling(id, dwellingOrder)
        ),
        requestSaveDwelling: (id, dwelling) => dispatch(
            requestSaveDwelling(id, dwelling)
        )
    })
)(DwellingEditor);
