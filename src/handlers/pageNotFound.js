const pageNotFound = (res) => {
  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('Server Error');
};

module.exports = pageNotFound;
