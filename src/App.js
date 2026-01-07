import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  // Fetch countries
  useEffect(() => {
    fetch("https://location-selector.labs.crio.do/countries")
      .then(res => res.json())
      .then(data => setCountries(data || []));
  }, []);

  // Fetch states when country changes

  
 useEffect(() => {
  if (!country) return;

  setStates([]);
  setState("");
  setCities([]);
  setCity("");

  fetch(`https://location-selector.labs.crio.do/country=${country}/states`)
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to fetch states");
      }
      return res.json();
    })
    .then(data => setStates(data || []))
    .catch(error => {
      console.error("Error fetching states:", error);
      setStates([]); 
    });
}, [country]);


  // Fetch cities when state changes
  useEffect(() => {
    if (!state) return;

    // setCities([]);
    // setCity("");

    fetch(
      `https://location-selector.labs.crio.do/country=${country}/state=${state}/cities`
      
    )
     .then(res => {
      if (!res.ok) {
        throw new Error("Failed to fetch cities");
      }
      return res.json();
    })
      
      .then(data => setCities(data))
      .catch(error => {
      console.error("Error fetching cities:", error);
      setCity("")
    });
     
  }, [country, state]);

  return (
    <div className="App">
      <h2>Select Location</h2>

      {/* Country */}
      <select value={country} onChange={e => setCountry(e.target.value)}>
        <option value="">Select country</option>
        {countries.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <br />

      {/* State */}
      <select
        value={state}
        onChange={e => setState(e.target.value)}
        disabled={!country}
      >
        <option value="">Select state</option>
        {states.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <br />

      {/* City */}
      <select
        value={city}
        onChange={e => setCity(e.target.value)}
        disabled={!state}
      >
        <option value="">Select city</option>
        {cities.map((c, i) => (
          <option key={i} value={c}>{c}</option>
        ))}
      </select>

      {city && (
        <div>
         You selected {city}, {state}, {country}
        </div>
      )}
    </div>
  );
}

export default App;
