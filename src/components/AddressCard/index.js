import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from '@indec/react-native-commons';
import {Text, View} from 'react-native';

import styles from './styles';

const AddressCard = ({address}) => (
    <View style={styles.cardContainer}>
        <Row>
            <Col>
                <Text>Calle: {address.street}</Text>
                <Text>Número: {address.streetNumber}</Text>
                <Text>Nº en listado: {address.listNumber}</Text>
            </Col>
            <Col>
                <Text>Piso: {address.floor}</Text>
                <Text>Depto: {address.department}</Text>
                <Text>Habitación: {address.room}</Text>
            </Col>
        </Row>
    </View>
);

AddressCard.propTypes = {
    address: PropTypes.shape({
        street: PropTypes.string,
        streetNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        listNumber: PropTypes.number,
        floor: PropTypes.string,
        department: PropTypes.string,
        room: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }).isRequired
};

export default AddressCard;
