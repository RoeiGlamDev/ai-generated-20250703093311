// Get the form and input elements
const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const getWeatherBtn = document.getElementById('get-weather-btn');
const weatherDataDiv = document.getElementById('weather-data');
const errorMessageDiv = document.getElementById('error-message');

// Add event listener to the form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    getWeatherData(city);
  } else {
    displayErrorMessage('Please enter a city or location');
  }
});

// Function to get the weather data
async function getWeatherData(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YOUR_API_KEY`);
    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    displayErrorMessage('Error fetching weather data');
  }
}

// Function to display the weather data
function displayWeatherData(data) {
  const weatherDataHtml = `
    <h2>Weather in ${data.name}</h2>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
  `;
  weatherDataDiv.innerHTML = weatherDataHtml;
  weatherDataDiv.classList.add('fade-in');
  errorMessageDiv.classList.remove('fade-in');
}

// Function to display an error message
function displayErrorMessage(message) {
  const errorMessageHtml = `<p>${message}</p>`;
  errorMessageDiv.innerHTML = errorMessageHtml;
  errorMessageDiv.classList.add('fade-in');
  weatherDataDiv.classList.remove('fade-in');
}