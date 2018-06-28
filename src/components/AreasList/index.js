import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Table, {TableIcon} from '@indec/react-native-table';
import {columnPropType} from '@indec/react-native-table/util';
import {Title} from '@indec/react-native-commons';

import {requestAreas} from '../../actions/survey';

class AreasList extends Component {
    static propTypes = {
        requestAreas: PropTypes.func.isRequired,
        onSelect: PropTypes.func.isRequired,
        areas: PropTypes.arrayOf(
            PropTypes.shape({
                ups: PropTypes.number,
                area: PropTypes.number,
                localityName: PropTypes.string
            })
        ),
        columns: columnPropType
    };

    static defaultProps = {
        areas: [],
        columns: null
    };

    constructor(props) {
        super(props);
        this.columns = [{
            id: 1,
            label: 'UPS',
            field: 'ups'
        }, {
            id: 2,
            label: 'N° Área',
            field: 'area'
        }, {
            id: 3,
            label: 'Localidad',
            field: 'localityName'
        }, {
            id: 4,
            componentClass: TableIcon,
            icon: 'arrow-right',
            color: '#0295cf',
            onPress: area => this.props.onSelect(area)
        }];
    }

    componentDidMount() {
        this.props.requestAreas();
    }

    render() {
        const {areas, columns} = this.props;
        return (
            <Fragment>
                <Title>
                    Listado de áreas
                </Title>
                <Table columns={columns || this.columns} data={areas}/>
            </Fragment>
        );
    }
}

export default connect(
    state => ({areas: state.survey.areas}),
    dispatch => ({
        requestAreas: () => dispatch(requestAreas())
    })
)(AreasList);
