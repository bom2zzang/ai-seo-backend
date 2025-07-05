const express = require("express");
const router = express.Router();
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB 제한
});

router.post("/", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, error: "파일이 업로드되지 않았습니다." });
    }

    const formData = new FormData();
    formData.append("file", req.file.buffer, {
      filename: req.file.originalname || "audio.mp4",
      contentType: req.file.mimetype || "video/mp4",
    });
    formData.append("model", "whisper-1");

    const response = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.json({
      success: true,
      text: response.data.text,
    });
  } catch (error) {
    console.error("Whisper API 오류:", error?.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error?.response?.data || "STT 처리 중 오류가 발생했습니다.",
    });
  }
});

module.exports = router;
