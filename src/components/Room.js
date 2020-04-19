import React from 'react';
import Welcome from './Room.Welcome';
import JoinRoom from './Room.join';

export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: '',
      password: '',
      createNew: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleChange.bind(this);
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
    const { roomId, password, createNew } = this.state;
    const username = localStorage.getItem('username');

    return (
      <div>
        <Welcome username={ username }/>
        <hr />
        <JoinRoom roomId={ roomId } passkey={ password }/>
      </div>
    );
  }
}
