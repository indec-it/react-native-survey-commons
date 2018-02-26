import PropTypes from 'prop-types';

export default PropTypes.shape({
    params: PropTypes.shape({
        id: PropTypes.string.isRequired,
        dwellingOrder: PropTypes.string,
        householdOrder: PropTypes.string,
        memberOrder: PropTypes.string,
        chapter: PropTypes.string
    })
});
