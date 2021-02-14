export let sockerUrl;
export let restUrl;

if (process.env.NODE_ENV === 'production') {
  sockerUrl = 'https://socfifa.sauravmh.com/classic-mode';
  restUrl = 'https://apififa.sauravmh.com'
} else {
  sockerUrl = 'http://localhost:65080/classic-mode';
  restUrl = 'http://localhost:8080'
}
