import PropTypes from 'prop-types';

export default PropTypes.shape({
    id: PropTypes.number.isRequired,
    order: PropTypes.number.isRequired,
    start: PropTypes.oneOfType([
        PropTypes.date,
        PropTypes.string
    ]),
    response: PropTypes.number,
    end: PropTypes.oneOfType([
        PropTypes.date,
        PropTypes.string
    ]),
    nextVisit: PropTypes.oneOfType([
        PropTypes.date,
        PropTypes.string
    ])
});
