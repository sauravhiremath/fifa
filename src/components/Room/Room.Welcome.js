import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Welcome = props => {
  const username = props.username;
  return <div>Welcome {username}</div>;
};

Welcome.propTypes = {
  username: PropTypes.string.isRequired
};

const mapStateToProps = function (state) {
  return {
    auth: state.auth,
    username: state.username
  };
};

export default connect(mapStateToProps)(Welcome);
