import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Nav, Home } from './components';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Container className="min-vh-100">
          <Home />
        </Container>
      </div>
    </Router>
  );
}

export default App;
