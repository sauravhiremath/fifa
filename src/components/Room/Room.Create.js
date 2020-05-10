import React from 'react';
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

    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getNewRoomId = this.getNewRoomId.bind(this);
  }

  componentDidMount() {
    this.roomIdInput.focus();
  }

  handleDataChange(event) {
    const { handleChange } = this.props;
    if (event.target.name === 'password') {
      const password = event.target.value;
      handleChange({ password });
      // this.setState({ password });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { roomId, password, changeAuth } = this.props;
    console.log(roomId, password);
    changeAuth({ success: true }); // This is done only if 200 from server
  }

  getNewRoomId() {
    const { handleChange } = this.props;
    const roomId = generateRoomId();
    handleChange({ roomId });
  }

  render() {
    const { roomId } = this.props;

    return (
      <div>
        <h2>Room ID</h2>
        <Form onSubmit={this.handleSubmit}>
          <InputGroup>
            <FormControl readOnly name="roomId" value={roomId} aria-label="roomId" aria-describedby="text" />
            <FormControl
              ref={input => {
                this.roomIdInput = input;
              }}
              placeholder="Enter room password"
              name="password"
              aria-label="password"
              aria-describedby="password"
              onChange={this.handleDataChange}
            />
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

function generateRoomId() {
  const roomId = '#A8HDG';
  return roomId;
}
