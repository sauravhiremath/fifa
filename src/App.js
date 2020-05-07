import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Theme as UWPThemeProvider, getTheme } from 'react-uwp/Theme';
import { Container } from 'react-bootstrap';
import { Nav, Home } from './components';
import background from './images/background.jpg';

import './App.css';
import 'react-chat-elements/dist/main.css';

const App = () => {
  return (
    <Router>
      <UWPThemeProvider
        theme={getTheme({
          themeName: 'dark', // set custom theme
          accent: '#0078D7', // set accent color
          useFluentDesign: true, // sure you want use new fluent design.
          desktopBackgroundImage: background // set global desktop background image
        })}
      >
        <div className="App">
          <Nav />
          <Container fluid="sm" className="p-0">
            <Home />
          </Container>
        </div>
      </UWPThemeProvider>
    </Router>
  );
};

export default App;
