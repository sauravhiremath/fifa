import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import Searchbar from './SearchBar';

export default class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 1,
    };
  }

  render() {
    return (
      <Row className="mh-100">
        <Col lg={3} md={6}>
          <div className="TeamBox">
            <Table striped bordereless hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Position</th>
                  <th>Name</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>ST</td>
                  <td>Cristiano Ronaldo</td>
                  <td>93</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>RW</td>
                  <td>Lionel Messi</td>
                  <td>94</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>LW</td>
                  <td>Eden hazard</td>
                  <td>89</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
        <Col lg= {3} md={6}>
          Hello chatbox
        </Col>
        <Col>
          <Searchbar />
        </Col>
      </Row>
    );
  }
}
