import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = { passkey: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ passkey: event.target.passkey });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { passkey } = this.state;
    console.log(`A name was submitted: ${passkey}`);
  }

  render() {
    const { passkey } = this.state;

    return (
      <div>
        <h1> Create Room or Join Room </h1>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="room-password" />
          </InputGroup.Prepend>
          <FormControl
            placeholder="Password"
            aria-label="Password"
            aria-describedby="room-password"
            value={passkey}
            onChange={this.handleChange}
          />
        </InputGroup>
      </div>
    );
  }
}
