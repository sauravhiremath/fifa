import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Theme as UWPThemeProvider, getTheme } from 'react-uwp/Theme';
import { Container } from 'react-bootstrap';
import { Nav, Home } from './components';
import background from './images/background.jpg';

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Nav />
        <UWPThemeProvider
          theme={getTheme({
            themeName: 'dark', // set custom theme
            accent: '#0078D7', // set accent color
            useFluentDesign: true, // sure you want use new fluent design.
            desktopBackgroundImage: background // set global desktop background image
          })}
        >
          <Container fluid="sm" className="p-0">
            <Home />
          </Container>
        </UWPThemeProvider>
      </div>
    </Router>
  );
};

export default App;
