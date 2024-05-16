import express from "express";
import { Reise } from "../Reise";

const router = express.Router();

router.put('/api/Reise/:reiseId', async (req, res) => {
    const { reiseId } = req.params;
    const { name, reisezeitraum, beschreibung, bild, Teilnehmer } = req.body;

    try {
        // Finde die Reise anhand der ID
        const reise = await Reise.findOne({ where: { id: parseInt(reiseId) } });

        // Überprüfe, ob die Reise existiert
        if (!reise) {
            return res.status(404).json({ msg: 'Reise not found' });
        }

        // Aktualisiere die Eigenschaften der Reise
        if (name) reise.name = name;
        if (reisezeitraum) reise.reisezeitraum = reisezeitraum;
        if (beschreibung) reise.beschreibung = beschreibung;
        if (bild) reise.bild = bild;
        if (Teilnehmer) reise.Teilnehmer = Teilnehmer;

        // Speichere die Änderungen in der Datenbank
        await reise.save();

        return res.json({ msg: 'Reise updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});

export { router as updateReiseRouter };
