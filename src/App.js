import React, {useState} from 'react'
import './App.css'

const App = () => {
  const apiKey = 'aec9fee4a26accaeb55d650fc82fbd07'
  const [weatherData, setWeatherData] = useState([{}])
  const [city, setCity] = useState('')
  const getWeather = (event) => {
    if(event.key === 'Enter'){
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`).then(
        response => response.json()
      ).then(
        data => {
          setWeatherData(data)
        }
      )
    }
  }
  return (
    <div className='container'>
      <input 
      className='input' 
      placeholder='Enter City Name...'
      onChange={e => setCity(e.target.value)}
      value ={city} 
      onKeyPress = {getWeather} 
      />

      {typeof weatherData.main === 'undefined'?(
        <div>
          <p className='reminder'>Welcome to weather app! Enter a city name to start...</p>
        </div>
      ):<></>}
    </div>
  )
}

export default App;

