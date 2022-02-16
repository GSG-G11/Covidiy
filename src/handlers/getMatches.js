const getMatches = (countriesArr, searchTerm) => countriesArr.reduce((acc, cur) => {
  if (cur.toLowerCase().includes(searchTerm.toLowerCase())) {
    acc.push(cur);
  }
  return acc;
}, []);

module.exports = getMatches;
