import openSocket from 'socket.io-client';

export let sockerURL;

if (process.env.NODE_ENV === 'production') {
  sockerURL = 'https://socker.sauravmh.me';
} else {
  sockerURL = 'http://localhost:3004/classic-mode';
}

export function SockerInit(username, roomId, password, action) {
  const socker = openSocket(sockerURL, { path: '/classic-mode', query: { username, roomId, password, action } });
  return socker;
}
