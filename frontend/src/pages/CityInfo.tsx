// src/pages/CityInfo.tsx
import React, { useState } from 'react';
import { getCityInfo } from '../services/api';
import './CityInfo.css';

const CityInfo: React.FC = () => {
  const [cityName, setCityName] = useState('');
  const [cityData, setCityData] = useState<any>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await getCityInfo(cityName);
      if (response.data.length === 0) {
        setMessage('Keine Daten gefunden');
        setCityData(null);
      } else {
        setCityData(response.data[0]);
        setMessage(null);
      }
    } catch (error) {
      setMessage('Fehler beim Abrufen der Stadtinformationen');
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h1>Stadtinformationen abrufen</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Stadtname</label>
          <input type="text" value={cityName} onChange={handleChange} required />
        </div>
        <button type="submit">Suchen</button>
      </form>
      {message && <p>{message}</p>}
      {cityData && (
        <div className="city-info">
          <h2>{cityData.name}</h2>
          <p><strong>Land:</strong> {cityData.country}</p>
          <p><strong>Breitengrad:</strong> {cityData.latitude}</p>
          <p><strong>Längengrad:</strong> {cityData.longitude}</p>
          <p><strong>Bevölkerung:</strong> {cityData.population}</p>
          <p><strong>Hauptstadt:</strong> {cityData.is_capital ? 'Ja' : 'Nein'}</p>
        </div>
      )}
    </div>
  );
};

export default CityInfo;
