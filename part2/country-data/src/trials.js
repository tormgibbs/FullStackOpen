// const DisplayCountryInfo = ({country}) => {
//   const [countryInfo, setCountryInfo] = useState(null)

//   const hook = () => {
//     axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
//     .then(response => {
//       const countryData = {
//       capital : response.data.capital[0],
//       area: response.data.area,
//       languages: response.data.languages
//     }
//     setCountryInfo(countryData)
//   })
//   }

//   useEffect(hook, [country])
//   console.log(countryInfo)
//   return (
//     <>
//       <h1>{country}</h1>
//       Capital: <br />
//       Area: <br />
//       <h3>Languages</h3>
      
//     </>
//   )
// }