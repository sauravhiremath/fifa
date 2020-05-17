import React from 'react';
import Cookies from 'js-cookie';

const Welcome = () => {
  const token = Cookies.get('fifa-profile');
  const username = parseJwt(token).username;
  return <div>Welcome {username}</div>;
};

export default Welcome;

const parseJwt = token => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};
