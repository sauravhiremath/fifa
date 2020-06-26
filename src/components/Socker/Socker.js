import openSocket from 'socket.io-client';
import Cookies from 'js-cookie';
import { sockerUrl } from '../../env';

export function SockerInit(username, roomId, password, action) {
  const token = Cookies.get('fifa-profile');
  const socker = openSocket(`${sockerUrl}`, { path: '/classic-mode', query: { username, roomId, password, action, token } });
  return socker;
}
