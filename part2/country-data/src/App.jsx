/* eslint-disable react/prop-types */
const api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY

import { useState, useEffect } from "react"
import countryService from './services/countries'


const DisplayWeather = ({ country, showWeather }) => {
  const [weatherInfo, setWeatherInfo] = useState(null)
    
    console.log(api_key)

    useEffect(() => {
      if (showWeather) {
        countryService
          .getWeather(country.capital, api_key)
          .then(retrievedInfo => {
            setWeatherInfo(retrievedInfo)
            console.log(retrievedInfo)
          })
          console.log('showing weather')
      }
    },[country.capital, showWeather])
  
  if (!showWeather) {
    return;
  }

  if (!weatherInfo) {
    return;
  }

  return (
    <div>
      <h1>Weather in {country.capital}</h1>
      Temperature: {weatherInfo.temperature}<br/>
      <img src={weatherInfo.icon} alt="Weather icon"/><br/>
      Speed: {weatherInfo.speed} m/s
    </div>
    
  )
}

const CountryLine = ({ country, showWeather }) => {
  const [showComponent, setShowComponent] = useState(false)
  const label = showComponent ? 'hide' : 'show'

  return (
    <div>
    {country} <button onClick={() => setShowComponent(!showComponent)}>{label}</button>
    {showComponent && <DisplayCountryInfo showWeather={showWeather}  country={country}/>}
    </div>
  )
}

const DisplayCountryInfo = ({country, showWeather}) => {
  const [countryInfo, setCountryInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try{
        await countryService
          .retrieveCountry(country)
          .then(countryData => setCountryInfo(countryData))
      } catch (error) {
        console.error('Error fetching country data:', error)
      } finally {
        setLoading(false);
      }
    }
    fetchData()
  }, [country])

  if (loading) {
    return (
      <div>
        <p>Loading country information...</p>
      </div>
    )
  }

  return (
    <div>
      <h1>{country}</h1>
      {countryInfo && (
        <>
          Capital: {countryInfo.capital} <br />
          Area: {countryInfo.area}
          <h3>Languages:</h3>
          <ul>
            {countryInfo.languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={countryInfo.flag}/>
        </>
      )}
      <DisplayWeather showWeather={showWeather} country={countryInfo}/>
    </div>
    
  )
}



const DisplayCountries = ({ countries }) => {
  console.log('rendering country component')
  if (!countries) {
    return;
  }
  else if (countries.length === 0) {
    return <p>No country found</p>
  }
  else if (countries.length > 10) {
    return (
    <p>
      Too many matches, be more specific!
    </p>
    )
  }
  else if (countries.length === 1) {
    return countries.map((c) => (
      <DisplayCountryInfo key={c} country={c} showWeather={true}/>
    ))
  }
   return countries.map((c) => (
    <div key={c}>
      <CountryLine country={c} showWeather={false} />
    </div>
  ))
}


const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState(null)
  const [filterCountries, setFilterCountries] = useState(null)

  useEffect(() => {
    countryService.getCountryList().then(retrievedCountries => setCountries(retrievedCountries))
    console.log('retrieving contry list')
  },[])

  console.log('rendered App')

  const fetchingList = <p>Fetching Country List. Please Hold on....</p>

  const handleSearchInput = (event) => {
    setSearch(event.target.value);
  
    if (event.target.value.length === 0) {
      setFilterCountries(null);
    } else {
      if (countries) { // Check if countries is not null
        const searchFilter = countries.filter(
          c => c.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilterCountries(searchFilter);
      }
    }
  }
  

  return (
    <div>
      find countries: <input placeholder="Type country here" 
      onChange={handleSearchInput} value={search} /><br/>
      {!countries ? fetchingList : 
      <DisplayCountries countries={filterCountries} />
      }
      
    </div>
  )

}


export default App