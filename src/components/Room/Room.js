import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import HyperLink from 'react-uwp/HyperLink';

import ErrorHandler from '../ErrorHandler';
import Welcome from './Room.Welcome';
import JoinRoom from './Room.Join';
import CreateRoom from './Room.Create';
import { SockerInit } from '../Socker/Socker';
import { initListeners } from '../Socker/listeners';
import { addRoomId, addPassword } from '../../modules/action';

export let socker = undefined;

class Room extends React.Component {
  state = {
    action: 'join',
    error: {}
  };

  handleAuth = data => {
    const { username } = this.props;
    const { action } = this.state;
    const { roomId, password } = data;
    socker = SockerInit(username, roomId, password, action);
    initListeners(this, roomId, socker);
  };

  render() {
    const { action, error } = this.state;
    const { roomId } = this.props;

    // if (error) {
    //   return (
    //     <ErrorHandler
    //       redirectUrl="/"
    //       error={{ ...error }}
    //     />
    //   );
    // }

    if (!roomId) {
      return (
        <div className="p-3">
          <Welcome />
          <hr />
          <Row>
            <Col>{action === 'join' && <JoinRoom changeAuth={this.handleAuth} />}</Col>
            <Col>
              {action === 'create' && <CreateRoom changeAuth={this.handleAuth} />}
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
      <Redirect
        push
        to={{
          pathname: '/room',
          search: `?=${roomId}`,
          state: { referrer: '/' }
        }}
      />
    );
  }
}

const mapStateToProps = function (state) {
  return {
    auth: state.auth,
    username: state.username,
    roomId: state.roomId,
    password: state.password
  };
};

const mapDispatchToProps = dispatch => ({
  addRoomId: roomId => dispatch(addRoomId({ roomId })),
  addPassword: password => dispatch(addPassword({ password }))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Room));
