import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import Button from 'react-uwp/Button';

// TODO: Add Successfull creation of room authSuccess -> true
export default class Create extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    roomId: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    changeAuth: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.getNewRoomId();
  }

  componentDidMount() {
    this.roomIdInput.focus();
  }

  handleDataChange = event => {
    const { handleChange } = this.props;
    if (event.target.name === 'password') {
      const password = event.target.value;
      handleChange({ password });
      // this.setState({ password });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const { roomId, password, changeAuth } = this.props;
    console.log(roomId, password);
    changeAuth({ success: true }); // This is done only if 200 from server
  };

  getNewRoomId = () => {
    const { roomId, handleChange } = this.props;
    if (!roomId) {
      const roomId = generateRoomId(5);
      handleChange({ roomId });
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
