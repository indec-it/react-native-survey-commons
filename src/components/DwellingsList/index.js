import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LoadingIndicator, Title} from '@indec/react-native-commons';
import {Table, TableIcon} from '@indec/react-native-table';
import {columnPropTypes} from '@indec/react-native-table/util';

import {requestDwellings} from '../../actions/survey';
import {Dwelling} from '../../model';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';

class DwellingsList extends Component {
    static propTypes = {
        requestDwellings: PropTypes.func.isRequired,
        onSelect: PropTypes.func.isRequired,
        match: matchParamsIdPropTypes.isRequired,
        dwellings: PropTypes.arrayOf(PropTypes.instanceOf(Dwelling)),
        columns: PropTypes.arrayOf(columnPropTypes)
    };

    static defaultProps = {
        dwellings: [],
        columns: null
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
            onPress: dwelling => this.props.onSelect(dwelling)
        }];
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.requestDwellings(id);
    }

    renderContent() {
        const {columns, dwellings} = this.props;
        return (
            <Fragment>
                <Title>
                    Listado de viviendas
                </Title>
                <Table columns={columns || this.columns} data={dwellings}/>
            </Fragment>
        );
    }

    render() {
        return this.props.dwellings ? this.renderContent() : <LoadingIndicator/>;
    }
}

export default connect(
    state => ({dwellings: state.survey.dwellings}),
    dispatch => ({
        requestDwellings: id => dispatch(requestDwellings(id))
    })
)(DwellingsList);
