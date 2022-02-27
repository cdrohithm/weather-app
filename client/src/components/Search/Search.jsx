import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import "./Search.css";
import WeatherContext from "../../context/WeatherContext";

function Search(props) {
    const [city, setCity] = useState('');
    const history = useNavigate();

    const { state, setState } = useContext(WeatherContext)
    const handleSubmit = () => {
        setState( {...state, weather: null });
        if (city) {
            axios
                .get('https://weather-webapp-server.herokuapp.com/weather/' + city)
                .then(res => {
                    setState({ ...state, weather: res?.data });
                    history('/weather/' + city);
                })
                .catch(err => {
                    console.log(err.message);
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
    return (
        <div className="search">
            <input 
                type="text"
                value={city}
                onChange={handleChange} 
                onKeyPress={handleKeyPress}
            />
            <button onClick={handleSubmit}>Search</button>
        </div>
    )
}

export default Search;