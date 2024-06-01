import express from 'express';
import { createQueryBuilder } from 'typeorm';
import { Reise } from '../Reise';

const router = express.Router();

router.get('/api/Reise', async (req, res) => {
	
        const reise = await Reise.find()

	return res.json(reise);
});

export { router as fetchReisenRouter };