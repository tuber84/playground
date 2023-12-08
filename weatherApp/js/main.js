const API_KEY = "97e27feb442e899f982f5adfa0ca6b73";
const form = document.querySelector("#form");
const input = document.querySelector(".form__input");

form.onsubmit = submitHandler;

// общая функция рендера прогноза:
async function submitHandler(e) {
  e.preventDefault();

  const cityInfo = await getGeo(input.value.trim());

  const lat = cityInfo[0]["lat"];
  const lon = cityInfo[0]["lon"];

  const weatherInfo = await getWeather(lat, lon);

  const weatherData = {
    name: weatherInfo.name,
    temp: weatherInfo.main.temp,
    humidity: weatherInfo.main.humidity,
    speed: weatherInfo.wind.speed,
    main: weatherInfo.weather[0]["main"],
  };

  renderWeatherData(weatherData);
}
// получаем координаты города:
async function getGeo(name) {
  const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`;

  const response = await fetch(geoUrl);

  const data = await response.json();
  return data;
}
// по координатам города получаем погоду:
async function getWeather(lat, lon) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

  const response = await fetch(weatherUrl);

  const data = await response.json();

  return data;
}

function renderWeatherData(data) {
  const temp = document.querySelector(".weather__temp");
  const city = document.querySelector(".weather__city");
  const humidity = document.querySelector("#humidity");
  const speed = document.querySelector("#speed");

  temp.innerText = Math.round(data.temp) + " c";
  city.innerText = data.name;
  humidity.innerText = data.humidity + '%'
  speed.innerText = data.speed + ' km/h';
}
