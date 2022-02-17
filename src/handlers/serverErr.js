const serverErr = (res) => {
  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('Server Error');
};

module.exports = serverErr;
