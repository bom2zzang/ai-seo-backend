// routes/upload.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// 저장 위치 및 파일명 지정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // uploads 폴더에 저장
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

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
