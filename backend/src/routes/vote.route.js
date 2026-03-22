import express from 'express';
import { createVote } from '../controllers/vote.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/votes:
 *   post:
 *     summary: Create a new vote
 *     tags: [Votes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - choice
 *             properties:
 *               userId:
 *                 type: string
 *               choice:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vote created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Bad request
 */
router.post('/', createVote);

export default router;
