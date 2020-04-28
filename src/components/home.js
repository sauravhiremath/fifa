import React from 'react';

import Auth from './auth';
import Room from './Room';

const Home = () => {
  const username = localStorage.getItem('username');

  if (username) return <Room />;
  return <Auth />;
};

export default Home;
