const https = require('https');
const path = require('path');
const fs = require('fs');
const serverErr = require('./serverErr');

const fetchFromExternalApi = (res, externalApiURL) => {
  https.get(externalApiURL, (response) => {
    let externalApiData = '';
    response.on('data', (chunkOfData) => {
      externalApiData += chunkOfData;
    });

    response.on('end', () => {
      const lasSearchFilePath = path.join(__dirname, '..', 'lastSearch.json');
      const parsedExternalApiData = JSON.parse(externalApiData);
      const lastCountryData = JSON.stringify(parsedExternalApiData.pop());

      fs.writeFile(lasSearchFilePath, lastCountryData, (writeErr) => {
        if (writeErr) serverErr(res);
        else {
          res.writeHead(303, { Location: '/' });
          res.end();
        }
      });
    });
  }).on('error', (httpErr) => {
    console.log(`Error: ${httpErr.message}`);
  });
};

module.exports = fetchFromExternalApi;
