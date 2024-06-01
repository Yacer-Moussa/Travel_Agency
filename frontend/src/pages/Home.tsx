// src/pages/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Willkommen zu Yacer Reisebüro</h1>
      <hr />
      <div className="button-container">
        <button onClick={() => navigate('/create-reise')}>Reise verwalten</button>
        <button onClick={() => navigate('/reiseziel')}>Reiseziel verwalten</button>
        <button onClick={() => navigate('/city-info')}>Stadtinfo anzeigen</button>
        <button onClick={() => navigate('/reisen')}>Alle Reisen schauen</button>
      </div>
    </div>
  );
};

export default Home;
