export let sockerUrl;

if (process.env.NODE_ENV === 'production') {
  sockerUrl = 'https://socker.sauravmh.me';
} else {
  sockerUrl = 'http://localhost:3004/classic-mode';
}
