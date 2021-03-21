import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import { sockerUrl } from '../../env';

export function SockerInit(username, roomId, password, action, options) {
  const token = Cookies.get('fifa-profile');
  const socker = io(`${sockerUrl}`, {
    path: '/classic-mode',
    transports: ['websocket'],
    query: {
      username,
      roomId,
      password,
      action,
      token,
      options: options && JSON.stringify(options)
    }
  });
  return socker;
}
