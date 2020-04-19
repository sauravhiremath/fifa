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
        { welcomeMessage() }
      </div>
    );
  }
}
