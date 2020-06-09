import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListView from 'react-uwp/ListView';
import IconButton from 'react-uwp/IconButton';

import { subscribeTo } from '../Socker/game.Subscriptions';

class JoinedPlayers extends React.Component {
  static contextTypes = { theme: PropTypes.object };

  static propTypes = {
    playersJoined: PropTypes.array.isRequired,
    showPlayers: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    subscribeTo.showPlayers((err, playersJoined) =>
      this.props.showPlayers(playersJoined)
    );
  }

  render() {
    const { theme } = this.context;
    const { playersJoined } = this.props;

    console.log(`[DEBUG] PLAYERS JOINED ARE: ${JSON.stringify(playersJoined)}`);

    return (
      <div>
        <ListView
          listSource={playersJoined.map((playerInfo, index) => (
            <div key={playerInfo.id}>
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
