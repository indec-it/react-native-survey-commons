import React from 'react';
import PropTypes from 'prop-types';
import {Col, Grid, Row} from '@indec/react-native-commons';
import {Text} from 'react-native';
import styles from './styles';

const AddressCard = ({address}) => (
    <Grid style={styles.cardContainer}>
        <Row>
            <Col size={2}>
                <Text>Calle</Text>
            </Col>
            <Col>
                <Text>Número</Text>
            </Col>
            <Col>
                <Text>Nº en listado</Text>
            </Col>
        </Row>
        <Row>
            <Col size={2}>
                <Text>{address.street}</Text>
            </Col>
            <Col>
                <Text>{address.streetNumber}</Text>
            </Col>
            <Col>
                <Text>{address.listNumber}</Text>
            </Col>
        </Row>
        <Row>
            <Col size={2}>
                <Text>Piso</Text>
            </Col>
            <Col>
                <Text>Depto</Text>
            </Col>
            <Col>
                <Text>Habitación</Text>
            </Col>
        </Row>
        <Row>
            <Col size={2}>
                <Text>{address.floor}</Text>
            </Col>
            <Col>
                <Text>{address.department}</Text>
            </Col>
            <Col>
                <Text>{address.room}</Text>
            </Col>
        </Row>
    </Grid>
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
