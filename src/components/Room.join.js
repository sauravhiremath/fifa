import React from 'react';
import {
  Form, InputGroup, FormControl, Button,
} from 'react-bootstrap';

export default class JoinRoom extends React.Component {
  constructor(props) {
    super(props);

    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.roomIdInput.focus();
  }

  handleDataChange(event) {
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

  handleSubmit(event) {
    event.preventDefault();
    const { roomId, password, authSuccess } = this.props;
    console.log('roomId and password are', roomId, password);
    authSuccess({ success: true }); // This is done only if 200 from server
  }

  render() {
    return (
      <div>
        <h2>Enter Room ID</h2>
        <div>
          <Form onSubmit={ this.handleSubmit }>
            <InputGroup>
              <FormControl
                placeholder="Enter the RoomID here"
                aria-label="roomId"
                name="roomId"
                aria-describedby="text"
                onChange={ this.handleDataChange }
                ref={(input) => {
                  this.roomIdInput = input;
                }}
              />
              <FormControl
                placeholder="Enter room password"
                name="password"
                aria-label="password"
                aria-describedby="password"
                onChange={ this.handleDataChange }
              />
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
