import { Router } from "express";
import { getAllDestinos, getDestinoById, createDestino, updateDestino, deleteDestino } from "../controllers/destinos.contollers";
import passport from "passport";
const router = Router();

router.get('/destinos', getAllDestinos);
router.get('/destino/:idDestino', getDestinoById);
router.post('/destino/:idUser',passport.authenticate('jwt',{session:false, }), createDestino);
router.put('/destino/:idDestino',passport.authenticate('jwt',{session:false}), updateDestino);
router.delete('/destino/:idDestino',passport.authenticate('jwt',{session:false}), deleteDestino);

export default router;