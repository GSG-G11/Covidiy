const https = require('https');

const fetchFromExternalApi = (res, externalApiURL) => {
  https.get(externalApiURL, (response) => {
    let externalApiData = '';
    response.on('data', (chunkOfData) => {
      externalApiData += chunkOfData;
    });

    response.on('end', () => {
      const parsedExternalApiData = JSON.parse(externalApiData);
      const notFound = {
        Country: 'Not Found', Confirmed: '', Deaths: '', Recovered: '', Active: '', Date: '',
      };
      const lastCountryData = parsedExternalApiData.message === 'Not Found' ? JSON.stringify(notFound) : JSON.stringify(parsedExternalApiData.pop());
      res.end(lastCountryData);
    });
  }).on('error', (httpErr) => {
    console.log(`Error: ${httpErr.message}`);
  });
};

module.exports = fetchFromExternalApi;
