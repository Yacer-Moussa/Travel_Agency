import express from "express";
import { Reise } from "../Reise";
import { Like } from "typeorm";

const router = express.Router();

router.get('/api/Reisen/search', async (req, res) => {
    const { name, reisezeitraum } = req.query;

    try {
        // Suche nach Reisen basierend auf dem Namen oder dem Reisezeitraum
        const reisen = await Reise.find({
            where: [
                { name: Like(`%${name}%`) }, // Suche nach dem Namen
                { reisezeitraum: Like(`%${reisezeitraum}%`) } // Suche nach dem Reisezeitraum
            ]
        });

        return res.json(reisen);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});

export { router as searchReisenRouter };
