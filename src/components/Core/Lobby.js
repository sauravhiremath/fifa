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
    isReady: false,
    isDraftReady: false,
    isTurn: false,
    teamPlayers: [],
    playersJoined: [],
    currentItem: undefined,
    allCollections: [],
    currentCollectionId: 'current-user'
  };

  static contextTypes = { theme: PropTypes.object };

  static propTypes = {
    roomId: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  };

  preDraft = () => {
    const { isReady } = this.state;
    const message = isReady ? 'WAITING FOR OTHERS...' : 'YOU READY?';

    return (
      <Button
        tooltip="Marks you ready for the draft"
        style={{ fontSize: 32, margin: 4 }}
        disabled={isReady}
        onClick={() => {
          emit.startDraft();
          this.setState({ isReady: true });
        }}
      >
        {message}
      </Button>
    );
  };

  onDraft = () => {
    const { currentItem, isTurn, teamPlayers } = this.state;

    // TODO: Make `itemCollection` as Set()
    return (
      <div>
        <Button
          tooltip="I confirm selection"
          style={{ fontSize: 16, margin: 4 }}
          disabled={!isTurn} // TODO: mark as true when `not my chance`
          onClick={() => {
            if (currentItem && teamPlayers.every(v => v.id !== currentItem.id)) {
              this.setState({ teamPlayers: [...teamPlayers, currentItem] });
              emit.playerTurnPass(currentItem);
            }
          }}
        >
          <div>
            <span style={{ fontSize: 24 }}>
              CONFIRM SELECTION <br />
            </span>
            <span style={{ overflowX: 'scroll' }}>
              Name: {currentItem?.name} <br />
              Rating: {currentItem?.rating} <br />
              Position: {currentItem?.position}
            </span>
          </div>
        </Button>
      </div>
    );
  };

  updateCurrentItem = newPlayer => {
    const { teamPlayers } = this.state;
    const playerInfo = {
      id: newPlayer.objectID,
      name: newPlayer.name,
      position: newPlayer.positions,
      rating: newPlayer['Overall Rating']
    };
    if (teamPlayers.every(v => v.id !== playerInfo.id)) {
      return this.setState({
        currentItem: playerInfo
      });
    } else {
      return console.log('Player already added!');
    }
  };

  updatePlayers = playersJoined => {
    this.setState({ playersJoined });
  };

  switchCollection = playerId => {
    this.setState({ currentCollectionId: playerId });
  };

  setStates = states => {
    return states.forEach(state => {
      this.setState({ ...state });
    });
  };

  render() {
    const { roomId, password } = this.props;
    const {
      teamPlayers,
      playersJoined,
      isReady,
      isDraftReady,
      allCollections,
      currentCollectionId
    } = this.state;
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
          {!isDraftReady && this.preDraft()}
          {isDraftReady && this.onDraft()}
          {isDraftReady && (
            <TeamPlayers
              allCollections={allCollections}
              collectionId={currentCollectionId}
              teamPlayers={teamPlayers}
            />
          )}
          <JoinedPlayers
            playersJoined={playersJoined}
            changeCollectionTo={this.switchCollection}
            onPlayerJoin={this.updatePlayers}
          />
        </Col>
        <Col
          style={{
            background: theme.useFluentDesign ? theme.acrylicTexture80.background : 'none'
          }}
        >
          <PlayerSearch
            updateCurrentItem={this.updateCurrentItem}
            isDraftReady={isDraftReady}
            style={{ background: theme.accentDarker2 }}
            hoverStyle={{
              background: theme.altMedium
            }}
          />
        </Col>
        <Col lg={3} md={6}>
          <GroupChat setParentStates={this.setStates} />
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
