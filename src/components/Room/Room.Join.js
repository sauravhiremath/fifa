import React from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup, FormControl } from 'react-bootstrap';
import Button from 'react-uwp/Button';

export default class JoinRoom extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    roomId: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    changeAuth: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.roomIdInput.focus();
  }

  handleDataChange = (event) => {
    const eventName = event.target.name;
    const { handleChange } = this.props;

    if (eventName === 'roomId') {
      const roomId = event.target.value;
      handleChange({ roomId });
      // this.setState({ roomId });
    } else if (eventName === 'password') {
      const password = event.target.value;
      handleChange({ password });
      // this.setState({ password });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { roomId, password, changeAuth } = this.props;
    console.log('roomId and password are', roomId, password);
    changeAuth({ success: true }); // This is done only if 200 status code from server
  }

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
