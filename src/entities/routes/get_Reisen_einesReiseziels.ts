import express from "express";
import { Reise } from "../Reise";
import { Reiseziel } from "../Reiseziel";

const router = express.Router();

router.get('/api/Reiseziel/:reisezielId/Reisen', async (req, res) => {
    const { reisezielId } = req.params;

    try {
        // Finde das Reiseziel
        const reiseziel = await Reiseziel.findOne({ where: { zid: parseInt(reisezielId)} , relations: ['reisen'] });

        if (!reiseziel) {
            return res.status(404).json({ msg: 'Reiseziel not found' });
        }

        // Gib alle Reisen zurück, die das Reiseziel enthalten
        const reisen = reiseziel.reisen;

        return res.json(reisen);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});

export { router as getReisenByReisezielRouter };
