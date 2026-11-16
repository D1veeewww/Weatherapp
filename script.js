const url = 
    'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
$(document).ready(function () {
    getWeather('Noida');
});
function getWeather() {
    const cityName = $('#city-input').val().trim() || 'Noida';
    const fullUrl = `${url}?${new URLSearchParams({
        q: cityName,
        appid: apiKey,
        units: 'metric'
    })}`;

    fetch(fullUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found. Please try again.');
            }
            return response.json();
        })
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                throw new Error(data.message || 'Unable to get weather for that city.');
            }
        })
        .catch(error => alert(error.message || 'Unable to fetch weather data. Please try again.'));
}

function displayWeather(data) {
    $('#city-name').text(`Weather in ${data.name}`);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
    $('#weather-icon').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    $('#weather-info').removeClass('d-none');
    $('#extra-info').html(`
        <p style="font-weight: bold; font-size: 18px; color: white;">Humidity: ${data.main.humidity}%</p>
        <p style="font-weight: bold; font-size: 18px; color: white;">Pressure: ${data.main.pressure} hPa</p>
    `);
    addWeatherEffects(data.weather[0].main);
}
function addWeatherEffects(weatherMain) {
    const extraInfo = $('#extra-info');
    switch (weatherMain.toLowerCase()) {
        case 'rain':
            extraInfo.append(`<p class="text-info fw-bold">
                <i class="fas fa-umbrella"></i>
                Rainy day, bring an umbrella!</p>`);
            break;
        case 'clear':
            extraInfo.append(`<p class="text-success fw-bold">
                <i class="fas fa-sun"></i> Clear skies, enjoy the sunshine!</p>`);
            break;
        case 'clouds':
            extraInfo.append(`<p class="text-warning fw-bold">
                <i class="fas fa-cloud"></i> Partly cloudy, a comfortable day.</p>`);
            break;
        default:
            extraInfo.append(`<p class="text-warning fw-bold">
                <i class="fas fa-question"></i>
                Weather conditions may vary.</p>`);
    }
      }
