import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListView from 'react-uwp/ListView';
import IconButton from 'react-uwp/IconButton';

import { SockerInit } from '../Socker/Socker';
import { initListeners } from '../Socker/init.Listeners';
import { socker } from '../Room/Room';

class JoinedPlayers extends React.Component {
  static contextTypes = { theme: PropTypes.object };

  static propTypes = {
    roomId: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    playersJoined: PropTypes.array.isRequired,
    showPlayers: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { roomId } = this.props;
    console.log('roomId is: ' + roomId);
    if (roomId) {
      socker.on('players-joined', data => {
        const { playersJoined } = data;
        this.props.showPlayers(playersJoined);
      });
    }
  }

  render() {
    const { theme } = this.context;
    const { playersJoined } = this.props;

    console.log(`[DEBUG] PLAYERS JOINED ARE: ${JSON.stringify(playersJoined)}`);

    return (
      <div>
        <ListView
          listSource={playersJoined.map((playerInfo, index) => (
            <div key={index}>
              <IconButton disabled style={{ margin: 10 }}>
                ContactLegacy
              </IconButton>
              {playerInfo.username} <br />
              {playerInfo.readyStatus ? 'READY' : 'NOT READY'}
            </div>
          ))}
        />
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    username: state.username,
    roomId: state.roomId,
    password: state.password
  };
};

export default connect(mapStateToProps)(JoinedPlayers);
