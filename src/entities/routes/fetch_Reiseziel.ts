import express from 'express';
import { createQueryBuilder } from 'typeorm';
import { Reiseziel } from '../Reiseziel';

const router = express.Router();

router.get('/api/Reiseziel', async (req, res) => {
     const reiseziel = await Reiseziel.find()

	return res.json(reiseziel);
});

export { router as fetchReisezielRouter };