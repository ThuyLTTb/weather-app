
import React, { useState } from 'react';
import axios from 'axios';



const api = {
  token: "f43436f3b90a99c227c8db19435bfb77  ",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  // const [weatherdata,  setweatherdata]= useState(null);
  const getWeather = async (base , query, token) =>{
    // console.log("base",base)
    // console.log("query", query)
    // console.log("token",token)
    const res = await axios.get(`${base}weather?q=${query}&units=metric&APPID=${token}`);
    console.log("getWeather:res",res)
    const result = res.data
    console.log("getWeather:result",result)
    setWeather(result);
    setQuery('');
  }
  const search = evt => {
    if (evt.key === "Enter") {
        getWeather(api.base,query, api.token);

    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
