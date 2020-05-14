import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Theme as UWPThemeProvider, getTheme } from 'react-uwp/Theme';
import { Container } from 'react-bootstrap';
import { Nav, Auth, Room } from './components';
import background from './images/background.jpg';

import './App.css';
import 'react-chat-elements/dist/main.css';

export default class App extends React.Component {
  state = {
    isAuth: false
  };

  handleRoomAuth = data => {
    if (data.success ) {
      this.setState({
        isAuth: true
      });
    }
  };

  handleProfileAuth = data => {
    if (data.success) {
      this.setState({
        isAuth: true
      });
    }
  };

  render() {
    const { isAuth } = this.state;

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
              <Switch>
                <Route
                  path="/auth"
                  render={props => (
                    <Auth {...props} changeAuth={this.handleProfileAuth} />
                  )}
                />
                <PrivateRoute path="/" component={Room} isAuthed={isAuth} />
              </Switch>
            </Container>
          </div>
        </UWPThemeProvider>
      </Router>
    );
  }
}

const PrivateRoute = ({ component: Component, isAuthed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthed === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />
        )}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  location: PropTypes.object
};
