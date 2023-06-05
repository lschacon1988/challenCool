import { signIn, signUp } from "../controllers/auth.controllers";
import { Router } from "express";
import { updateUser } from "../controllers/users.controllers";
import passport from "passport";

const router = Router();

/**
 * Sign Up
 * @swagger
 * /api/signUp:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Sign Up
 *     description: Create a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
router.post("/signUp", signUp);

/**
 * Sign In
 * @swagger
 * /api/signIn:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Sign In
 *     description: Sign in to obtain JWT token
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Sign In successful, returns JWT token
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/signIn", signIn);
/**
 * Update User Credentials
 * @swagger
 * /api/update/{idUser}/credentials:
 *   put:
 *     tags:
 *       - Authentication
 *     summary: Update User Credentials
 *     description: Update the credentials (e.g., username, password) of a user
 *     security:
 *       - bearerAuth: []
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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User credentials updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */


router.put("/update/:idUser/credentials", passport.authenticate('jwt',{session:false }), updateUser)

export default router;
