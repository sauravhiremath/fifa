import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { Form, InputGroup, FormControl } from 'react-bootstrap';
import Button from 'react-uwp/Button';
import ErrorHandler from './Core/ErrorHandler';

export default class Auth extends React.Component {
  state = { redirectToReferrer: false };

  constructor(props) {
    super(props);
    this.enterUsername = this.enterUsername.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  static propTypes = {
    location: PropTypes.object.isRequired,
    changeAuth: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.usernameInput.focus();
  }

  handleUsernameChange(event) {
    const username = event.target.value;
    this.setState({ username });
  }

  login = async event => {
    // Send login request here. True only when 200 status from server
    event.preventDefault();
    const { username } = this.state;
    const { changeAuth } = this.props;

    const response = await axios.post('http://localhost:3003/auth/login', { username });
    if (!response || !response.success) {
      return (
        <ErrorHandler
          redirectUrl="/"
          error={{ title: 'NO ROOM FOUND', content: response.message }}
        />
      );
    }
    localStorage.setItem('token', response.token);
    changeAuth({ success: true });
    return this.setState({
      redirectToReferrer: true
    });
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
