import express from 'express';
import { createMenu, fetchTodayMenu } from '../controllers/menu.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/menu:
 *   post:
 *     summary: Add a new menu item
 *     tags: [Menu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - date
 *             properties:
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Menu item added successfully
 *       400:
 *         description: Bad request
 */
router.post('/menu', createMenu); // 新增菜單

/**
 * @swagger
 * /api/menu/today:
 *   get:
 *     summary: Get today's menu
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: List of menu items for today
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 menu:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get('/menu/today', fetchTodayMenu); // 取得今天菜單

export default router;
