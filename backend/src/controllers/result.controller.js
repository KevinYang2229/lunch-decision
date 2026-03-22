import {
  calculateTodayResult,
  fetchTodayResult,
} from '../services/result.service.js';

export const computeResult = async (req, res) => {
  try {
    const result = await calculateTodayResult();
    res.json({ success: true, result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getResult = async (req, res) => {
  try {
    const result = await fetchTodayResult();
    res.json({ success: true, result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
