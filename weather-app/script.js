// Weather App - Fully Working Version with CORS Fix
const API_KEY = 'c9e5d418b4d6dcfda4ba57ce9e5265e0'; // Your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const CORS_PROXY = 'https://thingproxy.freeboard.io/fetch/'; // Updated to a more reliable proxy

// Initialize app when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    // Set event listeners
    document.getElementById('search-btn').addEventListener('click', searchWeather);
    document.getElementById('city-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchWeather();
    });

    // Load default weather
    searchWeather('London');
});

async function searchWeather(city = null) {
    city = city || document.getElementById('city-input').value.trim();
    if (!city) return showError('Please enter a city name');

    try {
        showLoading();

        // Fetch through CORS proxy
        const weatherData = await fetchWeather(city);
        updateUI(weatherData);

    } catch (error) {
        showError(error.message || 'Failed to fetch weather');
        console.error('API Error:', error);
    }
}

async function fetchWeather(city) {
    // Construct the API URL with encoded city parameter
    const apiUrl = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
    const response = await fetch(`${CORS_PROXY}${apiUrl}`);

    if (!response.ok) {
        const text = await response.text(); // Get raw response for better error insight
        throw new Error(`City not found or API error (${response.status}): ${text.slice(0, 100)}`);
    }

    // Check if response is JSON to avoid parsing errors
    const contentType = response.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Expected JSON but received ${contentType}: ${text.slice(0, 100)}`);
    }

    const data = await response.json();
    return data;
}

function updateUI(data) {
    // Update current weather
    document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('wind').textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    document.getElementById('conditions').textContent = data.weather[0].description;

    // Update weather icon
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('weather-icon').src = iconUrl;
    document.getElementById('weather-icon').alt = data.weather[0].main;
}

function showLoading() {
    document.getElementById('city-name').textContent = 'Loading...';
    document.getElementById('temperature').textContent = '--°C';
    document.getElementById('error-message').classList.add('hidden');
}

function showError(message) {
    document.getElementById('error-message').textContent =
        'Failed to fetch weather data. Please check the city name and try again.';
    document.getElementById('error-message').classList.remove('hidden');
    console.error('Detailed error:', message); // Keep detailed error in console
