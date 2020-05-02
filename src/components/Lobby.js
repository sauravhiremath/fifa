import React from 'react';
import { Col, Row, Table, Button } from 'react-bootstrap';
import Searchbar from './SearchBar';

import mockPlayers from '../tests/playersFill.test';

export default class Lobby extends React.Component {
  state = {
    playersSelected: mockPlayers
  };

  addPlayers = () => {
    // Add player names will fill data for testing
    console.log(mockPlayers);
    this.setState({
      playersSelected: mockPlayers
    });
    this.renderPlayerNames();
  };

  getInitialState = () => {
    const { playersSelected } = this.state;
    return { playersSelected };
  };

  handleNewRowSubmit = newPlayer => {
    const { playersSelected } = this.state;
    this.setState({ playersSelected: playersSelected.push(newPlayer) });
  };

  renderPlayerNames = () => {
    const { playersSelected } = this.state;
    console.log(playersSelected);
    return playersSelected.map((player, index) => {
      const { id, name, position, rating } = player;
      return (
        <tr key={id}>
          <td>{index + 1}</td>
          <td>{position}</td>
          <td>{name}</td>
          <td>{rating}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <Row className="mh-60">
        <Col lg={3} md={6}>
          <div className="TeamBox">
            <Table striped borderless hover variant="dark" id="team_players">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Position</th>
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
        <Col>
          <Searchbar addPlayer={this.handleNewRowSubmit} />
        </Col>
      </Row>
    );
  }
}
