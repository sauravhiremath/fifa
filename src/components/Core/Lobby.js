import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-uwp/Button';

import TeamPlayers from './TeamPlayers';
import PlayerSearch from './PlayerSearch';
import GroupChat from './GroupChat';
import JoinedPlayers from './JoinedPlayers';
import { emit } from '../Socker/game.Emitters';

class Lobby extends React.Component {
  state = {
    readyStatus: false,
    draftReadyStatus: false,
    teamPlayers: [],
    playersJoined: []
  };

  static contextTypes = { theme: PropTypes.object };

  static propTypes = {
    roomId: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  };

  preDraft = () => {
    const { readyStatus } = this.state;
    const message = readyStatus ? 'WAITING FOR OTHERS...' : 'YOU READY?';

    return (
      <div>
        <Button
          tooltip="Marks you ready for the draft"
          style={{ fontSize: 32, margin: 4 }}
          disabled={{ readyStatus } ? false : true}
          onClick={() => {
            emit.startDraft();
            this.setState({ readyStatus: true });
          }}
        >
          {message}
        </Button>

        <Button
          tooltip="Marks you ready for the draft"
          style={{ fontSize: 32, margin: 4 }}
          disabled={{ readyStatus } ? false : true}
          onClick={() => {
            emit.playerTurnPass();
            this.setState({ readyStatus: true });
          }}
        >
          NEXT TURN
        </Button>
      </div>
    );
  };

  handleNewTeamPlayer = newPlayer => {
    const { teamPlayers } = this.state;
    const playerInfo = {
      id: newPlayer.objectID,
      name: newPlayer.name,
      position: newPlayer.positions,
      rating: newPlayer['Overall Rating']
    };
    if (teamPlayers.every(v => v.id !== playerInfo.id)) {
      return this.setState({ teamPlayers: [...teamPlayers, playerInfo] });
    } else {
      return console.log('Player already added!');
    }
  };

  showPlayers = playersJoined => {
    this.setState({ playersJoined });
  };

  render() {
    const { roomId, password } = this.props;
    const { teamPlayers, playersJoined, readyStatus, draftReadyStatus } = this.state;
    const { theme } = this.context;

    if (!roomId) {
      return <Redirect to="/" />;
    }

    return (
      <Row className="mh-100 no-gutters">
        <Col
          lg={3}
          md={6}
          style={{
            background: theme.useFluentDesign ? theme.acrylicTexture80.background : 'none'
          }}
        >
          {!draftReadyStatus && this.preDraft()}
          {draftReadyStatus && <TeamPlayers teamPlayers={teamPlayers} />}
          <JoinedPlayers playersJoined={playersJoined} showPlayers={this.showPlayers} />
        </Col>
        <Col
          style={{
            background: theme.useFluentDesign ? theme.acrylicTexture80.background : 'none'
          }}
        >
          <PlayerSearch
            addPlayer={this.handleNewTeamPlayer}
            style={{ background: theme.accentDarker2 }}
            hoverStyle={{
              background: theme.altMedium
            }}
          />
        </Col>
        <Col lg={3} md={6}>
          <GroupChat />
        </Col>
      </Row>
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

export default connect(mapStateToProps)(Lobby);
