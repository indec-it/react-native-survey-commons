import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from '@indec/react-native-commons';
import {Text, View} from 'react-native';

import styles from './styles';

const AddressCard = ({address}) => (
    <View style={styles.cardContainer}>
        <Row>
            <Col size={2}>
                <Text>
                    {`Manzana: ${address.block || 'S/D'}`}
                </Text>
                <Text>
                    {`Lado de manzana: ${address.side || 'S/D'}`}
                </Text>
                <Text>
                    {`Descripción: ${address.description || 'S/D'}`}
                </Text>
            </Col>
            <Col size={2}>
                <Text>
                    {`Calle: ${address.street || 'S/D'}`}
                </Text>
                <Text>
                    {`Número: ${address.streetNumber || 'S/D'}`}
                </Text>
                <Text>
                    {`Nº en listado: ${address.listNumber || 'S/D'}`}
                </Text>
            </Col>
            <Col>
                <Text>
                    {`Piso: ${address.floor || 'S/D'}`}
                </Text>
                <Text>
                    {`Depto: ${address.department || 'S/D'}`}
                </Text>
                <Text>
                    {`Habitación: ${address.room || 'S/D'}`}
                </Text>
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
        room: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        side: PropTypes.number,
        block: PropTypes.number,
        description: PropTypes.string
    }).isRequired
};

export default AddressCard;
