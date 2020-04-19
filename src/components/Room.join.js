import React from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';

export default class JoinRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.roomIdInput.focus();
  }

  handleChange(event) {
    const eventName = event.target.name;
    if (eventName === 'roomId') {
      const roomId = event.target.value;
      this.setState({ roomId });
    } else if (eventName === 'password') {
      const password = event.target.value;
      this.setState({ password });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { roomId, password } = this.state;
    console.log(roomId, password);
  }

  render() {
    return (
      <div>
        <h2>Enter Room ID</h2>
        <div>
          <Form onSubmit={this.handleSubmit}>
            <InputGroup>
              <FormControl
                placeholder="Enter the RoomID here"
                aria-label="roomId"
                aria-describedby="text"
                ref={(input) => {
                  this.roomIdInput = input;
                }}
              />
              <FormControl
                placeholder="Enter room password"
                aria-label="password"
                aria-describedby="password"
              />
              <InputGroup.Append>
                <Button variant="light" type="submit">
                  Submit
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </div>
      </div>
    );
  }
}
