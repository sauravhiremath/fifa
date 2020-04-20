import React from 'react';
import { Button } from 'react-bootstrap';

import Welcome from './Room.Welcome';
import JoinRoom from './Room.Join';
import CreateRoom from './Room.Create';

export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: '',
      password: '',
      joinRoomDisplay: true,
      authSuccess: false,
    };
    this.handleData = this.handleData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.authSuccess = this.authSuccess.bind(this);
  }

  handleData(data) {
    Object.entries(data).forEach(([key, val]) => {
      this.setState({ [key]: val });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { password } = this.state;
    console.log(`A name was submitted: ${password}`);
  }

  authSuccess(data) {
    if (data.success) {
      this.setState({ authSuccess: true });
    }
  }

  render() {
    const {
      roomId, password, authSuccess, joinRoomDisplay,
    } = this.state;
    const username = localStorage.getItem('username');

    if (!authSuccess) {
      return (
        <div>
          <Welcome username={ username }/>
          <hr />
          { joinRoomDisplay
            && <JoinRoom
                  roomId={ roomId }
                  password={ password }
                  authSuccess={ this.authSuccess }
                  handleChange={ this.handleData }
                />
          }
          { !joinRoomDisplay
            && <CreateRoom
                  roomId={ roomId }
                  password={ password }
                  authSuccess={ this.authSuccess }
                  handleChange={ this.handleData }
                />
          }
          <Button variant="link" onClick={ () => { this.setState({ joinRoomDisplay: !joinRoomDisplay }); }}>new Room Creation</Button>
        </div>
      );
    }
    return (
      <div>Entered successfully with AuthSuccess as { authSuccess }</div>
    );
  }
}
