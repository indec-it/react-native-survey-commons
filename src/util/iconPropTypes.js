import PropTypes from 'prop-types';

export default PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    size: PropTypes.number
});
