import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Table } from 'react-bootstrap';
import PlayerSearch from './PlayerSearch';
import GroupChat from './GroupChat';
import { SockerInit } from '../Socker';
import ErrorHandler from './ErrorHandler';

export default class Lobby extends React.Component {
  state = {
    playersSelected: [],
    errorTitle: 'Unknown Error',
    errorContent: 'Unknown Error'
  };

  static contextTypes = { theme: PropTypes.object };

  static propTypes = {
    roomInfo: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    const socker = SockerInit(this.props.username, this.props.action);

    socker.on('Error: Create a room first!', () => {
      console.log('Error: Create a room first!');
      this.setState({
        errorTitle: 'ROOM NOT FOUND',
        errorContent: 'Error: Create a new Room or enter the correct ROOM ID'
      });
    });

    socker.on('Error: Room already created. Join the room!', () => {
      console.log('Error: Create a new room again or Join existing one!');
      this.setState({
        errorTitle: 'ROOM ALREADY PRESENT',
        errorContent: 'Error: Join the existing room or Create a new room again'
      });
    });
  }

  handleNewRowSubmit = newPlayer => {
    const { playersSelected } = this.state;
    const playerInfo = {
      id: newPlayer.objectID,
      name: newPlayer.name,
      position: newPlayer.positions,
      rating: newPlayer['Overall Rating']
    };
    if (playersSelected.every(v => v.id !== playerInfo.id)) {
      return this.setState({ playersSelected: [...playersSelected, playerInfo] });
    } else {
      return console.log('Player already added!');
    }
  };

  renderPlayerNames = () => {
    const { playersSelected } = this.state;
    console.log(playersSelected);

    return playersSelected.map((player, index) => {
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

  render() {
    const { errorTitle, errorContent } = this.state;
    const { roomId, password } = this.props.roomInfo;
    const { theme } = this.context;

    if (errorTitle || errorContent) {
      return (
        <ErrorHandler
          redirectUrl="/"
          error={{
            topic: 'ROOM ALREADY PRESENT',
            content: 'Error: Create a new room again or Join existing one!'
          }}
        />
      );
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
              <tbody>{this.renderPlayerNames()}</tbody>
            </Table>
          </div>
        </Col>
        <Col
          style={{
            background: theme.useFluentDesign ? theme.acrylicTexture80.background : 'none'
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
        <Col lg={3} md={6}>
          <GroupChat />
        </Col>
      </Row>
    );
  }
}
