// src/components/NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/create-reise">Neue Reise erstellen</Link></li>
        <li><Link to="/reisen">Reisen suchen und löschen</Link></li>
        <li><Link to="/update-reise">Reise aktualisieren</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
