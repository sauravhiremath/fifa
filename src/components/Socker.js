import openSocket from 'socket.io-client';

export let sockerURL;

if (process.env.NODE_ENV === 'production') {
  sockerURL = 'https://socker.sauravmh.me';
} else {
  sockerURL = 'http://localhost:3004/classic-mode';
}

export function SockerInit(username, action) {
  const socker = openSocket(sockerURL, { path: '/classic-mode', query: { roomId: '#558909', action } });
  return socker;
}
