import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
  }

  useEffect(()=> {
    navigator.geolocation.getCurrentPosition((position)=> {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    });
  }, []);

  if(location === false){

    return (

      <section id="main">
        <h1>Você precisa habilitar a localização no seu browser.</h1>
      </section>

    );

  } else if (weather === false) {
    
    return (

      <section id="main">
        <h1>Carregando o clima...</h1>
      </section>   
      
    );

  } else {

    let title = weather['weather'][0]['description'];
    return (
    
      <Fragment>

        <section id="main">
          <p>Clima em sua localização:</p>
          <h1>{title[0].toUpperCase() + title.substring(1)} </h1>
          <hr />
          <h4>Mais informações:</h4>
          <ul>
            <li>Temperatura atual: {weather['main']['temp']}°</li>
            <li>Pressão: {weather['main']['pressure']} °</li>
            <li>Umidade: {weather['main']['humidity']}%</li>
          </ul>
        </section>

        <footer>
          <a href='https://fernandocarvalhodev.com'>Desenvolvido por Fernando Carvalho</a>
        </footer>

      </Fragment>
      
    );

  };

};

export default App;
