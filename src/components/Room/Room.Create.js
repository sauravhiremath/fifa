import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import Button from 'react-uwp/Button';

// TODO: Add Successfull creation of room authSuccess -> true
export default class Create extends React.Component {
  state = {
    roomId: '',
    password: '',
    options: {
      maxTimerLimit: 120,
      maxPlayersLimit: 14
    }
  };

  static propTypes = {
    changeAuth: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.roomIdInput.focus();
    this.getNewRoomId();
  }

  handleDataChange = event => {
    if (event.target.name === 'password') {
      const password = event.target.value;
      this.setState({ password });
    }
    if (event.target.name === 'max-timer-limit') {
      const maxTimerLimit = event.target.value;
      if (maxTimerLimit > 0 && typeof maxTimerLimit === 'number') {
        this.setState({ options: { ...maxTimerLimit } });
      }
    }
    if (event.target.name === 'max-players-limit') {
      const maxPlayersLimit = event.target.value;
      if (maxPlayersLimit > 0 && typeof maxPlayersLimit === 'number') {
        this.setState({ options: { ...maxPlayersLimit } });
      }
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const { changeAuth } = this.props;
    const { roomId, password, options } = this.state;
    changeAuth({ roomId, password, options });
  };

  getNewRoomId = () => {
    const { roomId } = this.state;
    if (!roomId) {
      const newRoomId = generateRoomId(5);
      this.setState({ roomId: newRoomId });
    }
  };

  render() {
    const { roomId } = this.state;

    return (
      <div>
        <h2>Create New Room</h2>
        <Form onSubmit={this.handleSubmit}>
          <InputGroup>
            <FormControl
              readOnly
              name="roomId"
              value={roomId}
              aria-label="roomId"
              aria-describedby="text"
            />
          </InputGroup>
          <br />
          <h6>Add password to keep it exclusive</h6>
          <InputGroup>
            <FormControl
              ref={input => {
                this.roomIdInput = input;
              }}
              placeholder="Optional: Enter room password"
              name="password"
              aria-label="password"
              aria-describedby="password"
              onChange={this.handleDataChange}
            />
          </InputGroup>
          <br />
          <br />
          <h4>Game Settings</h4>
          <br />
          <h6>Max Time per chance </h6>
          <InputGroup>
            <FormControl
              type="number"
              placeholder="Default: 120"
              name="max-timer-limit"
              aria-label="max-timer-limit"
              aria-describedby="max-timer-limit"
              onChange={this.handleDataChange}
            />
            <InputGroup.Append>
              <InputGroup.Text id="time-prefiz">seconds</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          <br />
          <h6>Max Players Per Team</h6>
          <InputGroup>
            <FormControl
              type="number"
              placeholder="Default: 14"
              name="max-players-limit"
              aria-label="max-players-limit"
              aria-describedby="max-players-limit"
              onChange={this.handleDataChange}
            />
            <InputGroup.Append>
              <InputGroup.Text id="time-prefiz">players</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroup.Append>
              <Button variant="light" type="submit">
                Create
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </div>
    );
  }
}

function generateRoomId(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
