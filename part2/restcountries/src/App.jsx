import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const api_key = import.meta.env.VITE_API_KEY;
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [weather, setWeather] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data);
        setFilteredCountries(response.data);
      });
  }, []);

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const city = filteredCountries[0].capital[0];
      const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;

      if(weather && city === weather.name) {
        return;
      }

      axios.get(weatherAPIUrl)
        .then(response => {
          setWeather(response.data);
        })
        .catch(error => {
          console.error('Error fetching the weather data', error);
        });
    }
  }, [api_key, filteredCountries]);

  const handleFilterChange = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
    const filtered = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()));
    setFilteredCountries(filtered);
  }

  const handleExtend = (name) => {
    const updatedCountries = countries.filter(country => country.name.common === name);
    setFilteredCountries(updatedCountries);
  }

  return (
    <div>
      <p>Find Countries</p> <input type="text" value={filter} onChange={handleFilterChange} />
      {
        filteredCountries.length > 10 &&
        <p>Too many matches, please be more specific</p>
      }
      {
        filteredCountries.length === 1 &&
          filteredCountries.map(country => {
            return (
              <div key={country.name.common}>
                <h1>{country.name.common}</h1>
                <div>
                  <p>Capital {country.capital[0]}</p>
                  <p>Area {country.area}</p>
                </div>
                <h4>Languages:</h4>
                <ul>
                  {Object.entries(country.languages).map(([key, value]) => (
                    <li key={key}>{value}</li>
                  ))}
                </ul>
                <img src={country.flags.png} alt={country.flags.alt} />
                <div>
                  <h2>Weather in {country.capital[0]}</h2>
                  <p>Temperature: {weather?.main.temp}°C</p>
                  <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt={weather?.weather[0].description} />
                  <p>Wind: {weather?.wind.speed} m/s</p>
                </div>
              </div>
            );
          })
      }
      {
        filteredCountries.length !== 1 && filteredCountries.length <= 10 &&
        <div>
          {filteredCountries.map(country => (
            <p key={country.name.common}>{country.name.common} <button type="button" onClick={() => handleExtend(country.name.common)}>show</button></p>
          ))}
        </div>
      }
    </div>
  )
}

export default App
