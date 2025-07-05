// routes/stt.js
const express = require("express");
const router = express.Router();
const { transcribeAudio } = require("../services/whisperService");

router.post("/", async (req, res) => {
  const { path: filePath } = req.body;

  if (!filePath) {
    return res.status(400).json({ error: "파일 경로가 필요합니다." });
  }

  try {
    const text = await transcribeAudio(filePath);
    return res.json({ success: true, text });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
