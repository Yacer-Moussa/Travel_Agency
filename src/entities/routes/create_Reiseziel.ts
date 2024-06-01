import express from "express";
import { Reiseziel } from "../Reiseziel";
import { Reise } from "../Reise";

const router = express.Router();

// Liste der gültigen deutschen Monatswochennamen
const validWeeks = [
    'erste woche', 'zweite woche', 'dritte woche', 'vierte woche'
];

router.post('/api/Reiseziel', async (req, res) => {
    const {
        name,
        zeitraum,
        beschreibung,
        aktivitaeten,
        fotos,
        reisen // Array von Reise-IDs, zu denen das Reiseziel gehört
    } = req.body;

    // Überprüfen, ob alle erforderlichen Felder vorhanden sind
    if (!name || !zeitraum || !beschreibung || !aktivitaeten || !fotos || !Array.isArray(reisen) || reisen.length === 0) {
        return res.status(400).json({ 
            msg: 'Fehler: Alle Felder (name, zeitraum, beschreibung, aktivitaeten, fotos, reisen) sind erforderlich und mindestens eine Reise-ID muss angegeben werden.' 
        });
    }

    // Validierung: Überprüfen, ob der zeitraum ein gültiger Monatswochenname ist
    if (!validWeeks.includes(zeitraum.toLowerCase())) {
        return res.status(400).json({ 
            msg: 'Fehler: Der zeitraum muss ein gültiger Monatswochenname sein (z.B. erste woche, zweite woche, dritte woche, vierte woche).' 
        });
    }

    try {
        // Neue Instanz des Reiseziels erstellen
        const neuesReiseziel = Reiseziel.create({
            name: name,
            zeitraum: zeitraum,
            beschreibung: beschreibung,
            aktivitaeten: aktivitaeten,
            fotos: fotos
        });

        // Verknüpfte Reisen laden
        const verknuepfteReisen = await Reise.findByIds(reisen);

        // Reisen dem Reiseziel zuweisen
        neuesReiseziel.reisen = verknuepfteReisen;

        // Reiseziel speichern
        await neuesReiseziel.save();

        return res.json(neuesReiseziel);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Serverfehler beim Erstellen des Reiseziels.' });
    }
});

export { router as createReisezielRouter };
