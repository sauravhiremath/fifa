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
    joinedPlayers: PropTypes.array.isRequired,
    showPlayers: PropTypes.func.isRequired
  };

  componentDidUpdate() {
    socker.on('joined-players', (joinedPlayers) => {
      console.log('Players joined');
      this.props.showPlayers(joinedPlayers);
    });
  }

  render() {
    const { theme } = this.context;
    const { joinedPlayers } = this.props;

    console.log(JSON.stringify(joinedPlayers));

    return (
      <div>
        <ListView
          listSource={joinedPlayers.map((player, index) => (
            <div key={index}>
              <IconButton disabled style={{ margin: 10 }}>
                ContactLegacy
              </IconButton>
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
