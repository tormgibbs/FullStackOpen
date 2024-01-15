import axios from 'axios'



const listUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const retrieveUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'


const getCountryList = () => {
  const request = axios.get(listUrl)
  return request.then(response => response.data.map(c => c.name.common))
}

const retrieveCountry = async country => {
  const request = axios.get(`${retrieveUrl}/${country}`)
  const response = await request
  const countryData = {
    capital: response.data.capital[0],
    area: response.data.area,
    languages: Object.values(response.data.languages),
    flag: response.data.flags.png
  }
  return countryData
}

// const getWeather = (capital) => {
//   const geoRequest = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=5&appid=${api_key}`)

//   geoRequest.then(geoResponse => {
//     const coordinates ={
//       lat: geoResponse.data[0].lat,
//       lon: geoResponse.data[0].lon
//     }
//       // console.log(geoResponse.data[0])
//     console.log(coordinates)

//     const weatherRequest = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${api_key}`)


//     weatherRequest.then(weatherResponse => {
//       const weatherInfo = {
//         temp: weatherResponse.data.main.temp,
//         speed: weatherResponse.data.wind.speed
//       }
//       console.log(weatherInfo)
//     })
//   })
  
// }


const getWeather = (capital, api_key) => {
  return axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
    .then(response => {
      console.log(response.data)
       const weatherInfo = {
        temp: response.data.main.temp,
        speed: response.data.wind.speed,
        icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      }
      console.log(weatherInfo)
      return weatherInfo
    })    
}



// https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png

export default { getCountryList, retrieveCountry, getWeather}