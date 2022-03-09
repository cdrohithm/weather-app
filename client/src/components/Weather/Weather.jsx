import React, { useContext, useEffect, useRef } from "react";
import WeatherContext from "../../context/WeatherContext";
import mapboxgl from "!mapbox-gl";
/* eslint import/no-webpack-loader-syntax: off */
import "./Weather.css";
function Weather(props) {
    const { state } = useContext(WeatherContext)
    const { weather } = state;
    console.log(state)
    const map = useRef(null);

    const calculateTemperature = temperatureInKelvin => {
        let temperatureInCelsius = temperatureInKelvin - 273.15;
        return Math.round(temperatureInCelsius.toFixed(3))
    }
    useEffect(() => {
        if (weather?.coordinates && process.env.REACT_APP_ACCESS_TOKEN) {
            mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN;
            map.current = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [weather?.coordinates?.lon, weather?.coordinates?.lat],
                zoom: 10
            });
            map.current.on('load', function () {
                map.resize();
            });
        }
    }, [weather])
    return (
        <>
            {weather?.main ? (
                <div className="weather-container">
                    <div className="weather">
                        <div className="currentTemperature">
                            <h1>{calculateTemperature(weather?.main?.temp)} &#8451;</h1>
                        </div>
                        <div className="data">

                        <div className="temperatures">
                            <p><b>Low:</b> {calculateTemperature(weather?.main?.temp_min)} &#8451;</p>
                            <p><b>High:</b> {calculateTemperature(weather?.main?.temp_max)} &#8451;</p>
                            <p><b>Feels Like:</b> {calculateTemperature(weather?.main?.feels_like)}  &#8451;</p>
                        </div>
                        <div className="other">
                            <p><b>Humidity:</b> {weather?.main?.humidity}%</p>
                            <p><b>Pressure:</b> {weather?.main?.pressure}hPa</p>
                        </div>
                        </div>
                        <div className="description">
                            {/* <h3>{weather?.weather?.[0].description}</h3> */}
                            <img src={'https://openweathermap.org/img/wn/' + weather?.weather?.[0].icon + '@2x.png'} />
                        </div>
                    </div>
                    <div id="map"></div>
                </div>
            ) : ("")}
        </>
    )
}

export default Weather;