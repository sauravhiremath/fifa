import React from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup, FormControl } from 'react-bootstrap';
import Button from 'react-uwp/Button';

export default class JoinRoom extends React.Component {
  state = {
    roomId: '',
    password: ''
  };

  static propTypes = {
    changeAuth: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.roomIdInput.focus();
  }

  handleDataChange = event => {
    const eventName = event.target.name;

    if (eventName === 'roomId') {
      const roomId = event.target.value;
      this.setState({ roomId });
    } else if (eventName === 'password') {
      const password = event.target.value;
      this.setState({ password });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const { roomId, password } = this.state;
    const { changeAuth } = this.props;
    changeAuth({ roomId, password });
  };

  render() {
    return (
      <div>
        <h2>Enter Room ID</h2>
        <div>
          <Form onSubmit={this.handleSubmit}>
            <InputGroup>
              <FormControl
                ref={input => {
                  this.roomIdInput = input;
                }}
                placeholder="Enter the RoomID here"
                aria-label="roomId"
                name="roomId"
                aria-describedby="text"
                onChange={this.handleDataChange}
              />
            </InputGroup>
            <br />
            Leave blank if no password
            <InputGroup>
              <FormControl
                placeholder="Enter room password"
                name="password"
                aria-label="password"
                aria-describedby="password"
                onChange={this.handleDataChange}
              />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroup.Append>
                <Button variant="light" type="submit">
                  Join
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </div>
      </div>
    );
  }
}
