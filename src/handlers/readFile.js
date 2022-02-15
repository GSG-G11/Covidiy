const path = require('path');
const fs = require('fs');
const serverErr = require('./serverErr');

const contentType = {
  html: 'text/html',
  css: 'text/css',
  js: 'text/javascript',
  json: 'application/json',
};

const readFile = (res, file) => {
  const filePath = path.join(__dirname, '../../public/', file);
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) serverErr(res);
    else {
      const fileName = file.split('.').pop();
      res.writeHead(200, { 'Content-Type': contentType[fileName] });
      res.end(data);
    }
  });
};

module.exports = readFile;
