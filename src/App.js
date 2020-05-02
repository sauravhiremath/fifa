import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Nav, Home } from './components';

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Container fluid>
          <Home />
        </Container>
      </div>
    </Router>
  );
};

export default App;
