import React from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import HyperLink from 'react-uwp/HyperLink';

import Welcome from './Room.Welcome';
import JoinRoom from './Room.Join';
import CreateRoom from './Room.Create';
import Lobby from '../Core/Lobby';
import { SockerInit } from '../Socker/Socker';
import { initListeners } from '../Socker/listeners';

export let socker = undefined;

export default class Room extends React.Component {
  state = {
    username: '',
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

  handleAuth = data => {
    // Only when recieved 200 from server for ROOM Authentication
    const token = Cookies.get('fifa-profile');
    this.setState({ username: parseJwt(token).username });
    const { username, roomId, action } = this.state;
    socker = SockerInit(username, roomId, action);
    initListeners(this, socker);
  };

  render() {
    const { username, roomId, password, action, isAuth } = this.state;

    if (!isAuth) {
      return (
        <div className="p-3">
          <Welcome />
          <hr />
          <Row>
            <Col>
              {action === 'join' && (
                <JoinRoom
                  roomId={roomId}
                  password={password}
                  changeAuth={this.handleAuth}
                  handleChange={this.handleData}
                />
              )}
            </Col>
            <Col>
              {action === 'create' && (
                <CreateRoom
                  roomId={roomId}
                  password={password}
                  changeAuth={this.handleAuth}
                  handleChange={this.handleData}
                />
              )}
            </Col>
          </Row>
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

const parseJwt = token => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};
