import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LoadingIndicator, Title} from '@indec/react-native-commons';

import {requestDwelling, requestUpdateDwelling} from '../../actions/survey';
import {Dwelling, Survey} from '../../model';
import chapterPropTypes from '../../util/chapterPropTypes';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import {getSection, handleChangeAnswer} from '../../util/section';
import Section from '../Section';

class DwellingEditor extends Component {
    static propTypes = {
        requestDwelling: PropTypes.func.isRequired,
        requestUpdateDwelling: PropTypes.func.isRequired,
        onPrevious: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        match: matchParamsIdPropTypes.isRequired,
        chapter: chapterPropTypes.isRequired,
        dwelling: PropTypes.instanceOf(Dwelling).isRequired,
        survey: PropTypes.instanceOf(Survey).isRequired,
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
        const {id, dwellingOrder} = this.props.match.params;
        this.props.requestDwelling(id, dwellingOrder);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dwelling) {
            this.state.dwelling = new Dwelling(nextProps.dwelling);
        }
        if (this.props.saving && !nextProps.saving) {
            this.props.onSubmit(nextProps.survey);
        }
    }

    onChange(answer) {
        const {chapter} = this.props;
        const {dwelling} = this.state;
        this.setState({dwelling: handleChangeAnswer(dwelling, chapter, answer)});
    }

    onSubmit() {
        const {id} = this.props.match.params;
        const {dwelling} = this.state;
        this.props.requestUpdateDwelling(id, dwelling);
    }

    renderContent() {
        const {chapter} = this.props;
        const {dwelling} = this.state;
        const section = getSection(dwelling, chapter);
        return (
            <Fragment>
                <Title>{chapter.title}</Title>
                <Section
                    section={section}
                    chapter={chapter.rows}
                    onChange={answer => this.onChange(answer)}
                    onPrevious={() => this.props.onPrevious()}
                    onSubmit={() => this.onSubmit()}
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
        requestDwelling: (id, dwellingOrder) => dispatch(requestDwelling(id, dwellingOrder)),
        requestUpdateDwelling: (id, dwelling) => dispatch(requestUpdateDwelling(id, dwelling))
    })
)(DwellingEditor);