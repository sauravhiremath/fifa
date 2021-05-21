import './App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import ROUTES, { RenderRoutes } from './routes';
import { Nav } from './components';
import background from './images/background.jpg';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Nav />
        <div className="container mx-auto">
          <RenderRoutes routes={ROUTES} />
        </div>
      </Router>
    </div>
  );
};

export default App;
