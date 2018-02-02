import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {withRouter} from 'react-router-native';
import Table, {TableIcon} from '@indec/react-native-table';
import {Title} from '@indec/react-native-commons';

import {requestAreas} from '../../actions/survey';
import styles from './styles';

class AreasList extends Component {
    static propTypes = {
        requestAreas: PropTypes.func.isRequired,
        areas: PropTypes.arrayOf(
            PropTypes.shape({
                ups: PropTypes.number,
                area: PropTypes.number,
                departmentName: PropTypes.string
            })
        ),
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired
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
            onPress: area => this.props.history.push(`/addressesList/${area.area}/${area.ups}`)
        }];
    }

    componentDidMount() {
        this.props.requestAreas();
    }

    render() {
        const {areas} = this.props;
        return (
            <Fragment>
                <Title>Listado de áreas</Title>
                <View style={styles.tableContainer}>
                    <Table columns={this.columns} data={areas}/>
                </View>
            </Fragment>
        );
    }
}

export default withRouter(connect(
    state => ({areas: state.survey.areas}),
    dispatch => ({
        requestAreas: () => dispatch(requestAreas())
    })
)(AreasList));
