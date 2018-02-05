import PropTypes from 'prop-types';

export default PropTypes.shape({
    params: PropTypes.shape({
        id: PropTypes.string.isRequired,
        dwelling: PropTypes.string
    })
});
