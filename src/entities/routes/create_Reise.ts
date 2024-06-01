import express from "express";
import { Reise } from "../Reise";

const router = express.Router();

// Liste der gültigen deutschen Monatsnamen
const validMonths = [
    'januar', 'februar', 'märz', 'april', 'mai', 'juni', 
    'juli', 'august', 'september', 'oktober', 'november', 'dezember'
];

router.post('/api/Reise', async (req, res) => {
    const {
        name,
        reisezeitraum,
        beschreibung,
        bild,
        Teilnehmer
    } = req.body;

    // Validierung: Überprüfen, ob alle erforderlichen Felder vorhanden sind
    if (!name || !reisezeitraum || !beschreibung || !bild || !Teilnehmer) {
        return res.status(400).json({ 
            msg: 'Fehler: Alle Felder (name, reisezeitraum, beschreibung, bild, Teilnehmer) sind erforderlich.' 
        });
    }

    // Validierung: Überprüfen, ob der reisezeitraum ein gültiger Monatsname ist
    if (!validMonths.includes(reisezeitraum.toLowerCase())) {
        return res.status(400).json({ 
            msg: 'Fehler: Der reisezeitraum muss ein gültiger Monatsname sein (z.B. januar, februar, märz, ...).' 
        });
    }

    try {
        const neueReise = Reise.create({
            name: name,
            reisezeitraum: reisezeitraum,
            beschreibung: beschreibung,
            bild: bild,
            Teilnehmer: Teilnehmer
        });

        await neueReise.save();
        return res.json(neueReise);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Serverfehler beim Erstellen der Reise.' });
    }
});

export {
    router as createReiseRouter
};
