import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View} from 'react-native';
import Table, {TableIcon} from '@indec/react-native-table';
import {Title} from '@indec/react-native-commons';

import {requestAreas} from '../../actions/survey';
import styles from './styles';

class AreasList extends Component {
    static propTypes = {
        requestFetchSurvey: PropTypes.func.isRequired,
        requestAreas: PropTypes.func.isRequired,
        areas: PropTypes.arrayOf(PropTypes.shape({}))
    };

    static defaultProps = {
        areas: []
    };

    constructor(props) {
        super(props);
        this.columns = [{
            id: 1,
            label: 'UPS',
            field: 'ups'
        }, {
            id: 2,
            label: 'Área',
            field: 'area'
        }, {
            id: 3,
            label: 'Departamento',
            field: 'departmentName'
        }, {
            id: 4,
            componentClass: TableIcon,
            icon: 'arrow-right',
            color: '#0295cf',
            onPress: address => this.props.requestFetchSurvey(address.area, address.ups)
        }];
    }

    componentDidMount() {
        this.props.requestAreas();
    }

    render() {
        const {areas} = this.props;
        return (
            <View style={styles.tableContainer}>
                <Title>Listado de áreas</Title>
                <Table columns={this.columns} data={areas}/>
            </View>
        );
    }
}

export default connect(
    state => ({areas: state.surveys.areas}),
    dispatch => ({
        requestAreas: () => dispatch(requestAreas())
    })
)(AreasList);
