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
                    {`Manzana: ${address.block}`}
                </Text>
                <Text>
                    {`Lado de manzana: ${address.side}`}
                </Text>
                {address.description && (
                    <Text>
                        {`Descripción: ${address.description}`}
                    </Text>
                )}
            </Col>
            <Col size={2}>
                <Text>
                    {`Calle: ${address.street}`}
                </Text>
                <Text>
                    {`Número: ${address.streetNumber}`}
                </Text>
                <Text>
                    {`Nº en listado: ${address.listNumber}`}
                </Text>
            </Col>
            <Col>
                <Text>
                    {`Piso: ${address.floor}`}
                </Text>
                <Text>
                    {`Dpto/Hab: ${address.department}`}
                </Text>
                <Text>
                    {`Casa/Lote: ${address.lot}`}
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
        department: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        room: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        side: PropTypes.number,
        block: PropTypes.number,
        description: PropTypes.string
    }).isRequired
};

export default AddressCard;
