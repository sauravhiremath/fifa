import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Auth, Room, Nav } from './components';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Container className="min-vh-100">
          <Auth />
          {/* <Room /> */}
        </Container>
      </div>
    </Router>
  );
}

export default App;
