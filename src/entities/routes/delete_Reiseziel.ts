import express from "express";
import { Reiseziel } from "../Reiseziel";
import { Reise } from "../Reise";

const router = express.Router();

router.delete('/api/Reise/:reiseId/Reiseziel/:reisezielId', async (req, res) => {
    const { reiseId, reisezielId } = req.params;

    // Finde die Reise
    const reise = await Reise.findOne({ where: { id: parseInt(reiseId) }, relations: ['reiseziele'] });

    if (!reise) {
        return res.status(404).json({ msg: 'Reise not found' });
    }
    
    // Finde das Reiseziel
    //const reiseziel = await Reiseziel.findOne({ where: { zid: parseInt(reisezielId)} });
    const reiseziel = reise.reiseziele.find(reiseziel => reiseziel.zid === parseInt(reisezielId));

    if (!reiseziel ) {
        return res.status(404).json({ msg: 'Reiseziel not found for the specified Reise' });
    }
    // Überprüfe, ob das Reiseziel wirklich zur gefundenen Reise gehört

    // Lösche das Reiseziel
    await reiseziel.remove();

    return res.json({ msg: 'Reiseziel successfully removed from Reise' });
});

export {
    router as deleteReisezielRouter
};
