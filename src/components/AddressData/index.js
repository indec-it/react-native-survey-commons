import React from 'react';
import PropTypes from 'prop-types';
import Table from '@indec/react-native-table';

const columns = [{
    id: 1,
    label: 'Cod. Localidad',
    field: 'localityId'
}, {
    id: 2,
    label: 'Localidad',
    field: 'localityName'
}, {
    id: 3,
    label: 'Segmento',
    field: 'segment'
}, {
    id: 4,
    label: 'Manzana',
    field: 'block'
}, {
    id: 5,
    label: 'Lado de manzana',
    field: 'blockSide'
}, {
    id: 6,
    label: 'Código de calle',
    field: 'streetNumber'
}, {
    id: 7,
    label: 'Calle',
    field: 'street'
}, {
    id: 8,
    label: 'Puerta N°',
    field: 'door'
}];

const AddressData = ({address}) => (
    <Table columns={columns} data={address}/>
);

AddressData.propTypes = {
    address: PropTypes.shape({
        localityId: PropTypes.number,
        localityName: PropTypes.string,
        segment: PropTypes.number,
        block: PropTypes.number,
        blockSide: PropTypes.number,
        streetNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        street: PropTypes.string,
        door: PropTypes.string
    }).isRequired
};

export default AddressData;
