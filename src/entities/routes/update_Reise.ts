import express from "express";
import { Reiseziel } from "../Reiseziel";

const router = express.Router();

router.put('/api/Reiseziel/:reisezielId', async (req, res) => {
    const { reisezielId } = req.params;
    const { name, zeitraum, beschreibung, aktivitaeten, fotos } = req.body;

    try {
        // Finde das Reiseziel anhand der ID
        const reiseziel = await Reiseziel.findOne({ where: { zid: parseInt(reisezielId) } });

        // Überprüfe, ob das Reiseziel existiert
        if (!reiseziel) {
            return res.status(404).json({ msg: 'Reiseziel not found' });
        }

        // Aktualisiere die Eigenschaften des Reiseziels
        if (name) reiseziel.name = name;
        if (zeitraum) reiseziel.zeitraum = zeitraum;
        if (beschreibung) reiseziel.beschreibung = beschreibung;
        if (aktivitaeten) reiseziel.aktivitaeten = aktivitaeten;
        if (fotos) reiseziel.fotos = fotos;

        // Speichere die Änderungen in der Datenbank
        await reiseziel.save();

        return res.json({ msg: 'Reiseziel updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});

export { router as updateReisezielRouter };
