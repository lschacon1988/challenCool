import { createProfile } from '../controllers/profile.controler';
import {  deleteUser, getAllUsers, getUserById, updateUser} from '../controllers/users.controllers'
import { Router } from 'express'

const router = Router();

/**
 * Get track
 * @swagger 
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Returns all users
 *     description: Devuelve una lista de usuarios
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */
router.get('/users', getAllUsers);
router.get('/user/:idUser', getUserById);
router.post('/user/:idUser/profile', createProfile)
router.put('/user/:idUser', updateUser);
router.delete('/user/:idUser', deleteUser);

export default router;