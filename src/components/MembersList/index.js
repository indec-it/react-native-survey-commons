import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import {Button, Col, Row, Title} from '@indec/react-native-commons';
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
        onSubmit: PropTypes.func.isRequired,
        onViewDetails: PropTypes.func.isRequired,
        onAddMember: PropTypes.func.isRequired,
        saving: PropTypes.bool
    };

    static defaultProps = {
        members: null,
        saving: false
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
            onPress: member => this.props.onSelect(member.order)
        }];
    }

    componentWillMount() {
        const {id, dwellingOrder, householdOrder} = this.props.match.params;
        this.props.requestMembers(id, dwellingOrder, householdOrder);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.saving && !nextProps.saving) {
            this.props.onSubmit();
        }
    }

    goBack() {
        const {id} = this.props.match.params;
        this.props.onPrevious(id);
    }

    closeVisit() {
        const {id} = this.props.match.params;
        this.props.requestCloseSurvey(id);
    }

    render() {
        const {members} = this.props;
        const {dwellingOrder, householdOrder} = this.props.match.params;
        if (!members) {
            return null;
        }
        return (
            <Fragment>
                <Row style={styles.actionButtons}>
                    <Col>
                        <Button
                            onPress={
                                () => this.props.onViewDetails(dwellingOrder, householdOrder)
                            }
                            primary
                            title="Caracteristicas"
                        />
                    </Col>
                    <Col>
                        <Button
                            onPress={() => this.props.onAddMember()}
                            primary
                            title="Gestión de miembros"
                        />
                    </Col>
                </Row>
                <Title style={styles.title}> &nbsp; Listado de Miembros</Title>
                {isEmpty(members) && <Text style={styles.informationText}> &nbsp; No posee miembros</Text>}
                {!isEmpty(members) &&
                <View style={styles.tableContainer}>
                    <Table columns={this.columns} data={members}/>
                </View>}
                <NavigationButtons
                    onBack={() => this.goBack()}
                    onSubmit={() => this.closeVisit()}
                    submitButtonText="Cerrar Vivienda"
                />
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        members: state.survey.members,
        saving: state.survey.saving
    }),
    dispatch => ({
        requestMembers: (id, dwelling, household) => dispatch(requestMembers(id, dwelling, household)),
        requestCloseSurvey: id => dispatch(requestCloseSurvey(id))
    })
)(MembersList);
