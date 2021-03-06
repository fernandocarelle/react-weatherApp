import React, { useState } from 'react';
import './App.css';
import Icon from '@material-ui/icons/Search';

const api = {
  key: "9eebcb1743e1aa78976bc9b3b4ef30e2",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      handleClick()
    }
  }

 function handleClick() {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
  }

  const datebuilder = (d) => {
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    let days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

    /* let today = new Date().toLocaleDateString() */

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} - ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 20) ? 'App warm' : 'App') : 'App'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Digite a cidade"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
          <button className="btn" onClick={handleClick}><Icon>SearchIcon</Icon></button>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{datebuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
              </div>
              {/* <div className="weather"><img src={`http://api.openweathermap.org/img/w/${weather.weather[0].icon}.png`} /></div> */}
              {/* <div className="weather">{weather.weather[0].main}</div> */}

            </div>


          </div>
        ) : ('')}

        <div className="copyright">
          <p>&copy; Copyright 2020 <a href="https://www.linkedin.com/in/fernandocode/" target="blank">Fernando Carelle</a></p>
        </div>

      </main>

    </div>
  );
}

export default App;
