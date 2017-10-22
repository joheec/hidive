const CorsProxy = require('cors-anywhere');
const host = '127.0.0.1';
const port = '8081';

CorsProxy.createServer({
  originWhitelist: [], //Allow all origins
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2'],
}).listen(port, host, () => {
  console.log(`Running CORS Anywhere on ${host}:${port}`);
});
