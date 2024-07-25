import React, { useEffect, useState } from 'react'
export default function Weathercond() {
    let date = new Date();
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const [city, setcity] = useState('Mumbai');
    const [weatherData, setWeatherdata] = useState(null);
    const [error, setError] = useState(null);
    const api_key = ''; // Use your API key here
    const api_url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`

    async function currentWeather() {
        try {
            let weather = await fetch(api_url);
            let data = await weather.json();
            if (data.error) {
                setError(data.error.message);
                setWeatherdata(null);
            } else {
                setError(null);
                setWeatherdata(data);
                console.log(data);
            }
        }
        catch (err) {
            console.error(err);
            setError("Failed to fetch weather data.");
        }
    }

    useEffect(() => {
        currentWeather()
        // eslint-disable-next-line 
    }, []);

    const handleChange = (event) => {
        setcity(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        currentWeather();
    }
    return (
        <div style={{padding:'2.3rem'}}>
            <div className="container text-center text-dark" style={{ width: '20rem', padding: '1.9rem', backgroundColor: 'skyblue', borderRadius: '1.5rem' }}>
                {error && (
                    <>
                        <h4>{error}</h4>
                        <form onSubmit={handleSubmit}>
                            <input type="text" id="city_name" style={{ width: '13rem', outline: 'none' }} placeholder='Enter the city' onChange={handleChange} />
                            <input type="submit" value="GET" />
                        </form>
                    </>
                )}
                {weatherData && (
                    <>
                        <h4>{months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</h4>
                        <br />
                        <h3>{weatherData.location.name},{weatherData.location.region}</h3>
                        <br />
                        <img src={weatherData.current.condition.icon} alt="weather logo" />
                        <br />
                        <h4>{weatherData.current.temp_c}</h4>
                        <br />
                        <h4>{weatherData.current.condition.text}</h4>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <input type="text" id="city_name" style={{ width: '13rem', outline: 'none' }} placeholder='Enter the city' onChange={handleChange} />
                            <input type="submit" value="GET" />
                        </form>
                    </>
                )
                }
            </div>
        </div>
    )
}
