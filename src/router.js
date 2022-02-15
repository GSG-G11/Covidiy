const getSuggestions = require('./handlers/getSuggestions');
const readFile = require('./handlers/readFile');
const serverErr = require('./handlers/serverErr');

const router = (req, res) => {
  const { url: endpoint, method } = req;

  if (method === 'GET') {
    const searchTerm = endpoint.split('/suggest/')[1];
    switch (endpoint) {
      case '/':
        readFile(res, '/index.html');
        break;
      case '/style.css':
      case '/script.js':
        readFile(res, endpoint);
        break;
      case `/suggest/${searchTerm}`:
        getSuggestions(res, searchTerm);
        break;
      case '/status':
        break;
      default:
        serverErr(res);
    }
  }
};

module.exports = router;
