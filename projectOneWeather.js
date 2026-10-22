import axios from 'axios';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter a city name: ', async (city) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    console.error('Set OPENWEATHER_API_KEY before running the weather app.');
    rl.close();
    return;
  }
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: { q: city.trim(), appid: apiKey, units: 'metric' }
    });
    console.log(`City Name: ${response.data.name}`);
    console.log(`Current temperature is ${response.data.main.temp}°C`);
    console.log(`Weather description: ${response.data.weather[0].description}`);
  } catch (error) {
    console.error('Error fetching weather data:', error.response?.data?.message || error.message);
  } finally {
    rl.close();
  }
});
