// src/pages/Reisen.tsx
import React, { useEffect, useState } from 'react';
import { getReisen } from '../services/api';
import './Reisen.css';

const Reisen: React.FC = () => {
  const [reisen, setReisen] = useState<any[]>([]);

  useEffect(() => {
    const fetchReisen = async () => {
      try {
        const response = await getReisen();
        setReisen(response.data);
      } catch (error) {
        console.error('Fehler beim Abrufen der Reisen:', error);
      }
    };

    fetchReisen();
  }, []);

  return (
    <div className="reisen-container">
      <h1>Alle Reisen</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Reisezeitraum</th>
            <th>Beschreibung</th>
            <th>Bild</th>
            <th>Teilnehmer</th>
          </tr>
        </thead>
        <tbody>
          {reisen.map((reise) => (
            <tr key={reise.id}>
              <td>{reise.id}</td>
              <td>{reise.name}</td>
              <td>{reise.reisezeitraum}</td>
              <td>{reise.beschreibung}</td>
              <td>{reise.bild}</td>
              <td>{reise.Teilnehmer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reisen;
