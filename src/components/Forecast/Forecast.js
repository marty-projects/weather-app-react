import React, {useState} from 'react';
import Condtions from '../Conditions/Conditions';
import classes from './Forecast.module.css';



const Forecast = () => {
    let [responseObj, setResponseObj] = useState({});
    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('metric');
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false)

    

    function getForecast(e) {
        e.preventDefault();

        if(city.length === 0) {
            return setError(true);
        }

        setError(false);
        setResponseObj({});
        setLoading(true);

        let uriEncodedCity = encodeURIComponent(city);

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
            }
        };
        
        fetch(`https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`, options)
            .then(response => response.json())
            .then(response => {
                if(response.cod !== 200) {
                    throw new Error()
                }
                setResponseObj(response)
                setLoading(false);
            })
            .catch(err => {
                setError(true);
                setLoading(false);
                console.error(err.message)
            });
    }

    return (
        <div>
            <h2>Get current weather</h2>
            <form onSubmit={getForecast}>
                <input
                    type="text"
                    placeholder="Enter city name"
                    maxLength="50"
                    className={classes.textInput}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <label className={classes.Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "metric"}
                        value="metric"
                        onChange={(e) => setUnit(e.target.value)}
                        className={classes.Radio}
                       />
                    Celsius
                </label>
                <label className={classes.Radio}>
                    <input 
                        type="radio"
                        name="units"
                        checked={unit === "imperial"}
                        value="imperial"
                        onChange={(e) => setUnit(e.target.value)}
                        className={classes.Radio}
                    />
                    Fahrenheit
                </label>

                <button 
                    className={classes.Button}
                    type="submit"
                    >Get Forecast</button>
            </form>
            <Condtions
                responseObj = {responseObj}
                error={error}
                loading={loading}
            />
        </div>
    )
}

export default Forecast;