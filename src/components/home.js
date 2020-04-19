import React from 'react';
import Auth from './auth';
import Room from './Room';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      roomId: '',
      password: '',
      verified: false,
    };
    this.setUsername = this.setUsername.bind(this);
  }

  setUsername() {
    const username = localStorage.getItem('username');
    if (username) {
      this.setState({ username });
    }
  }

  render() {
    this.setUsername();
    const { username, roomId, password } = this.state;

    if (username) {
      return (<Room/>);
    }
    return (<Auth />);
  }
}
