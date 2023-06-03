import { Router } from "express";
import { getAllDestinos, getDestinoById, createDestino } from "../controllers/destinos.contollers";
import passport from "passport";
const router = Router();

router.get('/destinos', getAllDestinos);
router.get('/destinos/:idDestino', getDestinoById);
router.post('/destinos/:idUser',passport.authenticate('jwt',{session:false, }), createDestino);

export default router;