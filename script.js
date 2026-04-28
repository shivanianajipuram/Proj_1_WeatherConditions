const apiKey = '736226bbca25292fb022b7d8e8e420a3';

async function getWeather() {
    console.log("Search button clicked!");
    const city = document.getElementById('cityInput').value;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
        // Fetch Current Weather
        const weatherRes = await fetch(weatherUrl);
        const weatherData = await weatherRes.json();
        
        // Update Dashboard
        document.getElementById('cityName').innerText = weatherData.name;
        document.getElementById('temp').innerText = `${Math.round(weatherData.main.temp)}°C`;
        document.getElementById('condition').innerText = weatherData.weather[0].main;
        document.getElementById('humidity').innerText = `Humidity: ${weatherData.main.humidity}%`;
        document.getElementById('wind').innerText = `Wind: ${weatherData.wind.speed} m/s`;
        
        // Dynamic Background
        document.body.className = `bg-${weatherData.weather[0].main}`;
        document.getElementById('dashboard').classList.remove('hidden');

        // Fetch Forecast
        const forecastRes = await fetch(forecastUrl);
        const forecastData = await forecastRes.json();
        
        // Filter for one reading per day (roughly)
        const forecastHTML = forecastData.list
            .filter((_, index) => index % 8 === 0)
            .map(day => `<div><p>${day.dt_txt.slice(5, 10)}</p><p>${Math.round(day.main.temp)}°C</p></div>`)
            .join('');
        
        document.getElementById('forecast').innerHTML = forecastHTML;

    } catch (error) {
        alert("City not found or API error.");
    }
}

// async function getWeather() {
//     const city = document.getElementById('cityInput').value.trim();
//     if (!city) return alert("Please enter a city name!");

//     const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

//     try {
//         const response = await fetch(weatherUrl);
        
//         if (!response.ok) {
//             // This will tell you if it's 401 (Key) or 404 (City)
//             const errorBody = await response.json();
//             console.error("API Error Details:", errorBody);
//             throw new Error(errorBody.message);
//         }

//         const data = await response.json();
//         console.log("Success! Data received:", data);
        
//         // ... (rest of your UI update code)
        
//     } catch (error) {
//         console.error("Fetch failed:", error.message);
//         alert(`Error: ${error.message}`);
//     }
// }