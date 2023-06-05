import { createProfile } from "../controllers/profile.controler";
import {
   deleteUser,
   getAllUsers,
   getUserById,
   updateUser,
} from "../controllers/users.controllers";
import { Router } from "express";

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
 *
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */
router.get("/users", getAllUsers);
/**
 * Get track
 * @swagger
 * /api/user/{idUser}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Returns a user by ID
 *     description: Devuelve un usuario según su ID
 *     parameters:
 *       - in: path
 *         name: idUser
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario a buscar
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */
router.get("/user/:idUser", getUserById);
/**
 * Create Profile
 * @swagger
 * /api/user/{idUser}/profile:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create Profile
 *     description: Create a user profile by completing registration and granting provider status
 *     parameters:
 *       - in: path
 *         name: idUser
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       201:
 *         description: Created and user profile completed
 *       400:
 *         description: Bad request
 */
router.post("/user/:idUser/profile", createProfile);
/**
 * Update Profile
 * @swagger
 * /api/user/{idUser}
 * update:
 * tags:
 * - Users
 * summary: Update Profile
 * description: Update
 * parameters:
 * - in: path
 * name: idUser
 * schema:
 * 
 */
router.put("/user/:idUser", updateUser);
router.delete("/user/:idUser", deleteUser);

export default router;
