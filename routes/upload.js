// routes/upload.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// 메모리 저장소 + 50MB 제한
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});

// POST /upload
router.post("/", upload.single("video"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "파일이 업로드되지 않았습니다." });
  }

  return res.json({
    success: true,
    filename: req.file.filename,
    path: req.file.path,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });
});

module.exports = router;
