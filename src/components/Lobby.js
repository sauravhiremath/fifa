import React from 'react';
import * as PropTypes from 'prop-types';
import { Col, Row, Table, Button } from 'react-bootstrap';
import Searchbar from './SearchBar';
import ListView from 'react-uwp/ListView';
import Theme, { getTheme } from 'react-uwp/Theme';

import mockPlayers from '../tests/playersFill.test';

export default class Lobby extends React.Component {
  state = {
    playersSelected: []
  };

  static contextTypes = { theme: PropTypes.object, enableNoiseTexture: true };

  handleNewRowSubmit = newPlayer => {
    const { playersSelected } = this.state;
    const playerInfo = {
      id: newPlayer.objectID,
      name: newPlayer.name,
      position: newPlayer.positions,
      rating: newPlayer['Overall Rating']
    };
    if (playersSelected.every(v => v.id !== playerInfo.id)) {
      this.setState({ playersSelected: [...playersSelected, playerInfo] });
    } else {
      console.log('Player already added!');
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
    const { theme } = this.context;

    return (
      <Row className="mh-100 no-gutters">
        <Col lg={3} md={6} style={{ background: theme.useFluentDesign ? theme.acrylicTexture80.background : 'none' }}>
          <div className="TeamBox">
            <Table
              striped
              borderless
              hover
              variant="dark"
              id="team_players"
              style={{ background: theme.accentDarker2 }}
              hoverStyle={{
                background: theme.altMedium
              }}
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
        <Col lg={3} md={6}>
          <h1>Chat box here soon</h1>
        </Col>
        <Col style={{ background: theme.useFluentDesign ? theme.acrylicTexture80.background : 'none' }}>
          <Searchbar
            addPlayer={this.handleNewRowSubmit}
            style={{ background: theme.accentDarker2 }}
            hoverStyle={{
              background: theme.altMedium
            }}
          />
        </Col>
      </Row>
    );
  }
}
