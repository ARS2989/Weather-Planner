var date = moment().format('dddd, MMMM Do YYYY');
var dateTime = moment().format('YYYY-MM-DD HH:MM:SS')
var searchedCity = [];

$('.search').on("click", function (event) {
	event.preventDefault();
	city = $(this).parent('.btnPar').siblings('.textVal').val().trim();
	if (city === "") {
		return;
	};
	cityHist.push(city);

	localStorage.setItem('city', JSON.stringify(searchedCity));
	fiveForecastEl.empty();
	getHistory();
	getWeatherToday();
});

function getLocation(city) {
    fetch(
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
        city +
        "&appid=b51361fd06bf760a9892db36cbb10fbe"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        getWeather(data[0].lat, data[0].lon);
      });
  }
  function getWeather(lat, lon) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b51361fd06bf760a9892db36cbb10fbe&units=imperial`
    )
      .then(data => data.json())
      .then(data => displayCurrentWeather(data));
  }
  function displayCurrentWeather(data) {
    console.log(data);
    let currentWeather = document.getElementById("current-weather");
    currentWeather.innerHTML = `
      <h1>${data.name}</h1>
      <h2>${data.weather[0].description}</h2>
      <h3>${data.main.temp}°F</h3>
      <h3>Feels like ${data.main.feels_like}°F</h3>
      <h3>Humidity: ${data.main.humidity}%</h3>
      <h3>Wind: ${data.wind.speed}mph</h3>
      `;
  }
  document.getElementById("btn").addEventListener("click", function () {
    let searchedCity = document.getElementById("search").value;
    if (searchedCity) {
      getLocation(searchedCity);
    }
  });



  /* // <script>
  const citySearchForm = document.getElementById('city-search-form');
  const cityInput = document.getElementById('city-input');
  const searchResultsContainer = document.getElementById('search-results');

  citySearchForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const cityName = cityInput.value;
      
      if (cityName.trim() !== '') {
          // Save the search result to local storage
          saveSearchResult(cityName);
          // Update the search results display
          updateSearchResults();
      }
  });

  function saveSearchResult(cityName) {
      let savedResults = JSON.parse(localStorage.getItem('citySearchResults')) || [];
      savedResults.push(cityName);
      localStorage.setItem('citySearchResults', JSON.stringify(savedResults));
  }

  function updateSearchResults() {
      searchResultsContainer.innerHTML = '';
      const savedResults = JSON.parse(localStorage.getItem('citySearchResults')) || [];

      if (savedResults.length === 0) {
          searchResultsContainer.innerHTML = '<p>No search results yet.</p>';
          return;
      }

      const resultsList = document.createElement('ul');
      savedResults.forEach(city => {
          const listItem = document.createElement('li');
          listItem.textContent = city;
          resultsList.appendChild(listItem);
      });

      searchResultsContainer.appendChild(resultsList);
  }

  // Initialize search results on page load
  updateSearchResults();
</script> */