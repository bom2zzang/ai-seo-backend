// services/gptService.js
const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function summarizeText(text) {
  const prompt = `
다음은 영상 자막 또는 대화입니다. 핵심 내용을 2~3문단 정도로 요약해 주세요.
- 중복 내용은 생략해 주세요
- 맥락이 자연스럽도록 구성해 주세요

[입력 텍스트]
${text}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // GPT-4 쓰고 싶으면 'gpt-4'
      messages: [
        { role: "system", content: "당신은 영상 내용을 요약해주는 AI입니다." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content.trim();
  } catch (err) {
    console.error("[GPT 요약 오류]", err.message);
    throw err;
  }
}
// 추가 내용: 제목 생성 함수
async function generateTitle(summary) {
  const prompt = `
  다음 내용을 기반으로 유튜브 영상 제목을 5개 제안해 주세요.
  - 각각 40자 이내로 작성
  - 클릭 유도를 고려한 스타일 (ex. 궁금증 유발, 결과 강조)
  
  [요약된 텍스트]
  ${summary}
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "당신은 유튜브 제목을 잘 만드는 마케터입니다.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.9,
  });

  const raw = completion.choices[0].message.content;
  return raw
    .split("\n")
    .map((line) => line.replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean);
}

// 추가 내용: 키워드 생성 함수
async function generateKeywords(summary) {
  const prompt = `
  다음 내용을 기반으로 영상에 적합한 주요 키워드를 5~10개 추출해 주세요.
  - 한글 키워드 중심
  - 해시태그 포함 가능 (예: #촬영팁)
  - 검색 최적화를 고려
  
  [요약된 텍스트]
  ${summary}
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "당신은 영상 키워드 및 해시태그 전문가입니다.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  const raw = completion.choices[0].message.content;
  return raw
    .split(/[\n,]/)
    .map((k) => k.trim().replace(/^[-*]\s*/, ""))
    .filter(Boolean);
}
async function generateDescription(summary) {
  const prompt = `
  다음 내용을 바탕으로 영상 설명란에 쓸 문장을 작성해 주세요.
  - 2~3문단 정도
  - 시청자에게 어떤 영상인지 자연스럽게 소개하는 스타일로 작성
  
  [요약된 텍스트]
  ${summary}
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "당신은 유튜브 영상 설명문을 작성하는 마케터입니다.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  return completion.choices[0].message.content.trim();
}

module.exports = {
  summarizeText,
  generateTitle,
  generateKeywords,
  generateDescription,
};
