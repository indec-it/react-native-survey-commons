import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import {Title} from '@indec/react-native-commons';
import Table, {TableIcon} from '@indec/react-native-table';
import {isEmpty} from 'lodash';

import NavigationButtons from '../NavigationButtons';
import {requestMembers, requestCloseSurvey} from '../../actions/survey';
import matchParamsIdPropTypes from '../../util/matchParamsIdPropTypes';
import styles from '../AreasList/styles';

class MembersList extends Component {
    static propTypes = {
        requestCloseSurvey: PropTypes.func.isRequired,
        requestMembers: PropTypes.func.isRequired,
        match: matchParamsIdPropTypes.isRequired,
        members: PropTypes.arrayOf(PropTypes.shape({})),
        onPrevious: PropTypes.func.isRequired,
        onSelect: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    static defaultProps = {
        members: null
    };

    constructor(props) {
        super(props);
        this.columns = [{
            id: 1,
            label: 'Número',
            field: 'order'
        }, {
            id: 2,
            label: 'Nombre',
            field: 'name'
        }, {
            id: 3,
            label: 'Relación',
            field: 'relation'
        }, {
            id: 4,
            componentClass: TableIcon,
            icon: 'arrow-right',
            color: '#0295cf',
            onPress: () => this.props.onSelect()
        }];
    }

    componentDidMount() {
        const {id, dwelling, household} = this.props.match.params;
        this.props.requestMembers(id, dwelling, household);
    }

    back() {
        const {id} = this.props.match.params;
        this.props.onPrevious(id);
    }

    closeVisit() {
        const {id} = this.props.match.params;
        this.props.requestCloseSurvey(id);
        this.props.onSubmit();
    }

    render() {
        const {members} = this.props;
        if (!members) {
            return null;
        }
        return (
            <Fragment>
                <Title>Listado de Miembros</Title>
                {isEmpty(members) && <Text>No posee miembros</Text>}
                {!isEmpty(members) &&
                <View style={styles.tableContainer}>
                    <Table columns={this.columns} data={members}/>
                </View>}
                <NavigationButtons
                    onBack={() => this.back()}
                    onSubmit={() => this.closeVisit()}
                    submitButtonText="Cerrar Vivienda"
                />
            </Fragment>
        );
    }
}

export default connect(
    state => ({members: state.survey.members}),
    dispatch => ({
        requestMembers: (id, dwelling, household) => dispatch(requestMembers(id, dwelling, household)),
        requestCloseSurvey: id => dispatch(requestCloseSurvey(id))
    })
)(MembersList);
