import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row, Table } from 'react-bootstrap';

import PlayerSearch from './PlayerSearch';
import GroupChat from './GroupChat';
import JoinedPlayers from './JoinedPlayers';
import { Redirect } from 'react-router-dom';

class Lobby extends React.Component {
  state = {
    teamPlayers: [],
    playersJoined: []
  };

  static contextTypes = { theme: PropTypes.object };

  static propTypes = {
    roomId: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  };

  handleNewRowSubmit = newPlayer => {
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

  teamPlayers = () => {
    const { teamPlayers } = this.state;
    const { username } = this.props;
    console.log(`${username} --> Team is: ${teamPlayers}`);

    return teamPlayers.map((player, index) => {
      if (player) {
        const { id, name, position, rating } = player;
        return (
          <tr key={id}>
            <td>{index + 1}</td>
            <td>{position}</td>
            <td>{name}</td>
            <td>{rating}</td>
          </tr>
        );
      }
    });
  };

  showPlayers = playersJoined => {
    this.setState({ playersJoined });
  };

  render() {
    const { roomId, password } = this.props;
    const { playersJoined } = this.state;
    const { theme } = this.context;

    if (!roomId) {
      return <Redirect to="/" />;
    }

    return (
      <Row className="mh-100 no-gutters">
        {roomId && (
          <Col
            lg={3}
            md={6}
            style={{
              background: theme.useFluentDesign
                ? theme.acrylicTexture80.background
                : 'none'
            }}
          >
            <div className="myTeamBox">
              <Table
                striped
                borderless
                hover
                variant="dark"
                id="team_players"
                style={{ background: theme.accentDarker2 }}
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Pos</th>
                    <th>Name</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>{this.teamPlayers()}</tbody>
              </Table>
            </div>
            <JoinedPlayers playersJoined={playersJoined} showPlayers={this.showPlayers} />
          </Col>
        )}
        {roomId && (
          <Col
            style={{
              background: theme.useFluentDesign
                ? theme.acrylicTexture80.background
                : 'none'
            }}
          >
            <PlayerSearch
              addPlayer={this.handleNewRowSubmit}
              style={{ background: theme.accentDarker2 }}
              hoverStyle={{
                background: theme.altMedium
              }}
            />
          </Col>
        )}
        {roomId && (
          <Col lg={3} md={6}>
            <GroupChat />
          </Col>
        )}
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
