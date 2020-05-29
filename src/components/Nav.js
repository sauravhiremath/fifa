import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Navbar, Form, Button } from 'react-bootstrap';
import logo from '../logo.svg';

class Nav extends React.Component {
  static contextTypes = { theme: PropTypes.object };

  static propTypes = {
    username: PropTypes.string.isRequired,
  };

  loginStatus = () => {
    const username = this.props.username;
    if (username) {
      return (
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <b>{username}</b>
          </Navbar.Text>
        </Navbar.Collapse>
      );
    }

    return (
      <Navbar.Collapse className="justify-content-end">
        <Form inline>
          <Button variant="outline-primary">Login</Button>
        </Form>
      </Navbar.Collapse>
    );
  };

  render() {
    const { theme } = this.context;
    return (
      <Navbar variant="dark" style={{ background: theme.useFluentDesign ? theme.acrylicTexture80.background : 'none' }}>
        <Navbar.Brand href="/">
          <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="logo" /> Fifa.io
        </Navbar.Brand>
        <this.loginStatus />
      </Navbar>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    loggedIn: state.loggedIn,
    username: state.username,
  };
};

export default connect(mapStateToProps)(Nav);