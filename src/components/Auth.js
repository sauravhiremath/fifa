import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import { Form, InputGroup, FormControl } from 'react-bootstrap';
import Button from 'react-uwp/Button';
import ErrorHandler from './ErrorHandler';

export default class Auth extends React.Component {
  state = { username: '', redirectToReferrer: false };

  static propTypes = {
    location: PropTypes.object.isRequired,
    changeAuth: PropTypes.func.isRequired
  };

  componentDidMount() {
    const cookie = Cookies.get('fifa-profile');
    if (cookie) {
      this.setState({ redirectToReferrer: true });
    }
  }

  componentDidMount = () => {
    this.usernameInput.focus();
  };

  handleUsernameChange = event => {
    const username = event.target.value;
    this.setState({ username });
  };

  login = async event => {
    // Send login request here. True only when 200 status from server
    event.preventDefault();
    const { username } = this.state;
    const { changeAuth } = this.props;

    const response = await axios.post('http://localhost:3003/auth/login', { username });
    if (!response || !response.data.success) {
      return (
        <ErrorHandler
          redirectUrl="/"
          error={{ title: 'AUTH FAILED, TRY AGAIN!', content: response.message }}
        />
      );
    }
    Cookies.set('fifa-profile', response.data.token);
    changeAuth({ success: true });
    this.setState({ redirectToReferrer: true });
  };

  enterUsername() {
    return (
      <div>
        <Form onSubmit={this.login}>
          <InputGroup>
            <FormControl
              ref={input => {
                this.usernameInput = input;
              }}
              placeholder="Enter your alias here"
              name="username"
              aria-label="username"
              aria-describedby="text"
              onChange={this.handleUsernameChange}
            />
            <InputGroup.Append>
              <Button>Submit</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </div>
    );
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <div className="row align-items-center justify-content-left">
        <div className="col-sm-12 col-md-6">
          {introInfo()}
          {this.enterUsername()}
        </div>
      </div>
    );
  }
}

const introInfo = () => {
  return (
    <div>
      <div>Hate the default lineup?</div>
      <div>
        Build custom teams <br /> with your friends. <br />
      </div>
      <div>
        Create or join a room to start <br /> custom draft with your friends <br />
      </div>
    </div>
  );
};
