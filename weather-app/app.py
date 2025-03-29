from flask import Flask, render_template, request
import requests
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)

# Add root route
@app.route('/')
def home():
    return """
    <h1>Weather App</h1>
    <form action="/weather">
        <input type="text" name="city" placeholder="Enter city">
        <button type="submit">Get Weather</button>
    </form>
    """

@app.route('/weather')
def weather():
    city = request.args.get('city', 'London')
    api_key = os.getenv('API_KEY')
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    response = requests.get(url)
    data = response.json()
    return render_template('weather.html', weather=data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
