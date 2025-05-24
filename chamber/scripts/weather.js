// weather.js
const API_KEY = 'e400122962027ef9801e1575a44dc9f5'; 
const CITY = 'Phoenix,AZ,US';
const CURRENT_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=imperial&appid=${API_KEY}`;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=imperial&appid=${API_KEY}`;

export async function fetchWeather() {
    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(CURRENT_WEATHER_URL),
            fetch(FORECAST_URL)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.querySelector('#weather').innerHTML = '<p style="color: var(--red); text-align: center;">Failed to load weather data.</p>';
    }
}

function displayCurrentWeather(data) {
    const temp = document.querySelector('#current-temp');
    const icon = document.querySelector('#current-icon');
    const description = document.querySelector('#current-description');

    temp.textContent = Math.round(data.main.temp);
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    icon.alt = data.weather[0].description;
    description.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
}

function displayForecast(data) {
    const container = document.querySelector('#forecast-container');
    container.innerHTML = '';

    // Get one forecast per day (around noon)
    const dailyForecasts = [];
    const datesAdded = new Set();

    data.list.forEach(forecast => {
        const date = new Date(forecast.dt * 1000).toLocaleDateString();
        const hour = new Date(forecast.dt * 1000).getHours();

        if (!datesAdded.has(date) && hour >= 12 && hour <= 15) {
            dailyForecasts.push(forecast);
            datesAdded.add(date);
        }
    });

    dailyForecasts.slice(0, 3).forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(forecast.main.temp);
        const icon = forecast.weather[0].icon;
        const description = forecast.weather[0].description;

        const forecastDay = document.createElement('div');
        forecastDay.classList.add('forecast-day');
        forecastDay.innerHTML = `
            <p><strong>${day}</strong></p>
            <p>${temp} °F</p>
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
            <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
        `;
        container.appendChild(forecastDay);
    });
}