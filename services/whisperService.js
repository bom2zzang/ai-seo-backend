// services/whisperService.js
const fs = require("fs");
const path = require("path");
const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function transcribeAudio(filePath) {
  try {
    const response = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: "whisper-1",
      language: "ko", // 한국어 기준 (원하는 언어로 설정 가능)
      response_format: "json",
    });

    return response.text;
  } catch (error) {
    console.error("[Whisper STT 오류]", error.message);
    throw error;
  }
}

module.exports = { transcribeAudio };
