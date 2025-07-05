// routes/summarize.js
const express = require("express");
const router = express.Router();
const { summarizeText } = require("../services/gptService");

router.post("/", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "요약할 텍스트가 없습니다." });
  }

  try {
    const summary = await summarizeText(text);
    return res.json({ success: true, summary });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
