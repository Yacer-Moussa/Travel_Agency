// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Passe die URL an dein Backend an
});

export const getReisen = async () => {
  return await api.get('/Reise');
};

export const createReise = async (reise: any) => {
  return await api.post('/Reise', reise);
};

export const searchReisen = async (query: any) => {
    return await api.get('/Reisen/search', { params: query });
  };

  export const updateReise = async (reiseId: number, reise: any) => {
    return await api.put(`/Reise/${reiseId}`, reise);
  };
  
  export const updateReiseziel = async (reisezielId: number, reiseziel: any) => {
    return await api.put(`/Reiseziel/${reisezielId}`, reiseziel);
  };
  
  export const deleteReise = async (reiseId: number) => {
    return await api.delete(`/Reise/${reiseId}`);
  };

  export const createReiseziel = async (reiseziel: any) => {
    return await api.post('/Reiseziel', reiseziel);
  };
  
  export const fetchReiseziele = async () => {
    return await api.get('/Reiseziel');
  };
  
  export const deleteReiseziel = async (reiseId: number, reisezielId: number) => {
    return await api.delete(`/Reise/${reiseId}/Reiseziel/${reisezielId}`);
  };
  
  export const getReisenByReiseziel = async (reisezielId: number) => {
    return await api.get(`/Reiseziel/${reisezielId}/Reisen`);
  };

  export const getReisezieleByReise = async (reiseId: number) => {
    return await api.get(`/Reise/${reiseId}/Reiseziele`);
  };

  export const getCityInfo = async (name: string) => {
    return await api.get('/CityInfo', { params: { name } });
  };
  
  export const exportReiseToCSV = (reiseId: number) => {
    const url = `http://localhost:8080/api/Reise/${reiseId}/export`;
    window.open(url, '_blank');
  };
  
// Weitere API-Funktionen hier hinzufügen...
