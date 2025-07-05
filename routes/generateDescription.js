// routes/generateDescription.js
const express = require("express");
const router = express.Router();
const { generateDescription } = require("../services/gptService");

router.post("/", async (req, res) => {
  const { summary } = req.body;

  if (!summary) {
    return res.status(400).json({ error: "요약문이 없습니다." });
  }

  try {
    const description = await generateDescription(summary);
    return res.json({ success: true, description });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
