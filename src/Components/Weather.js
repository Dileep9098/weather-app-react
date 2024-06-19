// import React, { useState } from 'react'
// import './Weather.css';
// import { FaSearch,FaWind } from "react-icons/fa";
// import {MdLocationOn} from 'react-icons/md';
// import {WiHumidity} from 'react-icons/wi';

// const Weather = () => {

//     const [city, setCity] = useState('');
//     const [weather, setWeather] = useState();
//     const [error, setError] = useState('');

//     const API_KEY = "5acc1683650652bab831ecf7d57fd397";
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

//     function handleOnChange(event) {
//         setCity(event.target.value);
//     }

//     async function fetchData() {
//         try {
//             let response = await fetch(url);
//             let output = await response.json();
//             if(response.ok) {
//                 setWeather(output);
//                 console.log(output);
//                 setError('');
//             } else {
//                 setError('No data found. Please enter a valid city name.')
//             }
//         }
//         catch (error) {

//         }
//     }
//   return (
//     <div className='container'>
//         <div className='city'>
//             <input type='text' value={city} onChange={handleOnChange} placeholder='Enter any city name'></input>
//             <button onClick={() => fetchData()}>
//                 <FaSearch></FaSearch>
//             </button>
//         </div>

//         {
//             error && <p className='error-message'>{error}</p>
//         }
//         {
//             weather && weather.weather &&
//             <div className='content'>

//                 <div className='weather-image'>
//                     <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt=''></img>
//                     <h3 className='desc'>{weather.weather[0].description}</h3>
//                 </div>

//                 <div className='weather-temp'>
//                     <h2>{weather.main.temp}<span>&deg;C</span></h2>
//                 </div>

//                 <div className='weather-city'>
//                     <div className='location'>
//                         <MdLocationOn></MdLocationOn>
//                     </div>
//                     <p>{weather.name},<span>{weather.sys.country}</span></p>
//                 </div>

//                 <div className='weather-stats'>
//                     <div className='wind'>
//                         <div className='wind-icon'>
//                             <FaWind></FaWind>
//                         </div>
//                         <h3 className='wind-speed'>{weather.wind.speed}<span>Km/h</span></h3>
//                         <h3 className='wind-heading'>Wind Speed</h3>
//                     </div>    
//                     <div className='humidity'>
//                         <div className='humidity-icon'>
//                             <WiHumidity></WiHumidity>
//                         </div>
//                         <h3 className='humidity-percent'>{weather.main.humidity}<span>%</span></h3>
//                         <h3 className='humidity-heading'>Humidity</h3>
//                     </div>
//                 </div>
//             </div>
//         }

//     </div>
//   )
// }

// export default Weather


import React, { useState, useEffect } from 'react';
import './Weather.css';
import { FaSearch, FaWind } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { WiHumidity } from 'react-icons/wi';

const Weather = () => {
    const [city, setCity] = useState('');
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState('');

    const API_KEY = "5acc1683650652bab831ecf7d57fd397";
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

    useEffect(() => {
        fetchData(currentWeatherUrl);
        fetchForecast(forecastUrl);
    }, [city]);

    async function fetchData(url) {
        try {
            let response = await fetch(url);
            let data = await response.json();
            if (response.ok) {
                setCurrentWeather(data);
                setError('');
            } else {
                setError('No data found. Please enter a valid city name.');
            }
        } catch (error) {
            console.error('Error fetching current weather:', error);
        }
    }

    async function fetchForecast(url) {
        try {
            let response = await fetch(url);
            let data = await response.json();
            if (response.ok) {
                setForecast(data.list.filter(item => item.dt_txt.includes('12:00:00')));
                setError('');
            } else {
                setError('No forecast data found.');
            }
        } catch (error) {
            console.error('Error fetching forecast:', error);
        }
    }

    function handleOnChange(event) {
        setCity(event.target.value);
    }

    return (
        <>
            <div className="main">


                <div className="text-center  dashboard">
                    {/* <h1 className=''>Dashboard</h1> */}
                    <h1>Weather App</h1>
                </div>

                <div className='container'>
                    <div className='city'>
                        <input type='text' value={city} onChange={handleOnChange} placeholder='Enter any city name' />
                        <button onClick={() => fetchData(currentWeatherUrl)}>
                            <FaSearch />
                        </button>
                    </div>

                    {error && <p className='error-message'>{error}</p>}

                    {currentWeather && (
                        <div className='content'>
                            <div className='weather-image'>
                                <img src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`} alt='' />
                                <h3 className='desc'>{currentWeather.weather[0].description}</h3>
                            </div>

                            <div className='weather-temp'>
                                <h2>{currentWeather.main.temp}<span>&deg;C</span></h2>
                            </div>

                            <div className='weather-city'>
                                <div className='location'>
                                    <MdLocationOn />
                                </div>
                                <p>{currentWeather.name}, <span>{currentWeather.sys.country}</span></p>
                            </div>

                            <div className='weather-stats'>
                                <div className='wind'>
                                    <div className='wind-icon'>
                                        <FaWind />
                                    </div>
                                    <h3 className='wind-speed'>{currentWeather.wind.speed}<span>Km/h</span></h3>
                                    <h3 className='wind-heading'>Wind Speed</h3>
                                </div>
                                <div className='humidity'>
                                    <div className='humidity-icon'>
                                        <WiHumidity />
                                    </div>
                                    <h3 className='humidity-percent'>{currentWeather.main.humidity}<span>%</span></h3>
                                    <h3 className='humidity-heading'>Humidity</h3>
                                </div>
                            </div>
                        </div>
                    )}

                    {forecast.length > 0 && (
                        <div className='forecast'>
                            <h2 style={{ fontWeight: '600' }}>5-Day Forecast</h2>
                            <div className='forecast-list'>
                                {forecast.map((forecastItem, index) => (
                                    <div key={index} className='forecast-item'>
                                        <div>{forecastItem.dt_txt.split(' ')[0]}</div>
                                        <div>
                                            <img src={`https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}.png`} alt='' />
                                        </div>
                                        <div>{forecastItem.weather[0].description}</div>
                                        <div>{forecastItem.main.temp}&deg;C</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Weather;
