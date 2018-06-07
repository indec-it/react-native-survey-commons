import PropTypes from 'prop-types';

export default PropTypes.shape({
    order: PropTypes.number.isRequired,
    date: PropTypes.date,
    comment: PropTypes.string
});
