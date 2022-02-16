const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');
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
      case '/favicon.ico':
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
        const filePath = path.join(__dirname, 'countries.json');
        fs.readFile(filePath, (err, countryToKeyData) => {
          if (err) serverErr(res);
          else {
            const countryToKeyObj = JSON.parse(countryToKeyData);
            const dataObj = Object.fromEntries(new URLSearchParams(allData));
            const { country } = dataObj;

            const time = getDateBeforeOneMonth();
            fetch(`https://api.covid19api.com/country/${countryToKeyObj[country]}?from=${time}`)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                fs.writeFile(path.join(__dirname, 'lastSearch.json'), JSON.stringify(data.pop()), (writeErr) => {
                  if (writeErr) {
                    serverErr(res);
                  } else {
                    res.writeHead(303, { Location: '/' });
                    res.end();
                  }
                });
              })
              .catch((reject) => console.log(reject));
          }
        });
      });
    } else pageNotFound(res);
  } else pageNotFound(res);
};

module.exports = router;
