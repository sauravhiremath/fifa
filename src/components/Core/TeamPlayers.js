import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Table } from 'react-bootstrap';

export default class TeamPlayers extends React.Component {
  static propTypes = {
    teamPlayers: PropTypes.array.isRequired,
    allCollections: PropTypes.object.isRequired,
    collectionId: PropTypes.string.isRequired
  };

  static contextTypes = { theme: PropTypes.object };

  renderTeamPlayers = () => {
    const { teamPlayers, allCollections, collectionId } = this.props;
    let currentCollection = teamPlayers
    if (collectionId !== 'current-user') {
      currentCollection = allCollections[collectionId];
    }
    return currentCollection.map((player, index) => {
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
          <tbody>{this.renderTeamPlayers()}</tbody>
        </Table>
      </div>
    );
  }
}
