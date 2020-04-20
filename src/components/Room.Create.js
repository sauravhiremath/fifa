import React from 'react';
import {
  Form, FormControl, InputGroup, Button,
} from 'react-bootstrap';

// TODO: Add Successfull creation of room authSuccess -> true
export default class Create extends React.Component {
  constructor(props) {
    super(props);

    this.renderNewRoomId();

    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderNewRoomId = this.renderNewRoomId.bind(this);
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
    const { roomId, password } = this.props;
    console.log(roomId, password);
  }

  renderNewRoomId() {
    const { handleChange } = this.props;
    const roomId = fetchRoomId();
    handleChange({ roomId });
  }

  render() {
    const {
      roomId, authSuccess,
    } = this.props;

    return (
      <div>
        <h2>Room ID</h2>
        <Form onSubmit={this.handleSubmit}>
            <InputGroup>
              <FormControl
                name="roomId"
                value={ roomId }
                aria-label="roomId"
                aria-describedby="text"
                readOnly
              />
              <FormControl
                placeholder="Enter room password"
                name="password"
                aria-label="password"
                aria-describedby="password"
                onChange={ this.handleDataChange }
                ref={(input) => {
                  this.roomIdInput = input;
                }}
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

function fetchRoomId() {
  const roomId = '#A8HDG';
  return roomId;
}
