import React from 'react';
import PropTypes from 'prop-types';
import HyperLink from 'react-uwp/HyperLink';

import Welcome from './Room.Welcome';
import JoinRoom from './Room.Join';
import CreateRoom from './Room.Create';
import Lobby from '../Core/Lobby';

export default class Room extends React.Component {
  state = {
    roomId: '',
    password: '',
    joinRoomDisplay: true
  };

  static propTypes = {
    username: PropTypes.string.isRequired,
    route: PropTypes.node.isRequired
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

  handleAuth = data => {
    const { changeAuth } = this.props;
    if (data.success) {
      changeAuth({ success: true });
    }
  };

  render() {
    const { roomId, password, joinRoomDisplay } = this.state;
    const { isAuth } = this.props.route;
    const username = localStorage.getItem('username');

    if (!isAuth) {
      return (
        <div className="p-3">
          <Welcome username={username} />
          <hr />
          {joinRoomDisplay && (
            <JoinRoom roomId={roomId} password={password} changeAuth={this.handleAuth} handleChange={this.handleData} />
          )}
          {!joinRoomDisplay && (
            <CreateRoom
              roomId={roomId}
              password={password}
              changeAuth={this.handleAuth}
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
    return <Lobby username={this.props.username} action={joinRoomDisplay ? 'join' : 'create'} />;
  }
}
