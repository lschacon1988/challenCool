import { createProfile, updateProfile } from "../controllers/profile.controler";
import {
   deleteUser,
   getAllUsers,
   getUserById,
   updateUser,
} from "../controllers/users.controllers";
import { Router } from "express";
import passport from "passport";

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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Created and user profile completed
 *       400:
 *         description: Bad request
 *       401:
 *          description: Unauthorized
 */

router.post("/user/:idUser/profile",passport.authenticate('jwt',{session:false }) , createProfile);
/**
 * Update User
 * @swagger
 * /api/user/{idUser}/profile:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update User
 *     description: Update user and profile by providing user ID
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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

router.put("/user/:idUser/profile",passport.authenticate('jwt',{session:false }), updateProfile);
/**
 * Delete User
 * @swagger
 * /api/user/{idUser}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete User
 *     description: Delete a user by providing user ID
 *     parameters:
 *       - in: path
 *         name: idUser
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       400:
 *         description: Bad request
 */

router.delete("/user/:idUser",passport.authenticate('jwt',{session:false }), deleteUser);

export default router;
