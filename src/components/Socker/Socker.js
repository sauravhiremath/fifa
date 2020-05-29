import openSocket from 'socket.io-client';
import { sockerUrl } from '../../env';

export function SockerInit(username, roomId, password, action) {
  const socker = openSocket(sockerUrl, { path: '/classic-mode', query: { username, roomId, password, action } });
  return socker;
}
