import React from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {Col, Row} from '@indec/react-native-commons';

import {Member} from '../../model';
import {getMemberAge, getMemberName} from '../../util';
import styles from './styles';

const MemberData = ({member, style}) => (
    <View style={[styles.nameContainer, style.nameContainer]}>
        <Row>
            <Col>
                <Text>Miembro N°: {member.order}</Text>
            </Col>
            <Col>
                <Text>Nombre: {getMemberName(member)}</Text>
            </Col>
            <Col>
                <Text>Edad: {getMemberAge(member)} años</Text>
            </Col>
        </Row>
    </View>
);

MemberData.propTypes = {
    member: PropTypes.instanceOf(Member).isRequired,
    style: PropTypes.shape({})
};

MemberData.defaultProps = {
    style: {}
};

export default MemberData;
