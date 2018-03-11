import PropTypes from 'prop-types';

export default PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    questions: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.number,
        type: PropTypes.string.isRequired,
        text: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.number,
            label: PropTypes.string,
            text: PropTypes.string
        })),
        parents: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            type: PropTypes.string,
            value: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
                PropTypes.bool
            ])
        }))
    }))
}));
