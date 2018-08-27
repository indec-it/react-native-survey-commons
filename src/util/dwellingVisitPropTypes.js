import PropTypes from 'prop-types';

export default PropTypes.shape({
    id: PropTypes.number.isRequired,
    order: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date),
    comment: PropTypes.string
});
