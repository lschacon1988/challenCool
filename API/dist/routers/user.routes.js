"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const profile_controler_1 = require("../controllers/profile.controler");
const users_controllers_1 = require("../controllers/users.controllers");
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
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
router.get("/users", users_controllers_1.getAllUsers);
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
router.get("/user/:idUser", users_controllers_1.getUserById);
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
router.post("/user/:idUser/profile", passport_1.default.authenticate('jwt', { session: false }), profile_controler_1.createProfile);
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
router.put("/user/:idUser/profile", passport_1.default.authenticate('jwt', { session: false }), profile_controler_1.updateProfile);
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
router.delete("/user/:idUser", passport_1.default.authenticate('jwt', { session: false }), users_controllers_1.deleteUser);
exports.default = router;
