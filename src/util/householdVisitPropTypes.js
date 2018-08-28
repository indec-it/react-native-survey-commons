import PropTypes from 'prop-types';

export default PropTypes.shape({
    id: PropTypes.number.isRequired,
    order: PropTypes.number.isRequired,
    start: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string
    ]),
    response: PropTypes.number,
    end: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string
    ]),
    nextVisit: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string
    ])
});
