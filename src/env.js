export let sockerUrl;
export let restUrl;

if (process.env.NODE_ENV === 'production') {
  sockerUrl = 'https://socker.fifa.sauravmh.me/classsic-mode';
  restUrl = 'https://api.fifa.sauravmh.me'
} else {
  sockerUrl = 'http://localhost:3004/classic-mode';
  restUrl = 'http://localhost:3003'
}
