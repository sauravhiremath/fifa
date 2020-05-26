import { Types } from './action';

export const defaultState = {
  loggedIn: false,
  username: '',
  roomId: '',
  password: ''
};

const store = (state = defaultState, action) => {
  switch (action.type) {
  case Types.LOG_IN: {
    const username = action.payload.username;
    return { ...state, username, loggedIn: true };
  }

  case Types.LOG_OUT: {
    return { ...state };
  }

  case Types.UPDATE_USERNAME: {
    const username = action.payload.username;
    return { ...state, username };
  }

  case Types.ADD_ROOMID: {
    const roomId = action.payload.roomId;
    return { ...state, roomId };
  }

  case Types.REMOVE_ROOMID: {
    return { ...state, roomId: '', password: '' };
  }

  case Types.ADD_PASSWORD: {
    const password = action.payload.password;
    return { ...state, password };
  }

  default:
    return state;
  }
};

export default store;
