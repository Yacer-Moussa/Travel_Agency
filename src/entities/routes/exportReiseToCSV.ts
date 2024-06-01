// src/entities/routes/exportReiseToCSV.ts
import express from 'express';
import { Reise } from '../Reise';
import { createObjectCsvStringifier } from 'csv-writer';

const router = express.Router();

router.get('/api/Reise/:reiseId/export', async (req, res) => {
  const { reiseId } = req.params;

  try {
    // Finde die Reise anhand der ID und lade die zugehörigen Reiseziele
    const reise = await Reise.findOne({ where: { id: parseInt(reiseId) }, relations: ['reiseziele'] });

    // Überprüfe, ob die Reise existiert
    if (!reise) {
      return res.status(404).json({ msg: 'Reise not found' });
    }

    // Erstelle den CSV-Stringifier
    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: 'name', title: 'Name' },
        { id: 'reisezeitraum', title: 'Reisezeitraum' },
        { id: 'beschreibung', title: 'Beschreibung' },
        { id: 'bild', title: 'Bild' },
        { id: 'Teilnehmer', title: 'Teilnehmer' },
        { id: 'reiseziel_name', title: 'Reiseziel Name' },
        { id: 'reiseziel_zeitraum', title: 'Reiseziel Zeitraum' },
        { id: 'reiseziel_beschreibung', title: 'Reiseziel Beschreibung' },
        { id: 'reiseziel_aktivitaeten', title: 'Reiseziel Aktivitäten' },
        { id: 'reiseziel_fotos', title: 'Reiseziel Fotos' },
      ],
    });

    // Kombiniere die Daten der Reise und der Reiseziele
    const records = reise.reiseziele.map((reiseziel) => ({
      name: reise.name,
      reisezeitraum: reise.reisezeitraum,
      beschreibung: reise.beschreibung,
      bild: reise.bild,
      Teilnehmer: reise.Teilnehmer,
      reiseziel_name: reiseziel.name,
      reiseziel_zeitraum: reiseziel.zeitraum,
      reiseziel_beschreibung: reiseziel.beschreibung,
      reiseziel_aktivitaeten: reiseziel.aktivitaeten,
      reiseziel_fotos: reiseziel.fotos,
    }));

    // Erstelle den CSV-String
    const csv = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records);

    // Setze den Content-Type und sende die CSV-Datei
    res.header('Content-Type', 'text/csv');
    res.attachment(`reise_${reiseId}.csv`);
    return res.send(csv);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

export { router as exportReiseToCSVRouter };
