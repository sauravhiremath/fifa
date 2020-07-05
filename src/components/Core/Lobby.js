import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-uwp/Button';
import ContentDialog from 'react-uwp/ContentDialog';

import TeamPlayers from './TeamPlayers';
import PlayerSearch from './PlayerSearch';
import GroupChat from './GroupChat';
import JoinedPlayers from './JoinedPlayers';
import { emit } from '../Socker/game.Emitters';
import TurnTimer from './TurnTimer';

class Lobby extends React.Component {
  state = {
    warning: [false, undefined, undefined],
    isReady: false,
    isDraftReady: false,
    isTurn: false,
    chanceNum: 0,
    teamPlayers: [],
    playersJoined: [],
    currentItem: undefined,
    allCollections: {},
    currentCollectionId: 'current-user',
    currentUsername: ''
  };

  static contextTypes = { theme: PropTypes.object };

  static propTypes = {
    roomId: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
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
          disabled={!isTurn}
          onClick={() => {
            if (currentItem && teamPlayers.every(v => v.id !== currentItem.id)) {
              this.setState({ teamPlayers: [...teamPlayers, currentItem] });
              emit.playerTurnPass(currentItem);
            } else {
              return this.setState({
                warning: [
                  true,
                  'Duplicate Entry Found',
                  'This item has already been picked by you, choose another'
                ]
              });
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
    const { teamPlayers, allCollections, playersJoined } = this.state;
    const item = {
      id: newPlayer.objectID,
      name: newPlayer.name,
      position: newPlayer.positions,
      rating: newPlayer['Overall Rating']
    };
    const warning = warnIfDuplicateAcrossCollections(item, allCollections, playersJoined);
    if (warning) {
      return this.setState({ warning });
    }

    // TODO: This check shouldn't be necessary, the above
    //       check should handle all duplicate cases of all
    //       players. (Test and remove later)
    if (teamPlayers.every(v => v.id !== item.id)) {
      this.setState({
        currentItem: item
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

  showWarning = warning => {
    return (
      <ContentDialog
        showCloseButton
        defaultShow={warning[0]}
        primaryButtonText="OKAY, UNDERSTOOD"
        secondaryButtonText={null}
        title={warning[1]}
        content={warning[2]}
        onCloseDialog={() => this.setState({ warning: [false, undefined, undefined] })}
      />
    );
  };

  render() {
    const { roomId, password } = this.props;
    const {
      teamPlayers,
      playersJoined,
      isReady,
      chanceNum,
      currentUsername,
      isTurn,
      isDraftReady,
      allCollections,
      currentCollectionId,
      warning
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
          {this.showWarning(warning)}
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
          <br />
          {isTurn && <TurnTimer isTurn={isTurn} currentPlayer={currentUsername} />}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.username,
    roomId: state.roomId,
    password: state.password
  };
};

const warnIfDuplicateAcrossCollections = (item, collections, players) => {
  for (const sockerId in collections) {
    for (const eachItem of collections[sockerId]) {
      if (eachItem.id === item.id) {
        const { username } = players.filter(player => player.id === sockerId)[0];
        return [
          true,
          'Duplicate Entry Found!',
          `This item is already taken by ${username}`
        ];
      }
    }
  }
  return false;
};

export default connect(mapStateToProps)(Lobby);
