import React, { useState, useEffect } from 'react';
import { createReise, searchReisen, updateReise, deleteReise, getReisezieleByReise, exportReiseToCSV, getReisen } from '../services/api';
import './CreateReise.css';

const CreateReise: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    reisezeitraum: '',
    beschreibung: '',
    bild: '',
    Teilnehmer: ''
  });
  const [searchQuery, setSearchQuery] = useState({
    name: '',
    reisezeitraum: ''
  });
  const [reiseUpdate, setReiseUpdate] = useState({
    reiseId: '',
    name: '',
    reisezeitraum: '',
    beschreibung: '',
    bild: '',
    Teilnehmer: ''
  });
  const [message, setMessage] = useState<string | null>(null);
  const [reisen, setReisen] = useState<any[]>([]);
  const [reiseziele, setReiseziele] = useState<any[]>([]);
  const [selectedReiseId, setSelectedReiseId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSearchQuery({
      ...searchQuery,
      [e.target.name]: e.target.value
    });
  };

  const handleReiseUpdateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setReiseUpdate({
      ...reiseUpdate,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createReise(formData);
      setMessage('Reise erfolgreich erstellt!');
      setFormData({
        name: '',
        reisezeitraum: '',
        beschreibung: '',
        bild: '',
        Teilnehmer: ''
      });
    } catch (error) {
      setMessage('Fehler beim Erstellen der Reise.');
      console.error(error);
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await searchReisen(searchQuery);
      setReisen(response.data);
    } catch (error) {
      console.error('Fehler bei der Suche:', error);
    }
  };

  const handleUpdateReise = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateReise(parseInt(reiseUpdate.reiseId), reiseUpdate);
      setMessage('Reise erfolgreich aktualisiert!');
    } catch (error) {
      setMessage('Fehler beim Aktualisieren der Reise.');
      console.error(error);
    }
  };

  const handleDelete = async (reiseId: number) => {
    try {
      await deleteReise(reiseId);
      setMessage('Reise erfolgreich gelöscht!');
      setReisen(reisen.filter((reise: any) => reise.id !== reiseId));
    } catch (error) {
      setMessage('Fehler beim Löschen der Reise.');
      console.error(error);
    }
  };

  const handleGetReiseziele = async (reiseId: number) => {
    try {
      const response = await getReisezieleByReise(reiseId);
      setReiseziele(response.data);
      setSelectedReiseId(reiseId);
      setMessage(null);
    } catch (error) {
      setMessage('Fehler beim Abrufen der Reiseziele');
      console.error(error);
    }
  };

  const handleDownloadCSV = (reiseId: number) => {
    const url = `http://localhost:8080/api/Reise/${reiseId}/export`;
    window.open(url, '_blank');
  };

  return (
    <div className="form-container">
      <h1>Neue Reise erstellen</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Reisezeitraum</label>
          <select name="reisezeitraum" value={formData.reisezeitraum} onChange={handleChange} required>
            <option value="">Wähle einen Monat</option>
            <option value="januar">Januar</option>
            <option value="februar">Februar</option>
            <option value="märz">März</option>
            <option value="april">April</option>
            <option value="mai">Mai</option>
            <option value="juni">Juni</option>
            <option value="juli">Juli</option>
            <option value="august">August</option>
            <option value="september">September</option>
            <option value="oktober">Oktober</option>
            <option value="november">November</option>
            <option value="dezember">Dezember</option>
          </select>
        </div>
        <div>
          <label>Beschreibung</label>
          <textarea name="beschreibung" value={formData.beschreibung} onChange={handleChange} required />
        </div>
        <div>
          <label>Bild</label>
          <input type="text" name="bild" value={formData.bild} onChange={handleChange} required />
        </div>
        <div>
          <label>Teilnehmer</label>
          <input type="text" name="Teilnehmer" value={formData.Teilnehmer} onChange={handleChange} required />
        </div>
        <button type="submit">Erstellen</button>
      </form>

      <h2>Reisen suchen</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={searchQuery.name} onChange={handleSearchChange} />
        </div>
        <div>
          <label>Reisezeitraum</label>
          <select name="reisezeitraum" value={searchQuery.reisezeitraum} onChange={handleSearchChange}>
            <option value="">Wähle einen Monat</option>
            <option value="januar">Januar</option>
            <option value="februar">Februar</option>
            <option value="märz">März</option>
            <option value="april">April</option>
            <option value="mai">Mai</option>
            <option value="juni">Juni</option>
            <option value="juli">Juli</option>
            <option value="august">August</option>
            <option value="september">September</option>
            <option value="oktober">Oktober</option>
            <option value="november">November</option>
            <option value="dezember">Dezember</option>
          </select>
        </div>
        <button type="submit">Suchen</button>
      </form>
      <ul>
        {reisen.map((reise) => (
          <li key={reise.id}>
            <p>{reise.id} - {reise.name} - {reise.reisezeitraum}</p>
            <button className="delete-button" onClick={() => handleDelete(reise.id)}>Löschen</button>
            <button className="view-button" onClick={() => handleGetReiseziele(reise.id)}>Reiseziele anzeigen</button>
            <button className="download-button" onClick={() => handleDownloadCSV(reise.id)}>Download CSV</button>
          </li>
        ))}
      </ul>

      {selectedReiseId && (
        <div className="reiseziele-container">
          <h2>Reiseziele für Reise {selectedReiseId}</h2>
          <ul>
            {reiseziele.map((reiseziel) => (
              <li key={reiseziel.zid}>
                <p>{reiseziel.name} - {reiseziel.zeitraum}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <h2>Reise aktualisieren</h2>
      <form onSubmit={handleUpdateReise}>
        <div>
          <label>Reise ID</label>
          <input type="text" name="reiseId" value={reiseUpdate.reiseId} onChange={handleReiseUpdateChange} required />
        </div>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={reiseUpdate.name} onChange={handleReiseUpdateChange} />
        </div>
        <div>
          <label>Reisezeitraum</label>
          <select name="reisezeitraum" value={reiseUpdate.reisezeitraum} onChange={handleReiseUpdateChange}>
            <option value="">Wähle einen Monat</option>
            <option value="januar">Januar</option>
            <option value="februar">Februar</option>
            <option value="märz">März</option>
            <option value="april">April</option>
            <option value="mai">Mai</option>
            <option value="juni">Juni</option>
            <option value="juli">Juli</option>
            <option value="august">August</option>
            <option value="september">September</option>
            <option value="oktober">Oktober</option>
            <option value="november">November</option>
            <option value="dezember">Dezember</option>
          </select>
        </div>
        <div>
          <label>Beschreibung</label>
          <textarea name="beschreibung" value={reiseUpdate.beschreibung} onChange={handleReiseUpdateChange} />
        </div>
        <div>
          <label>Bild</label>
          <input type="text" name="bild" value={reiseUpdate.bild} onChange={handleReiseUpdateChange} />
        </div>
        <div>
          <label>Teilnehmer</label>
          <input type="text" name="Teilnehmer" value={reiseUpdate.Teilnehmer} onChange={handleReiseUpdateChange} />
        </div>
        <button type="submit">Aktualisieren</button>
      </form>
    </div>
  );
};

export default CreateReise;
