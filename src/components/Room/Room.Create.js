import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import Button from 'react-uwp/Button';

// TODO: Add Successfull creation of room authSuccess -> true
export default class Create extends React.Component {
  state = {
    roomId: '',
    password: ''
  };

  static propTypes = {
    changeAuth: PropTypes.func.isRequired,
    roomId: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.getNewRoomId();
  }

  componentDidMount() {
    this.roomIdInput.focus();
  }

  handleDataChange = event => {
    if (event.target.name === 'password') {
      const password = event.target.value;
      this.setState({ password });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const { changeAuth } = this.props;
    const { roomId, password } = this.state;
    changeAuth({ roomId, password });
  };

  getNewRoomId = () => {
    const { roomId } = this.state;
    if (!roomId) {
      const newRoomId = generateRoomId(5);
      this.setState({ roomId: newRoomId });
    }
  };

  render() {
    const { roomId } = this.props;

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
          Add password to keep it exclusive
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
