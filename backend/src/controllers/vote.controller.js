import { submitVote } from "../services/vote.service.js";

export const createVote = async (req, res) => {
  try {
    await submitVote(req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
