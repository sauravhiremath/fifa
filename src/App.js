import React from 'react';
import { Container } from 'react-bootstrap';
import { Auth, Room } from './components';
import './App.css';

function App() {
  return (
    <div className="App">
      <Container>
        <Auth />
        <Room />
      </Container>
    </div>
  );
}

export default App;
