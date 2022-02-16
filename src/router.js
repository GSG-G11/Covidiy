const getSuggestions = require('./handlers/getSuggestions');
const pageNotFound = require('./handlers/pageNotFound');
const readFile = require('./handlers/readFile');
const serverErr = require('./handlers/serverErr');
const searchHandler = require('./handlers/searchHandler');

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
      case '/favicon.ico':
        readFile(res, endpoint);
        break;
      case `/suggest/${searchTerm}`:
        getSuggestions(res, decodeURI(searchTerm));
        break;
      default:
        serverErr(res);
    }
  } else if (method === 'POST') {
    if (endpoint === '/search') {
      searchHandler(req, res);
    } else {
      pageNotFound(res);
    }
  } else {
    pageNotFound(res);
  }
};

module.exports = router;
