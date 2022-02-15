const getMatches = (countriesArr, searchTerm) => countriesArr.reduce((acc, cur) => {
  if (cur.name.toLowerCase().includes(searchTerm.toLowerCase())) {
    acc.push(cur.name);
  }
  return acc;
}, []);

module.exports = getMatches;
