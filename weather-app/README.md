# Weather App

A simple weather application that displays current weather conditions and a 5-day forecast for any city.

## Features
- Search for weather by city name
- Display current temperature, humidity, wind speed, and conditions
- 5-day forecast with average temperatures
- Responsive design for mobile and desktop

## API Used
This app uses the [OpenWeatherMap API](https://openweathermap.org/api). You'll need to sign up for a free API key.

## Local Setup
1. Clone this repository
2. Get an API key from OpenWeatherMap
3. Replace `YOUR_OPENWEATHERMAP_API_KEY` in `script.js` with your actual API key
4. Open `index.html` in a web browser

## Deployment Instructions

### Prerequisites
- Access to Web01 and Web02 servers
- SSH access to Lb01 (load balancer)
- Basic knowledge of Nginx configuration

### Steps

1. **Prepare the application on both web servers:**
   ```bash
   # On both Web01 and Web02
   sudo apt update
   sudo apt install nginx -y
   sudo systemctl start nginx
   sudo systemctl enable nginx
