import React from 'react';
import {
  Navbar, Form, Button,
} from 'react-bootstrap';
import logo from '../logo.svg';

export default function Nav() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <img
          src={ logo }
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="logo"
        />{' '}
        Fifa.io
      </Navbar.Brand>
      { loginStatus() }
    </Navbar>
  );
}

function loginStatus() {
  const username = localStorage.getItem('username');

  if (username !== '') {
    return (
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: <b>{ username }</b>
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
