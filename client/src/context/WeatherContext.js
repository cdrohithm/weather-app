import React, { createContext, useState } from "react";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [state, setState] = useState({
        weather: null
    });
    return <WeatherContext.Provider value={{ state, setState }}>
        {children}
    </WeatherContext.Provider>
}

export default WeatherContext;