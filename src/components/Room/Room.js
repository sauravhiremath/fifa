import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import HyperLink from 'react-uwp/HyperLink';

import Welcome from './Room.Welcome';
import JoinRoom from './Room.Join';
import CreateRoom from './Room.Create';
import Lobby from '../Core/Lobby';

export default class Room extends React.Component {
  state = {
    roomId: '',
    password: '',
    action: 'join',
    isAuth: false
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
    // Only when recieved 200 from server for ROOM Authentication
    const { isAuth } = this.state;
    if (data.success) {
      this.setState({
        isAuth: true
      });
    }
  };

  render() {
    const { roomId, password, action, isAuth } = this.state;
    const username = localStorage.getItem('username');

    if (!isAuth) {
      return (
        <div className="p-3">
          <Welcome username={username} />
          <hr />
          {action === 'join' && (
            <JoinRoom
              roomId={roomId}
              password={password}
              changeAuth={this.handleAuth}
              handleChange={this.handleData}
            />
          )}
          {action === 'create' && (
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
              this.setState(prevState => ({
                action: prevState.action === 'join' ? 'create' : 'join'
              }));
            }}
          >
            {`${action === 'join' ? 'Create New' : 'Join'} Room`}
          </HyperLink>
        </div>
      );
    }

    return (
      <Router>
        <Switch>
          <Route
            path="/room"
            render={props => (
              <Lobby
                {...props}
                roomInfo={{ roomId, password }}
                username={username}
                action={action}
              />
            )}
          />
          <Redirect
            push
            to={{
              pathname: '/room',
              search: `?=${roomId}`,
              state: { referrer: '/' }
            }}
          />
        </Switch>
      </Router>
    );
  }
}
