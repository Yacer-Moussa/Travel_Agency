import express from 'express';
import { createQueryBuilder } from 'typeorm';
import { Reise } from '../Reise';

const router = express.Router();

router.get('/api/Reise', async (req, res) => {
	// const bankers = await createQueryBuilder(
	// 	'banker'
	// )
	// 	.where('id = :bankerId', { bankerId: 2 })
	// 	.getOne();

	// const clients = await createQueryBuilder(
	// 	'client'
	// )
	// 	.select('client')
	// 	.from(Client, 'client')
	// 	.leftJoinAndSelect(
	// 		'client.transactions',
	// 		'transaction'
	// 	)
	// 	.where('client.id = :clientId', {
	// 		clientId: 3,
	// 	})
	// 	.getOne();

	/*const reise = await createQueryBuilder(
		'reise'
	)
		.select('reise')
		.from(Reise, 'reise')
		.leftJoinAndSelect(
			'client.transactions',
			'transaction'
		)
		.where('reise.id = :reiseId', {reiseId: 1,})
		.getOne();*/
        const reise = await Reise.find()

	return res.json(reise);
});

export { router as fetchReisenRouter };