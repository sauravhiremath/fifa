import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Auth, Room, Lobby } from './components';
import { updateUsername } from './modules/action';
import axios from 'axios';

const ROUTES = [
  { path: '/auth', key: 'AUTH', exact: true, component: Auth },
  {
    path: '/',
    key: 'APP',
    component: props => {
      const token = Cookies.get('fifa-profile');
      let decoded; 
      verifyToken(token).then(decode => decoded = decode);
      if (!token || !decoded) {
        return <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />;
      }
      updateUsername({ ...decoded });
      return <RenderRoutes {...props} />;
    },
    routes: [
      {
        path: '/',
        key: 'APP_ROOT',
        exact: true,
        component: Room
      },
      {
        path: '/room',
        key: 'APP_ROOM',
        exact: true,
        component: Lobby
      }
    ]
  }
];

export default ROUTES;

/**
 * Render a route with potential sub routes
 */
const RouteWithSubRoutes = route => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component {...props} routes={route.routes} />}
    />
  );
};

/**
 * Use this component for any new section of routes (any config object that has a "routes" property)
 */
export const RenderRoutes = ({ routes }) => {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
};

RenderRoutes.propTypes = {
  routes: PropTypes.array.isRequired
};

const verifyToken = async token => {
  const response = await axios.post('http://localhost:3003/auth/verify', { token });
  if (response.success) {
    return response.decoded;
  }
  return undefined;
};
