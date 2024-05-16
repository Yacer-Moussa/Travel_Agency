import express from "express";
import { Reise} from "../Reise";
const router =express.Router();

router.post ('/api/Reise',async (req, res)=>{
    const{
        name,
        reisezeitraum,
        beschreibung,
        bild,
        Teilnehmer
    } =req.body;

    const neueReise = Reise.create({
        name: name,
        reisezeitraum:reisezeitraum,
        beschreibung: beschreibung,
        bild:bild,
        Teilnehmer:Teilnehmer
    });

await neueReise.save();
return res.json(neueReise)

});
export{
    router as createReiseRouter
}