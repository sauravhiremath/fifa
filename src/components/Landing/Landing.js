import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ErrorHandler from '../ErrorHandler';

const Landing = () => {
  return (
    <div className="container max-w-lg px-4 py-8 mx-auto text-center md:py-32 md:max-w-none">
      <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-center text-gray-900 md:text-6xl md:leading-8 lg:text-7xl">
        <span className="inline md:block">Build and Play with your</span>{' '}
        <span className="relative mt-2 text-transparent bg-clip-text bg-gradient-to-br md:inline-block from-red-600 to-red-300">
          Dream FIFA Team
        </span>
      </h1>
      <div className="mx-auto mt-5 text-gray-500 text-center md:mt-12 md:max-w-lg lg:text-lg">
        Simplifying the way we play multiplayer games. Build custom teams and compete with
        others
      </div>
      <div className="flex flex-col items-center mt-12 text-center">
        <span className="relative inline-flex w-full md:w-auto">
          <a
            href="/auth"
            type="button"
            className="inline-flex items-center justify-center w-full px-8 text-base font-bold leading-6 text-white border border-transparent md:w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 hover:bg-red-400 bg-red-500 py-3 rounded-sm"
          >
            PLAY FREE
          </a>
          <span className="" />
        </span>
        <a href="#" className="mt-3 text-sm text-indigo-500">
          Learn More
        </a>
      </div>
    </div>
  );

  return (
    <Redirect
      push
      to={{
        pathname: '/room',
        search: `?=${roomId}`,
        state: { referrer: '/' }
      }}
    />
  );
};

const mapStateToProps = function (state) {
  return {
    username: state.username
  };
};

export default connect(mapStateToProps)(Landing);
