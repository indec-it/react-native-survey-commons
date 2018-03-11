import PropTypes from 'prop-types';

import rowsPropTypes from './rowsPropTypes';

export default PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    root: PropTypes.bool,
    rows: rowsPropTypes.isRequired
});
