const searchInput = document.querySelector('#country');
const suggestionsDatalist = document.querySelector('#suggestions');
const searchForm = document.querySelector('#search-form');

const xhrUni = (method) => (url, callback, data) => {
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
  xhr.open(method, url);
  xhr.send(data);
};
const getData = xhrUni('GET');
const postData = xhrUni('POST');

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

const handleSearchData = ({
  Country, Confirmed, Deaths, Recovered, Active, Date,
}) => {
  const countrySpan = document.querySelector('#country-name');
  const confirmedSpan = document.querySelector('#confirmed');
  const deathsSpan = document.querySelector('#deaths');
  const recoveredSpan = document.querySelector('#recoverd');
  const activeSpan = document.querySelector('#active');
  const dateSpan = document.querySelector('#date');

  countrySpan.textContent = Country;
  confirmedSpan.textContent = Confirmed;
  deathsSpan.textContent = Deaths;
  recoveredSpan.textContent = Recovered;
  activeSpan.textContent = Active;
  dateSpan.textContent = Date?.slice(0, 10);
};

// load last server search json file
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  postData(`${window.location}search`, handleSearchData, `country=${searchInput.value}`);
});
