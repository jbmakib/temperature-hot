const weatherResult = document.getElementById("weather-result");

const loadData = async () => {
  weatherResult.innerHTML = `
  <div class="spinner-border text-dark" role="status"></div>
  `;
  const searchInput = document.getElementById("search-input");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=44244c6d0956107e6223722d79be91a2`;
  if (searchInput.value == "") {
    weatherResult.innerHTML = `
    <h1>Couldn't fetch data. Give correct Information</h1>
    `;
  } else {
    try {
      const res = await fetch(url);
      const data = await res.json();
      displayData(data);
    } catch (err) {
      weatherResult.innerHTML = `
        <h1>No Results found</h1>
      `;
    }
  }
  searchInput.value = "";
};

const displayData = (data) => {
  if (data.cod == "404") {
    weatherResult.innerHTML = `
    <h1>No Results Found</h1>
    `;
  }
  let str = "GMT +0:00";
  if (data.timezone / 3600 > 0) {
    str = `GMT +${(data.timezone / 3600).toFixed(2)}`;
  } else {
    str = `GMT ${(data.timezone / 3600).toFixed(2)}`;
  }

  weatherResult.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${
          data.weather[0].icon
        }@2x.png" alt="">
        <h1>${data.name}</h1>
        <h3><span>${Math.round(data.main.temp - 273.15)}</span>&deg;C</h3>
        <h1 class="lead">${data.weather[0].main}</h1>
        <h1>${str}</h1>
    `;
};
