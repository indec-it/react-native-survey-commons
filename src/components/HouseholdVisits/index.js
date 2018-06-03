import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Table from '@indec/react-native-table';

import {requestHouseholdVisits} from '../../actions/survey';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import {formatDate} from '../../util';

class HouseholdVisits extends Component {
    static propTypes = {
        requestHouseholdVisits: PropTypes.func.isRequired,
        match: matchParamsIdPropTypes.isRequired,
        householdVisits: PropTypes.arrayOf(PropTypes.shape({
            order: PropTypes.number,
            start: PropTypes.string,
            end: PropTypes.string,
            comment: PropTypes.string,
            response: PropTypes.number
        }))
    };

    static defaultProps = {
        householdVisits: []
    };

    constructor(props) {
        super(props);
        this.columns = [{
            id: 1,
            label: 'N° de visita',
            field: 'order'
        }, {
            id: 2,
            label: 'Fecha inicio',
            field: ({start}) => formatDate(start)
        }, {
            id: 3,
            label: 'Fecha fin',
            field: ({end}) => formatDate(end)
        }, {
            id: 4,
            label: 'Comentario',
            field: 'comment'
        }, {
            id: 5,
            label: 'Respuesta del hogar',
            field: 'response'
        }];
    }

    componentDidMount() {
        const {id, dwellingOrder, householdOrder} = this.props.match.params;
        this.props.requestHouseholdVisits(id, dwellingOrder, householdOrder);
    }

    render() {
        const {householdVisits} = this.props;
        return <Table data={householdVisits} columns={this.columns}/>;
    }
}

export default connect(
    state => ({
        householdVisits: state.survey.householdVisits
    }),
    dispatch => ({
        requestHouseholdVisits: (id, dwellingOrder, householdOrder) => dispatch(
            requestHouseholdVisits(id, dwellingOrder, householdOrder)
        )
    })
)(HouseholdVisits);
