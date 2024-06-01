import { createConnection } from 'typeorm';
import express from 'express';
import cors from 'cors';
import { Reise} from './entities/Reise';
import { Reiseziel } from './entities/Reiseziel';
import { createReiseRouter } from './entities/routes/create_Reise';
import { createReisezielRouter } from './entities/routes/create_Reiseziel';
import { deleteReiseRouter } from './entities/routes/delete_Reise';
import { fetchReisenRouter } from './entities/routes/fetch_Reise';
import { fetchReisezielRouter } from './entities/routes/fetch_Reiseziel';
import { deleteReisezielRouter } from './entities/routes/delete_Reiseziel';
import { getReisenByReisezielRouter } from './entities/routes/get_Reisen_einesReiseziels';
import { searchReisenRouter } from './entities/routes/search_Reise';
import { cityInfoRouter } from './entities/routes/externe_API';
import { updateReisezielRouter } from './entities/routes/update_Reise';
import { updateReiseRouter } from './entities/routes/update_Reiseziel';
import { getReisezieleByReiseRouter } from './entities/routes/get_Reiseziele_einerReise';
import { exportReiseToCSVRouter } from './entities/routes/exportReiseToCSV';

const app = express();
app.use(cors()); 
app.use(express.json());
const main = async () => {
	try {
		await createConnection({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'Yasser!123456',
			database: 'postgres',
            entities: [Reise,Reiseziel],
            synchronize: true
		});
		console.log('Connected to Postgres');
        app.use(express.json())
        app.use(createReiseRouter)
		app.use(createReisezielRouter)
		app.use(deleteReiseRouter)
		app.use(deleteReisezielRouter)
		app.use(fetchReisenRouter)
		app.use(fetchReisezielRouter)
		app.use(getReisenByReisezielRouter)
		app.use(searchReisenRouter)
		app.use(cityInfoRouter)
		app.use(updateReisezielRouter)
		app.use(updateReiseRouter)
		app.use(getReisezieleByReiseRouter)
		app.use(exportReiseToCSVRouter)

        app.listen(8080, () => {
			console.log('Now running on port 8080');
        });

	} catch (error) {
		console.error(error);
		throw new Error('Unable to connect to db');
	}
};

main();