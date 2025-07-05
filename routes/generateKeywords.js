// routes/generateKeywords.js
const express = require("express");
const router = express.Router();
const { generateKeywords } = require("../services/gptService");

router.post("/", async (req, res) => {
  const { summary } = req.body;

  if (!summary) {
    return res.status(400).json({ error: "요약문이 없습니다." });
  }

  try {
    const keywords = await generateKeywords(summary);
    return res.json({ success: true, keywords });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
