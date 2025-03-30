// Weather App - Fully Working Version with CORS Fix
const API_KEY = 'c9e5d418b4d6dcfda4ba57ce9e5265e0'; // Your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const CORS_PROXY = 'https://api.codetabs.com/v1/proxy/?quest=';

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
    // Encode the API URL for proxy
    const encodedUrl = encodeURIComponent(
        `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    
    const response = await fetch(`${CORS_PROXY}${encodedUrl}`);
    
    if (!response.ok) {
        throw new Error(`City not found (${response.status})`);
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
    document.getElementById('error-message').textContent = message;
    document.getElementById('error-message').classList.remove('hidden');
}
