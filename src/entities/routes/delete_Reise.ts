import express from 'express';
import { Reise } from '../Reise';

const router = express.Router();

router.delete('/api/Reise/:reiseId', async (req, res) => {
    const { reiseId } = req.params;

    try {
        const reise = await Reise.findOneOrFail({ where: { id: parseInt(reiseId) } }); // Versuchen, die Reise zu finden, oder Fehler werfen
        await reise.remove(); // Entfernen Sie die Reise und alle damit verbundenen Einträge in der Verknüpfungstabelle

        return res.json({ message: 'Reise erfolgreich gelöscht' });
    } catch (error) {
        console.error('Fehler beim Löschen der Reise:', error.message);
        return res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

export { router as deleteReiseRouter };
