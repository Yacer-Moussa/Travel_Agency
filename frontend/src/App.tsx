// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Reisen from './pages/Reisen';
import CreateReise from './pages/CreateReise';
import Reiseziel from './pages/Reiseziel';
import CityInfo from './pages/CityInfo';
import NavBar from './components/NavBar';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/reisen" Component={Reisen} />
          <Route path="/create-reise" element={<CreateReise />} />
          <Route path="/reiseziel" element={<Reiseziel />} />
          <Route path="/city-info" element={<CityInfo />} />
          <Route path="/update-reise" element={<CreateReise />} />
          {/* Weitere Routen hier hinzufügen... */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
