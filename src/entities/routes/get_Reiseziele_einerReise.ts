import express from "express";
import { Reise } from "../Reise";

const router = express.Router();

router.get('/api/Reise/:reiseId/Reiseziele', async (req, res) => {
    const { reiseId } = req.params;

    try {
        // Finde die Reise anhand der ID und lade die zugehörigen Reiseziele
        const reise = await Reise.findOne({ where: { id: parseInt(reiseId) }, relations: ['reiseziele'] });

        // Überprüfe, ob die Reise existiert
        if (!reise) {
            return res.status(404).json({ msg: 'Reise not found' });
        }

        // Gib die Reiseziele der Reise als Antwort zurück
        return res.json(reise.reiseziele);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});

export { router as getReisezieleByReiseRouter };
