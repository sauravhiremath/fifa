import React from 'react';
import { Theme as UWPThemeProvider, getTheme } from 'react-uwp/Theme';
import { Container } from 'react-bootstrap';

import ROUTES, { RenderRoutes } from './routes';
import { Nav } from './components';
import background from './images/background.jpg';

import './App.css';
import 'react-chat-elements/dist/main.css';

export default class App extends React.Component {

  render() {
    return (
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
            <RenderRoutes routes={ROUTES} />
          </Container>
        </div>
      </UWPThemeProvider>
    );
  }
}
