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
    onPlayerJoin: PropTypes.func.isRequired,
    changeCollectionTo: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    subscribeTo.showPlayers((err, playersJoined) =>
      this.props.onPlayerJoin(playersJoined)
    );
  }

  render() {
    const { theme } = this.context;
    const { playersJoined, changeCollectionTo } = this.props;

    console.log(`[DEBUG] PLAYERS JOINED ARE: ${JSON.stringify(playersJoined)}`);

    return (
      <div style={{ overflowY: 'scroll', overflowX: 'hidden' }}>
        <ListView
          listSource={playersJoined.map((playerInfo, index) => (
            <div
              key={playerInfo.id}
              onClick={() => {
                changeCollectionTo(playerInfo.id);
              }}
            >
              <IconButton disabled style={{ margin: 10 }}>
                ContactLegacy
              </IconButton>
              {playerInfo.username} <br />
              {playerInfo.isReady ? 'READY' : 'NOT READY'}
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
