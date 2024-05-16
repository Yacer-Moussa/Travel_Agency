import express from "express";
import axios from "axios";

const router = express.Router();

// Setze deinen API-Schlüssel als Konstante
const API_KEY = "PYOEHI/fUsMxiFk9GRQ9sA==J3N6TvR6izc543In";

router.get('/api/CityInfo', async (req, res) => {
    const { name } = req.query;

    try {
        if (!name) {
            return res.status(400).json({ msg: 'Name of the city is required' });
        }

        // Setze deinen API-Schlüssel als Teil des Anforderungskopfes
        const response = await axios.get(`https://api.api-ninjas.com/v1/city`, {
            params: { name },
            headers: {
                "x-api-key": API_KEY
            }
        });

        // Antwortdaten an den Client senden
        return res.json(response.data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});

export { router as cityInfoRouter };
