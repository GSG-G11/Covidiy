const pageNotFound = (res) => {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Page Not Found');
};

module.exports = pageNotFound;
