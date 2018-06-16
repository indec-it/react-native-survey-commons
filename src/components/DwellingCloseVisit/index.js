import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LoadingIndicator, Title} from '@indec/react-native-commons';

import {requestFetchCurrentDwellingVisit, requestCloseDwellingVisit} from '../../actions/survey';
import chapterPropTypes from '../../util/chapterPropTypes';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import dwellingVisitPropTypes from '../../util/dwellingVisitPropTypes';
import Form from '../Form';
import NavigationButtons from '../NavigationButtons';

class DwellingCloseVisit extends Component {
    static propTypes = {
        requestCloseDwellingVisit: PropTypes.func.isRequired,
        requestFetchCurrentDwellingVisit: PropTypes.func.isRequired,
        onPrevious: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        match: matchParamsIdPropTypes.isRequired,
        chapter: chapterPropTypes.isRequired,
        // eslint-disable-next-line react/no-unused-prop-types
        currentDwellingVisit: dwellingVisitPropTypes,
        saving: PropTypes.bool
    };

    static defaultProps = {
        saving: false,
        currentDwellingVisit: null
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const {id, dwellingOrder} = this.props.match.params;
        this.props.requestFetchCurrentDwellingVisit(id, dwellingOrder);
    }

    static getDerivedStateFromProps(nextProps, state) {
        if (nextProps.currentDwellingVisit && !state.currentDwellingVisit) {
            return {
                currentDwellingVisit: nextProps.currentDwellingVisit
            };
        }
        return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.saving && !this.props.saving) {
            this.props.onSubmit();
        }
    }

    handleChange(answer) {
        this.setState(state => ({currentDwellingVisit: Object.assign(state.currentDwellingVisit, answer)}));
    }

    handleSubmit() {
        this.props.requestCloseDwellingVisit(
            this.props.match.params.id,
            this.props.match.params.dwellingOrder,
            this.state.currentDwellingVisit
        );
    }

    renderContent() {
        const {chapter} = this.props;
        const {currentDwellingVisit} = this.state;
        return (
            <Fragment>
                <Title>{chapter.title}</Title>
                <Form
                    rows={chapter.rows}
                    chapter={currentDwellingVisit}
                    onChange={answer => this.handleChange(answer)}
                />
                <NavigationButtons
                    onBack={() => this.props.onPrevious()}
                    onSubmit={() => this.handleSubmit()}
                    submitButtonText="Guardar y salir"
                    iconRight={{name: 'floppy-o', color: 'red'}}
                    styleRightButton={{
                        primary: false,
                        danger: true,
                        rounded: true
                    }}
                />
            </Fragment>
        );
    }

    render() {
        return this.state.currentDwellingVisit ? this.renderContent() : <LoadingIndicator/>;
    }
}

export default connect(
    state => ({
        saving: state.survey.saving,
        currentDwellingVisit: state.survey.currentDwellingVisit
    }),
    dispatch => ({
        requestCloseDwellingVisit: (id, dwellingOrder, currentVisit) => dispatch(
            requestCloseDwellingVisit(id, dwellingOrder, currentVisit)
        ),
        requestFetchCurrentDwellingVisit: (id, dwellingOrder) => dispatch(
            requestFetchCurrentDwellingVisit(id, dwellingOrder)
        )
    })
)(DwellingCloseVisit);
