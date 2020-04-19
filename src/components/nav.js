import React from 'react';
import {
  Navbar, Form, Button,
} from 'react-bootstrap';
import logo from '../logo.svg';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
    this.loginStatus = this.loginStatus.bind(this);
  }

  loginStatus() {
    const { loggedIn } = this.state;

    if (loggedIn === true) {
      return (
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Sample Name</a>
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
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            src={ logo }
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="logo"
          />{' '}
          Fifa.io
        </Navbar.Brand>
        { this.loginStatus() }
      </Navbar>
    );
  }
}
