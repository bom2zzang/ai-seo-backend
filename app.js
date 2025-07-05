// app.js
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 임시 라우터 테스트용
app.get("/", (req, res) => {
  res.send("AI SEO Backend is running");
});

// 포트 열기
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const uploadRouter = require("./routes/upload");
app.use("/upload", uploadRouter);

const sttRouter = require("./routes/stt");
app.use("/stt", sttRouter);

const summarizeRouter = require("./routes/summarize");
app.use("/summarize", summarizeRouter);

const generateTitleRouter = require("./routes/generateTitle");
app.use("/generate/title", generateTitleRouter);

const generateKeywordsRouter = require("./routes/generateKeywords");
app.use("/generate/keywords", generateKeywordsRouter);

const generateDescriptionRouter = require("./routes/generateDescription");
app.use("/generate/description", generateDescriptionRouter);
