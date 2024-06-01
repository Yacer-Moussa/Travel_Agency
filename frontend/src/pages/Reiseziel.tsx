import React, { useState, useEffect } from 'react';
import { createReiseziel, fetchReiseziele, deleteReiseziel, getReisenByReiseziel, updateReiseziel } from '../services/api';
import './Reiseziel.css';

const Reiseziel: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    zeitraum: '',
    beschreibung: '',
    aktivitaeten: '',
    fotos: '',
    reisen: [] as number[]
  });
  const [reisezielUpdate, setReisezielUpdate] = useState({
    reisezielId: '',
    name: '',
    zeitraum: '',
    beschreibung: '',
    aktivitaeten: '',
    fotos: ''
  });
  const [message, setMessage] = useState<string | null>(null);
  const [reiseziele, setReiseziele] = useState<any[]>([]);
  const [reisen, setReisen] = useState<any[]>([]);
  const [selectedReisezielId, setSelectedReisezielId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchReiseziele();
      setReiseziele(response.data);
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReisezielUpdateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setReisezielUpdate({
      ...reisezielUpdate,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createReiseziel(formData);
      setMessage('Reiseziel erfolgreich erstellt!');
      setFormData({
        name: '',
        zeitraum: '',
        beschreibung: '',
        aktivitaeten: '',
        fotos: '',
        reisen: []
      });
      const response = await fetchReiseziele();
      setReiseziele(response.data);
    } catch (error) {
      setMessage('Fehler beim Erstellen des Reiseziels.');
      console.error(error);
    }
  };

  const handleUpdateReiseziel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateReiseziel(parseInt(reisezielUpdate.reisezielId), reisezielUpdate);
      setMessage('Reiseziel erfolgreich aktualisiert!');
      const response = await fetchReiseziele();
      setReiseziele(response.data);
    } catch (error) {
      setMessage('Fehler beim Aktualisieren des Reiseziels.');
      console.error(error);
    }
  };

  const handleDelete = async (reiseId: number, reisezielId: number) => {
    try {
      await deleteReiseziel(reiseId, reisezielId);
      setMessage('Reiseziel erfolgreich gelöscht!');
      setReiseziele(reiseziele.filter((rz: any) => rz.zid !== reisezielId));
    } catch (error) {
      setMessage('Fehler beim Löschen des Reiseziels.');
      console.error(error);
    }
  };

  const handleGetReisen = async (reisezielId: number) => {
    try {
      const response = await getReisenByReiseziel(reisezielId);
      setReisen(response.data);
      setSelectedReisezielId(reisezielId);
    } catch (error) {
      setMessage('Fehler beim Abrufen der Reisen.');
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h1>Neues Reiseziel erstellen</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Zeitraum</label>
          <select name="zeitraum" value={formData.zeitraum} onChange={handleChange} required>
            <option value="">Wähle eine Woche</option>
            <option value="erste woche">Erste Woche</option>
            <option value="zweite woche">Zweite Woche</option>
            <option value="dritte woche">Dritte Woche</option>
            <option value="vierte woche">Vierte Woche</option>
          </select>
        </div>
        <div>
          <label>Beschreibung</label>
          <textarea name="beschreibung" value={formData.beschreibung} onChange={handleChange} required />
        </div>
        <div>
          <label>Aktivitäten</label>
          <textarea name="aktivitaeten" value={formData.aktivitaeten} onChange={handleChange} required />
        </div>
        <div>
          <label>Fotos</label>
          <input type="text" name="fotos" value={formData.fotos} onChange={handleChange} required />
        </div>
        <div>
          <label>Reisen (IDs)</label>
          <input type="text" name="reisen" value={formData.reisen.join(', ')} onChange={(e) => setFormData({ ...formData, reisen: e.target.value.split(',').map(Number) })} required />
        </div>
        <button type="submit">Erstellen</button>
      </form>
      <hr />
      <h2>Reiseziel aktualisieren</h2>
      <form onSubmit={handleUpdateReiseziel}>
        <div>
          <label>Reiseziel ID</label>
          <input type="text" name="reisezielId" value={reisezielUpdate.reisezielId} onChange={handleReisezielUpdateChange} required />
        </div>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={reisezielUpdate.name} onChange={handleReisezielUpdateChange} />
        </div>
        <div>
          <label>Zeitraum</label>
          <select name="zeitraum" value={reisezielUpdate.zeitraum} onChange={handleReisezielUpdateChange}>
            <option value="">Wähle eine Woche</option>
            <option value="erste woche">Erste Woche</option>
            <option value="zweite woche">Zweite Woche</option>
            <option value="dritte woche">Dritte Woche</option>
            <option value="vierte woche">Vierte Woche</option>
          </select>
        </div>
        <div>
          <label>Beschreibung</label>
          <textarea name="beschreibung" value={reisezielUpdate.beschreibung} onChange={handleReisezielUpdateChange} />
        </div>
        <div>
          <label>Aktivitäten</label>
          <textarea name="aktivitaeten" value={reisezielUpdate.aktivitaeten} onChange={handleReisezielUpdateChange} />
        </div>
        <div>
          <label>Fotos</label>
          <input type="text" name="fotos" value={reisezielUpdate.fotos} onChange={handleReisezielUpdateChange} />
        </div>
        <button type="submit">Aktualisieren</button>
      </form>
      <hr />
      <h2>Reiseziele anzeigen</h2>
      <ul>
        {reiseziele.map((reiseziel) => (
          <li key={reiseziel.zid}>
            <p>{reiseziel.zid} - {reiseziel.name} - {reiseziel.zeitraum}</p>
            <button className="delete-button" onClick={() => handleDelete(reiseziele[0].reisen[0].id, reiseziel.zid)}>Löschen</button>
            <button className="view-reisen-button" onClick={() => handleGetReisen(reiseziel.zid)}>Reisen anzeigen</button>
          </li>
        ))}
      </ul>
      <hr />
      {selectedReisezielId && (
        <>
          <h2>Reisen zu Reiseziel {selectedReisezielId}</h2>
          <ul>
            {reisen.map((reise) => (
              <li key={reise.id}>
                <p>{reise.id} - {reise.name} - {reise.reisezeitraum}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Reiseziel;
