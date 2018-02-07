import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Title} from '@indec/react-native-commons';
import Table, {TableIcon} from '@indec/react-native-table';

import {requestSurvey} from '../../actions/survey';
import {Address} from '../../model';
import AddressCard from '../AddressCard';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';

class DwellingsList extends Component {
    static propTypes = {
        requestSurvey: PropTypes.func.isRequired,
        match: matchParamsIdPropTypes.isRequired,
        survey: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            address: PropTypes.instanceOf(Address).isRequired
        }),
        onSelect: PropTypes.func.isRequired
    };

    static defaultProps = {
        survey: null
    };

    constructor(props) {
        super(props);
        this.columns = [{
            id: 1,
            label: 'Nombre',
            field: 'name'
        }, {
            id: 2,
            label: 'Número',
            field: 'order'
        }, {
            id: 4,
            componentClass: TableIcon,
            icon: 'arrow-right',
            color: '#0295cf',
            onPress: dwelling => this.props.onSelect(this.props.survey._id, dwelling.order)
        }];
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.requestSurvey(id);
    }

    render() {
        const {survey} = this.props;
        if (!survey) {
            return null;
        }
        return (
            <Fragment>
                <AddressCard address={survey.address}/>
                <Title>Listado de viviendas</Title>
                <Table columns={this.columns} data={survey.dwellings}/>
            </Fragment>
        );
    }
}

export default connect(
    state => ({survey: state.survey.survey}),
    dispatch => ({
        requestSurvey: id => dispatch(requestSurvey(id))
    })
)(DwellingsList);
