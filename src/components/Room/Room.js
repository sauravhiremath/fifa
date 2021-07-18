import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import HyperLink from 'react-uwp/HyperLink';

import ErrorHandler from '../ErrorHandler';
import Welcome from './Room.Welcome';
import JoinRoom from './Room.Join';
import CreateRoom from './Room.Create';
import { SockerInit } from '../Socker/Socker';
import { initListeners } from '../Socker/init.Listeners';
import { addRoomId, addPassword, addOptions } from '../../modules/action';
import { emit } from '../Socker/game.Emitters';

export let socker = undefined;

const Room = ({ username, roomId }) => {
  const [action, setAction] = useState('join');
  const [error, setError] = useState('');

  const handleAuth = data => {
    const { roomId, password, options } = data;
    // options -> only when action === 'create'
    socker = SockerInit(username, roomId, password, action, options);
    initListeners(this, socker);
  };

  const resetError = () => {
    setError('');
  };

  if (error) {
    emit.closeConnection();
    return <ErrorHandler redirectUrl="/" error={error} resetError={resetError} />;
  }

  if (!roomId) {
    return (
      <div className="p-3">
        <Welcome />
        <hr />
        <Row>
          <Col>{action === 'join' && <JoinRoom changeAuth={handleAuth} />}</Col>
          <Col>{action === 'create' && <CreateRoom changeAuth={handleAuth} />}</Col>
        </Row>
        <br />
        <HyperLink
          onClick={() =>
            setAction(prevAction => (prevAction === 'join' ? 'create' : 'join'))
          }
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
};

Room.propTypes = {
  username: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired
};

const mapStateToProps = function (state) {
  return {
    username: state.username,
    roomId: state.roomId,
    password: state.password,
    options: state.options
  };
};

const mapDispatchToProps = dispatch => ({
  addRoomId: roomId => dispatch(addRoomId({ roomId })),
  addPassword: password => dispatch(addPassword({ password })),
  addOptions: options => dispatch(addOptions({ options }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);
