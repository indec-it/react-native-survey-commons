import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Table} from '@indec/react-native-table';
import {columnPropTypes} from '@indec/react-native-table/util';
import {DateUtilsService} from '@indec/react-native-commons/services';

import {requestFetchDwellingVisits} from '../../actions/survey';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import dwellingVisitPropTypes from '../../util/dwellingVisitPropTypes';

class DwellingVisits extends Component {
    static propTypes = {
        requestFetchDwellingVisits: PropTypes.func.isRequired,
        match: matchParamsIdPropTypes.isRequired,
        dwellingVisits: PropTypes.arrayOf(dwellingVisitPropTypes).isRequired,
        columns: PropTypes.arrayOf(columnPropTypes)
    };

    static defaultProps = {
        columns: null
    };

    constructor(props) {
        super(props);
        this.columns = [{
            id: 1,
            label: 'N° visita',
            field: 'order'
        }, {
            id: 2,
            label: 'Fecha',
            field: ({date}) => DateUtilsService.formatDate(date)
        }, {
            id: 3,
            label: 'Hora',
            field: ({date}) => DateUtilsService.formatTime(date)
        }, {
            id: 4,
            label: 'Observaciones',
            field: 'comment'
        }];
    }

    componentDidMount() {
        const {id, dwellingOrder} = this.props.match.params;
        this.props.requestFetchDwellingVisits(id, dwellingOrder);
    }

    render() {
        const {columns, dwellingVisits} = this.props;
        return (
            <Table columns={columns || this.columns} data={dwellingVisits}/>
        );
    }
}

export default connect(
    state => ({
        dwellingVisits: state.survey.dwellingVisits
    }), dispatch => ({
        requestFetchDwellingVisits: (surveyId, dwellingOrder) => dispatch(
            requestFetchDwellingVisits(surveyId, dwellingOrder)
        )
    })
)(DwellingVisits);
