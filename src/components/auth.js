import React from 'react';
import {
  Form, Button, InputGroup, FormControl,
} from 'react-bootstrap';

export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.isLoggedIn = false;
    this.enterUsername = this.enterUsername.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this);
  }

  componentDidMount() {
    this.usernameInput.focus();
  }

  handleUsernameChange(event) {
    const username = event.target.value;
    this.setState({ username });
  }

  handleUsernameSubmit(event) {
    event.preventDefault();
    const { username } = this.state;
    localStorage.setItem('username', username);
  }

  enterUsername() {
    return (
      <div>
        <Form onSubmit={this.handleUsernameSubmit}>
          <InputGroup>
            <FormControl
              placeholder="Enter your alias here"
              aria-label="username"
              aria-describedby="text"
              onChange = { this.handleUsernameChange }
              ref={ (input) => { this.usernameInput = input; } }
            />
            <InputGroup.Append>
              <Button variant="dark" type="submit">
                Submit
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </div>
    );
  }

  render() {
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

function introInfo() {
  return (
    <div>
      <div>Hate the default lineup?</div>
      <div>
        Build custom teams <br />
        with your friends. <br />
      </div>
      <div>
        Create or join a room to start <br />
        custom draft with your friends <br />
      </div>
    </div>
  );
}
