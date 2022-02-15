const http = require('http');
require('env2')('.env');
const router = require('./router');

const port = process.env.PORT || 3000;
const server = http.createServer(router);

server.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
