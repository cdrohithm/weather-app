import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import navigation from "./navigation.png";
import "./Search.css";
import WeatherContext from "../../context/WeatherContext";
import Loader from "../Loader/Loader";

function Search(props) {
    const [city, setCity] = useState('');
    const [loader, setLoader] = useState(false);
    const history = useNavigate();

    const { state, setState } = useContext(WeatherContext)
    const handleSubmit = () => {
        setState({ ...state, weather: null });
        setLoader(true);
        if (city) {
            axios
                .get('https://weather-webapp-server.herokuapp.com/weather/' + city)
                .then(res => {
                    setLoader(false);
                    setState({ ...state, weather: res?.data });
                    history('/weather/' + city);
                })
                .catch(err => {
                    console.log(err.message);
                    setLoader(false)
                    alert(err?.response?.data?.message || err?.message)
                });
        }
    }
    const handleKeyPress = e => {
        console.log(e)
        if (e?.key?.toLowerCase() === "enter") {
            handleSubmit();
        }
    }
    const handleChange = e => {
        const { value } = e.target;
        setCity(value)
    }
    const handleLocation = () => {
        setLoader(true)
        navigator.geolocation.getCurrentPosition(function(position) {
            let lat = position?.coords?.latitude;
            let long = position?.coords?.longitude;
            if (lat && long) {
                axios
                .get('https://weather-webapp-server.herokuapp.com/weather/' + lat + '/' + long)
                .then(res => {
                    console.log(res?.data)
                    setState({ ...state, weather: res?.data });
                    setLoader(false)
                    const city = res?.data?.name;
                    history('/weather/' + city);
                })
                .catch(err => {
                    console.log(err.message);
                    setLoader(false);
                    alert(err?.response?.data?.message || err?.message)
                });
            }
        });
    }
    return (
      <>
        <div className="search">
            <div className="current" onClick={handleLocation}>
                <img height="18" width="18" src={navigation} />
            </div>
            <input 
                type="text"
                value={city}
                onChange={handleChange} 
                onKeyPress={handleKeyPress}
            />
            <button onClick={handleSubmit}>Search</button>
        </div>
        <div className="position">
          {loader ? <Loader /> : ("")}
          </div>
      </>
    )
}

export default Search;