const form = document.querySelector('#search-form');
const input = document.querySelector('#city-input');
const card = document.querySelector('#weather-card');
const empty = document.querySelector('#empty-state');
const loading = document.querySelector('#loading-state');
const error = document.querySelector('#error-state');
const forecast = document.querySelector('#forecast');

const symbols = { '01': '☀', '02': '🌤', '03': '☁', '04': '☁', '09': '🌧', '10': '🌦', '11': '⛈', '13': '❄', '50': '🌫' };

function show(state) {
  empty.hidden = state !== 'empty';
  loading.hidden = state !== 'loading';
  error.hidden = state !== 'error';
  forecast.hidden = state !== 'forecast';
  card.setAttribute('aria-busy', String(state === 'loading'));
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const city = input.value.trim();
  if (!city) return;
  show('loading');
  try {
    const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Could not load weather for that city.');

    document.querySelector('#city-name').textContent = [data.name, data.country].filter(Boolean).join(', ');
    document.querySelector('#local-date').textContent = new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());
    document.querySelector('#temperature').textContent = Math.round(data.temperature);
    document.querySelector('#description').textContent = data.description;
    document.querySelector('#feels-like').textContent = Math.round(data.feelsLike);
    document.querySelector('#feels-like-detail').textContent = Math.round(data.feelsLike);
    document.querySelector('#humidity').textContent = data.humidity;
    document.querySelector('#wind').textContent = Number(data.windSpeed).toFixed(1);
    document.querySelector('#weather-symbol').textContent = symbols[data.icon?.slice(0, 2)] || '☁';
    show('forecast');
  } catch (err) {
    document.querySelector('#error-title').textContent = err.message;
    document.querySelector('#error-copy').textContent = 'Try another city name, or check back in a moment.';
    show('error');
  }
});
