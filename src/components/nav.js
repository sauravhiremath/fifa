import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { Navbar, Form, Button } from 'react-bootstrap';
import logo from '../logo.svg';

export default class Nav extends React.Component {
  static contextTypes = { theme: PropTypes.object };

  loginStatus = () => {
    const token = Cookies.get('fifa-profile');
    console.log(token);
    if (token) {
      const username = parseJwt(token).username;
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

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};
