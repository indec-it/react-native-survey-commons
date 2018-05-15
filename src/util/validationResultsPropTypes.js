import PropTypes from 'prop-types';

const validationResult = PropTypes.shape({
    message: PropTypes.string,
    hasFailed: PropTypes.bool,
    hasPassed: PropTypes.bool
});

export default PropTypes.oneOfType([
    validationResult, PropTypes.arrayOf(validationResult)
]);
