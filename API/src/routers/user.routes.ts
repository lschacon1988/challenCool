import { createProfile } from '../controllers/profile.controler';
import {  getAllUsers, getUserById} from '../controllers/users.controllers'
import { Router } from 'express'

const router = Router();

router.get('/users', getAllUsers);
router.get('/user/:idUser', getUserById);
router.post('/user/:idUser/profile', createProfile)

export default router;