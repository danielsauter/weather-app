// This placeholder will be replaced by GitHub Actions during deployment
// DO NOT put your real API key here!
const API_KEY = '__API_KEY__';

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const resultDiv = document.getElementById('result');
  
  if (!city) {
    resultDiv.innerHTML = '<div class="error">Please enter a city name</div>';
    return;
  }
  
  // Show loading state
  resultDiv.innerHTML = '<div class="loading">Loading weather data...</div>';
  
  try {
    // OpenWeather API endpoint
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found');
      } else if (response.status === 401) {
        throw new Error('Invalid API key');
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    }
    
    const data = await response.json();
    
    // Display weather information
    resultDiv.innerHTML = `
      <div class="weather-info">
        <h2>${data.name}, ${data.sys.country}</h2>
        <div class="temp">${Math.round(data.main.temp)}°C</div>
        <div class="description">${data.weather[0].description}</div>
        <div class="details">
          <div class="detail-item">
            <div class="detail-label">Feels Like</div>
            <div class="detail-value">${Math.round(data.main.feels_like)}°C</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Humidity</div>
            <div class="detail-value">${data.main.humidity}%</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Wind</div>
            <div class="detail-value">${Math.round(data.wind.speed * 3.6)} km/h</div>
          </div>
        </div>
      </div>
    `;
    
  } catch (error) {
    console.error('Error fetching weather:', error);
    resultDiv.innerHTML = `<div class="error">Error: ${error.message}</div>`;
  }
}

// Check if API key has been replaced (for debugging)
if (API_KEY === '__API_KEY__') {
  console.warn('⚠️ API key has not been replaced yet.');
  console.warn('This is normal in local development.');
  console.warn('The key will be injected during GitHub Actions deployment.');
}

// Load default city on page load
window.addEventListener('load', () => {
  // Only auto-load if API key has been replaced (deployed)
  if (API_KEY !== '__API_KEY__') {
    getWeather();
  }
});
