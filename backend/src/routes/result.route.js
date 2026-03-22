import express from 'express';
import { computeResult, getResult } from '../controllers/result.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/result/calculate:
 *   post:
 *     summary: Calculate today's lunch result
 *     tags: [Result]
 *     responses:
 *       200:
 *         description: Result calculated successfully
 *       400:
 *         description: Bad request
 */
router.post('/result/calculate', computeResult); // 計算今天結果（可排程呼叫）

/**
 * @swagger
 * /api/result/today:
 *   get:
 *     summary: Get today's lunch result
 *     tags: [Result]
 *     responses:
 *       200:
 *         description: Today's lunch result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 result:
 *                   type: object
 */
router.get('/result/today', getResult); // 取得今天結果

export default router;
