import { createUser, getAllUsers} from '../controllers/auth.controllers'
import { Router } from 'express'

const router = Router();

router.get('/users', getAllUsers);
router.post('/users', createUser);

export default router;