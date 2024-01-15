/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from 'axios'

const DisplayCountryInfo = ({ country }) => {
  const [countryInfo, setCountryInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`);
        const countryData = {
          capital: response.data.capital[0],
          area: response.data.area,
          languages: Object.values(response.data.languages),
          flag: response.data.flags.png
        };
        setCountryInfo(countryData);
      } catch (error) {
        console.error('Error fetching country data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [country]);
  


  if (loading) {
    return <p>Loading country information...</p>;
  }

  return (
    <>
      <h1>{country}</h1>
      {countryInfo && (
        <>
          <p>Capital: {countryInfo.capital}</p>
          <p>Area: {countryInfo.area}</p>
          <h3>Languages:</h3>
          <ul>
            {countryInfo.languages.map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
          <img src={countryInfo.flag} alt="" />
        </>
      )}
    </>
  );
};


export default DisplayCountryInfo