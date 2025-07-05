// routes/generateTitle.js
const express = require("express");
const router = express.Router();
const { generateTitle } = require("../services/gptService");

router.post("/", async (req, res) => {
  const { summary } = req.body;

  if (!summary) {
    return res.status(400).json({ error: "요약문이 없습니다." });
  }

  try {
    const titles = await generateTitle(summary);
    return res.json({ success: true, titles });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
