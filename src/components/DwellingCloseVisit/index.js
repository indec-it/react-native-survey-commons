import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LoadingIndicator, Title} from '@indec/react-native-commons';
import {last, isEmpty} from 'lodash';

import {requestDwellingVisits, requestCloseDwellingVisit} from '../../actions/survey';
import {Dwelling} from '../../model';
import chapterPropTypes from '../../util/chapterPropTypes';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import dwellingVisitPropTypes from '../../util/dwellingVisitPropTypes';
import Form from '../Form';
import NavigationButtons from '../NavigationButtons';

class DwellingCloseVisit extends Component {
    static propTypes = {
        requestCloseDwellingVisit: PropTypes.func.isRequired,
        requestDwellingVisits: PropTypes.func.isRequired,
        onPrevious: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        match: matchParamsIdPropTypes.isRequired,
        chapter: chapterPropTypes.isRequired,
        dwelling: PropTypes.instanceOf(Dwelling).isRequired,
        dwellingVisits: PropTypes.arrayOf(dwellingVisitPropTypes),
        saving: PropTypes.bool
    };

    static defaultProps = {
        saving: false,
        dwellingVisits: []
    };

    constructor(props) {
        super(props);
        this.state = {
            currentVisit: null
        };
    }

    componentDidMount() {
        const {id, dwellingOrder} = this.props.match.params;
        this.props.requestDwellingVisits(id, dwellingOrder);
    }

    componentWillReceiveProps(nextProps) {
        const {saving, dwelling, dwellingVisits} = nextProps;
        if (!isEmpty(dwellingVisits)) {
            this.state.currentVisit = last(dwellingVisits);
        }
        if (this.props.saving && !saving) {
            this.props.onSubmit(dwelling);
        }
    }

    handleChange(answer) {
        this.setState(state => ({currentVisit: Object.assign(state.currentVisit, answer)}));
    }

    handleSubmit() {
        this.props.requestCloseDwellingVisit(
            this.props.match.params.id,
            this.props.match.params.dwellingOrder,
            this.state.currentVisit
        );
    }

    renderContent() {
        const {chapter} = this.props;
        const {currentVisit} = this.state;
        return (
            <Fragment>
                <Title>{chapter.title}</Title>
                <Form
                    rows={chapter.rows}
                    chapter={currentVisit}
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
        return this.state.currentVisit ? this.renderContent() : <LoadingIndicator/>;
    }
}

export default connect(
    state => ({
        saving: state.survey.saving,
        dwellingVisits: state.survey.dwellingVisits
    }),
    dispatch => ({
        requestCloseDwellingVisit: (id, dwellingOrder, currentVisit) => dispatch(
            requestCloseDwellingVisit(id, dwellingOrder, currentVisit)
        ),
        requestDwellingVisits: (id, dwellingOrder) => dispatch(
            requestDwellingVisits(id, dwellingOrder)
        )
    })
)(DwellingCloseVisit);
