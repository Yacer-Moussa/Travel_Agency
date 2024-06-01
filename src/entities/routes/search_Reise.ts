import express from "express";
import { Reise } from "../Reise";
import { Like } from "typeorm";

const router = express.Router();

router.get('/api/Reisen/search', async (req, res) => {
    const { name, reisezeitraum } = req.query;

    try {
        // Konvertiere die Suchbegriffe in Kleinbuchstaben
        const lowerName = name ? (name as string).toLowerCase() : null;
        const lowerReisezeitraum = reisezeitraum ? (reisezeitraum as string).toLowerCase() : null;

        let reisen;
        if (lowerName && lowerReisezeitraum) {
            reisen = await Reise.createQueryBuilder("reise")
                .where("LOWER(reise.name) LIKE :name", { name: `%${lowerName}%` })
                .andWhere("LOWER(reise.reisezeitraum) LIKE :reisezeitraum", { reisezeitraum: `%${lowerReisezeitraum}%` })
                .getMany();
        } else if (lowerName) {
            reisen = await Reise.createQueryBuilder("reise")
                .where("LOWER(reise.name) LIKE :name", { name: `%${lowerName}%` })
                .getMany();
        } else if (lowerReisezeitraum) {
            reisen = await Reise.createQueryBuilder("reise")
                .where("LOWER(reise.reisezeitraum) LIKE :reisezeitraum", { reisezeitraum: `%${lowerReisezeitraum}%` })
                .getMany();
        } else {
            reisen = await Reise.find();
        }

        return res.json(reisen);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});

export { router as searchReisenRouter };
