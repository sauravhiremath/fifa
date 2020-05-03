import React from 'react';
import HyperLink from 'react-uwp/HyperLink';

import Welcome from './Room.Welcome';
import JoinRoom from './Room.Join';
import CreateRoom from './Room.Create';
import Lobby from './Lobby';

export default class Room extends React.Component {
  state = {
    roomId: '',
    password: '',
    joinRoomDisplay: true,
    authSuccess: false
  };

  handleData = data => {
    Object.entries(data).forEach(([key, val]) => {
      this.setState({ [key]: val });
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { password } = this.state;
    console.log(`A name was submitted: ${password}`);
  };

  authSuccess = data => {
    if (data.success) {
      this.setState({ authSuccess: true });
    }
  };

  render() {
    const { roomId, password, authSuccess, joinRoomDisplay } = this.state;
    const username = localStorage.getItem('username');

    if (!authSuccess) {
      return (
        <div className="p-3">
          <Welcome username={username} />
          <hr />
          {joinRoomDisplay && (
            <JoinRoom
              roomId={roomId}
              password={password}
              authSuccess={this.authSuccess}
              handleChange={this.handleData}
            />
          )}
          {!joinRoomDisplay && (
            <CreateRoom
              roomId={roomId}
              password={password}
              authSuccess={this.authSuccess}
              handleChange={this.handleData}
            />
          )}
          <br />
          <HyperLink
            onClick={() => {
              this.setState({ joinRoomDisplay: !joinRoomDisplay });
            }}
          >
            Create New Room
          </HyperLink>
        </div>
      );
    }
    return <Lobby />;
  }
}
