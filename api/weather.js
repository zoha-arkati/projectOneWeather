export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Use a GET request to look up a city.' });
  }

  const city = typeof request.query.city === 'string' ? request.query.city.trim() : '';
  if (!city || city.length > 100) {
    return response.status(400).json({ error: 'Enter a city name (up to 100 characters).' });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return response.status(503).json({ error: 'Weather lookup is not configured yet.' });
  }

  try {
    const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    url.search = new URLSearchParams({ q: city, appid: apiKey, units: 'metric' });
    const upstream = await fetch(url, { signal: AbortSignal.timeout(8000) });
    const data = await upstream.json();

    if (!upstream.ok) {
      if (upstream.status === 404) return response.status(404).json({ error: 'We couldn’t find that city.' });
      if (upstream.status === 401) return response.status(502).json({ error: 'Weather service rejected its API key.' });
      return response.status(502).json({ error: 'Weather data is temporarily unavailable.' });
    }

    return response.status(200).json({
      name: data.name,
      country: data.sys?.country,
      temperature: data.main?.temp,
      feelsLike: data.main?.feels_like,
      humidity: data.main?.humidity,
      windSpeed: data.wind?.speed,
      description: data.weather?.[0]?.description,
      icon: data.weather?.[0]?.icon
    });
  } catch {
    return response.status(502).json({ error: 'Could not reach the weather service. Please try again.' });
  }
}
