import React, { useState } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { Navbar } from 'react-bootstrap';
import clsx from 'clsx';

const Nav = ({ username }) => {
  const [showMenu, setShowMenu] = useState(false);

  const loginStatus = () => {
    if (username) {
      return (
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <b>{username}</b>
          </Navbar.Text>
        </Navbar.Collapse>
      );
    }
  };

  return (
    <nav className="relative z-50 h-24 select-none">
      <div className="relative flex flex-wrap items-center justify-between h-24 overflow-hidden font-medium border-b border-gray-200 md:overflow-visible lg:justify-center sm:px-4 md:px-2">
        <div className="flex items-center justify-start w-1/4 h-full pr-4 pl-4">
          <a href="#_" className="inline-block py-4 md:py-0">
            <span className="p-1 text-xl font-black leading-none text-gray-900">
              <span className="">fifa.io</span>
              <span className="" />
            </span>
          </a>
        </div>
        <div
          className={clsx(
            'top-0 left-0 items-start hidden w-full h-full p-4 text-sm bg-gray-900 bg-opacity-50 md:items-center md:w-3/4 lg:text-base md:bg-transparent md:p-0 md:relative md:flex',
            showMenu && 'flex fixed'
          )}
        >
          <div className="flex-col w-full h-auto overflow-hidden bg-white rounded-lg md:bg-transparent md:overflow-visible md:rounded-none md:relative md:flex md:flex-row">
            <div className="flex flex-col items-start justify-center w-full space-x-6 text-center lg:space-x-8 md:w-2/3 md:mt-0 md:flex-row md:items-center">
              <a
                href="#_"
                className="inline-block w-full py-2 mx-0 ml-6 font-medium text-left md:ml-0 md:w-auto md:px-0 md:mx-2 lg:mx-3 md:text-center text-red-500"
              >
                Home
              </a>
              <a
                href="#_"
                className="inline-block w-full py-2 mx-0 font-medium text-left text-gray-700 md:w-auto md:px-0 md:mx-2 hover:text-indigo-600 lg:mx-3 md:text-center"
              >
                Features
              </a>
              <a
                href="#_"
                className="inline-block w-full py-2 mx-0 font-medium text-left text-gray-700 md:w-auto md:px-0 md:mx-2 hover:text-indigo-600 lg:mx-3 md:text-center"
              >
                Gallery
              </a>
              <a
                href="#_"
                className="inline-block w-full py-2 mx-0 font-medium text-left text-gray-700 md:w-auto md:px-0 md:mx-2 hover:text-indigo-600 lg:mx-3 md:text-center"
              >
                Contact
              </a>
              <a
                href="#_"
                className="absolute top-0 left-0 hidden py-2 mt-6 ml-10 mr-2 text-gray-600 lg:inline-block md:mt-0 md:ml-2 lg:mx-3 md:relative"
              >
                <svg
                  className="inline w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </a>
            </div>
            <div className="flex flex-col items-start justify-end w-full pt-4 md:items-center md:w-1/3 md:flex-row md:py-0">
              <a
                href="https://github.com/sauravhiremath/fifa"
                target="__blank"
                rel="noopener"
                className="w-full px-6 pt-2 pb-1 mr-0 text-gray-700 border-b-2 border-red-400 md:px-0 lg:px-2 md:mr-4 lg:mr-5 md:w-auto"
              >
                View on github
              </a>
              <a
                href="/auth"
                className="inline-flex items-center w-full px-6 py-3 text-sm font-medium leading-4 text-white md:px-3 md:w-auto lg:px-5 focus:outline-none md:focus:ring-2 focus:ring-0 focus:ring-offset-2 hover:bg-red-400 focus:ring-red-600 bg-red-500 rounded-sm"
              >
                PLAY NOW
              </a>
            </div>
          </div>
        </div>
        <div
          className="absolute right-4 flex flex-col items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer md:hidden hover:bg-gray-100"
          onClick={() => setShowMenu(v => !v)}
        >
          <svg
            className={clsx('w-6 h-6 text-gray-700', showMenu && 'hidden')}
            x-show="!showMenu"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            className={clsx('w-6 h-6 text-gray-700', !showMenu && 'hidden')}
            x-show="showMenu"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
};

Nav.propTypes = {
  username: propTypes.string
};

const mapStateToProps = function (state) {
  return {
    loggedIn: state.loggedIn,
    username: state.username
  };
};

export default connect(mapStateToProps)(Nav);
