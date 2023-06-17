"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const destinos_contollers_1 = require("../controllers/destinos.contollers");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
/**
 * Get Destinations
 * @swagger
 * /api/destinos:
 *   get:
 *     tags:
 *       - Destinos
 *     summary: Get Destinations
 *     description: Returns a list of destinations from the database
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Destino'
 *       400:
 *         description: Bad Request
 */
router.get('/destinos', destinos_contollers_1.getAllDestinos);
/**
 * Get Destination by ID
 * @swagger
 * /api/destinos/{idDestino}:
 *   get:
 *     tags:
 *       - Destinos
 *     summary: Get Destination by ID
 *     description: Returns a specific destination by its ID
 *     parameters:
 *       - in: path
 *         name: idDestino
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the destination
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Destino'
 *       400:
 *         description: Destination not found
 *
 */
router.get('/destino/:idDestino', destinos_contollers_1.getDestinoById);
/**
 * Create Destination
 * @swagger
 * /api/destino/{idUser}:
 *   post:
 *     tags:
 *       - Destinos
 *     summary: Create Destination
 *     description: Create a new destination
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
 *             $ref: '#/components/schemas/Destino'
 *     responses:
 *       201:
 *         description: Destination created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *
 */
router.post('/destino/:idUser', passport_1.default.authenticate('jwt', { session: false, }), destinos_contollers_1.createDestino);
/**
 * Update Destination
 * @swagger
 * /api/destino/{idDestino}:
 *   put:
 *     tags:
 *       - Destinos
 *     summary: Update Destination
 *     description: Update an existing destination
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idDestino
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the destination
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Destino'
 *     responses:
 *       200:
 *         description: Destination updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *
 */
router.put('/destino/:idDestino', passport_1.default.authenticate('jwt', { session: false }), destinos_contollers_1.updateDestino);
/**
 * Delete Destination
 * @swagger
 * /api/destino/{idUser}/delete/{idDestino}/:
 *   delete:
 *     tags:
 *       - Destinos
 *     summary: Delete Destination
 *     description: Delete an existing destination
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idUser
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *       - in: path
 *         name: idDestino
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the destination
 *     responses:
 *       200:
 *         description: Destination deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.delete('/destino/:idUser/delete/:idDestino/', passport_1.default.authenticate('jwt', { session: false }), destinos_contollers_1.deleteDestino);
exports.default = router;
