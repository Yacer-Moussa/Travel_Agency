// src/types.ts
export interface Reise {
    id: number;
    name: string;
    reisezeitraum: string;
    beschreibung: string;
    bild: string;
    Teilnehmer: string;
    created_at: Date;
    updated_at: Date;
    reiseziele: Reiseziel[];
  }
  
  export interface Reiseziel {
    zid: number;
    name: string;
    zeitraum: string;
    beschreibung: string;
    aktivitaeten: string;
    fotos: string;
    created_at: Date;
    updated_at: Date;
  }
  