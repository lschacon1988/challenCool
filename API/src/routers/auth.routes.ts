import { signIn,signUp} from '../controllers/auth.controllers'
import { Router } from 'express'

const router = Router();

router.post('/signIn', signIn);
router.post('/signUp', signUp);

export default router;