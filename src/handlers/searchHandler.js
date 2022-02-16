const path = require('path');
const fs = require('fs');
const serverErr = require('./serverErr');
const getDateBeforeOneMonth = require('./getDateBeforeOneMonth');
const fetchFromExternalApi = require('./fetchFromExternalAPI');

const searchHandler = (req, res) => {
  let allData = '';
  req.on('data', (chunkOfData) => {
    allData += chunkOfData;
  });

  req.on('end', () => {
    const countriesFilePath = path.join(__dirname, '..', 'countries.json');
    fs.readFile(countriesFilePath, (err, data) => {
      if (err) serverErr(res);
      else {
        const countriesApiKeysObj = JSON.parse(data);
        const searchTermObj = Object.fromEntries(new URLSearchParams(allData));
        const { country } = searchTermObj;

        const time = getDateBeforeOneMonth();
        const externalApiURL = `https://api.covid19api.com/country/${countriesApiKeysObj[country]}?from=${time}`;

        fetchFromExternalApi(res, externalApiURL);
      }
    });
  });
};

module.exports = searchHandler;
