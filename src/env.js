export let sockerUrl;
export let restUrl;

if (process.env.NODE_ENV === 'production') {
  sockerUrl = 'https://socfifa.sauravmh.com/classic-mode';
  restUrl = 'https://apififa.sauravmh.com'
} else {
  sockerUrl = 'http://localhost:3004/classic-mode';
  restUrl = 'http://localhost:3003'
}
