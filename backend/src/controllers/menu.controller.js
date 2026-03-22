import { addMenu, getTodayMenu } from '../services/menu.service.js';

export const createMenu = async (req, res) => {
  try {
    const menu = await addMenu(req.body);
    res.json({ success: true, menu });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const fetchTodayMenu = async (req, res) => {
  try {
    const menu = await getTodayMenu();
    res.json({ success: true, menu });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
