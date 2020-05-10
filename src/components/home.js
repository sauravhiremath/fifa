import React from 'react';

import Auth from './Auth';
import Room from './Room/Room';

const Home = () => {
  const username = localStorage.getItem('username');

  if (username) {
    return <Room username={username} />;
  }

  return <Auth />;
};

export default Home;
