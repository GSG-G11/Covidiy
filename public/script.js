const searchInput = document.querySelector('#country');
const suggestionsDatalist = document.querySelector('#suggestions');
// const searchForm = document.querySelector('search-form');

const getData = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      switch (xhr.status) {
        case 200:
          try {
            const response = JSON.parse(xhr.responseText);
            callback(response);
          } catch (e) {
            console.log(e);
            callback(['wrong data type', 'test enter #1', 100, 101, 102, 103]);
          }
          break;
        case 404:
          console.log('404 error => requested data not found');
          break;
        default:
          console.log(
            `Sorry, our service at ${url} not a available at the moment. we will back soon`,
          );
      }
    }
  };
  xhr.open('GET', url);
  xhr.send();
};

const handleSuggestions = (suggestionsArr) => {
  suggestionsDatalist.innerHTML = '';
  suggestionsArr.forEach((suggestion) => {
    const suggestionOption = document.createElement('option');
    suggestionOption.value = suggestion;
    suggestionsDatalist.appendChild(suggestionOption);
  });
};

searchInput.addEventListener('input', () => {
  getData(`${window.location}suggest/${searchInput.value}`, handleSuggestions);
});

// load last server search json file
getData(`${window.location}lastSearch.json`, console.log);
