const fs = require('fs');
const path = require('path');
const getMatches = require('./getMatches');
const serverErr = require('./serverErr');

const getSuggestions = (res, searchTerm) => {
  const filePath = path.join(__dirname, '..', 'countries.json');

  fs.readFile(filePath, (err, data) => {
    if (err) serverErr(res);
    else {
      const countriesArr = JSON.parse(data);
      const suggestions = getMatches(countriesArr, searchTerm);
      res.end(JSON.stringify(suggestions));
    }
  });
};

module.exports = getSuggestions;
