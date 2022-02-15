const fetch = require('node-fetch');
const getSuggestions = require('./handlers/getSuggestions');
const pageNotFound = require('./handlers/pageNotFound');
const readFile = require('./handlers/readFile');
const serverErr = require('./handlers/serverErr');
const getDateBeforeOneMonth = require('./handlers/getDateBeforOneMonth');

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
  } else if (method === 'POST') {
    if (endpoint === '/search') {
      let allData = '';
      req.on('data', (chunkOfData) => {
        allData += chunkOfData;
      });

      req.on('end', () => {
        const dataObj = Object.fromEntries(new URLSearchParams(allData));
        const { country } = dataObj;
        res.writeHead(303, { Location: '/' });  

        const time = getDateBeforeOneMonth();

        fetch(`https://api.covid19api.com/live/country/${country}/status/confirmed/date/${time}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            res.end();
          })
          .catch((reject) => console.log(reject));
      });
    } else pageNotFound(res);
  } else pageNotFound(res);
};

module.exports = router;
