import React from 'react';
import PropTypes from 'prop-types';

const Welcome = ({ username }) => <div>Welcome {username}</div>;

Welcome.propTypes = {
  username: PropTypes.string.isRequired
};

export default Welcome;
