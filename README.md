# 🎯 Node.js 백엔드 – AI 영상 SEO 자동화 도구

AI 기반으로 영상에서 텍스트를 추출하고, 자동으로 요약/제목/키워드/설명을 생성하는 백엔드 서비스입니다.

## 📦 기술 스택

- **Node.js (Express)** – RESTful API 서버
- **OpenAI API** – Whisper (STT), GPT (요약 및 생성)
- **Multer** – 영상 업로드 처리
- **dotenv** – 환경 변수 설정
- **Render** – 배포 플랫폼

---

## 📁 주요 디렉토리 구조

src/  
├── app.js # 메인 서버 진입점  
├── routes/ # 기능별 API 라우터 (upload, stt, summarize, generate 등)  
├── uploads/ # 업로드 파일 임시 저장 폴더  
├── .env # 환경 변수 파일 (로컬에만 존재)

---

## 🔄 기능 흐름

1. 사용자가 영상 파일 업로드 (`POST /upload`)
2. 업로드된 파일 경로로 STT 요청 (`POST /stt`)
3. Whisper API로 음성 → 텍스트 변환
4. 변환된 텍스트 기반으로 요약, 제목, 키워드, 설명 생성

---

## 🔐 환경 변수 (.env)

`.env` 파일 예시:

OPENAI_API_KEY=your-openai-api-key

> `.gitignore`에 반드시 `.env` 포함시켜야 합니다.

---

## 🚀 Render 배포 가이드

1. [Render](https://render.com) 가입 및 GitHub 연동
2. **New Web Service** → GitHub 저장소 선택
3. 아래 설정 입력:

   | 항목          | 값                    |
   | ------------- | --------------------- |
   | Build Command | `npm install`         |
   | Start Command | `node app.js`         |
   | Environment   | `Node`                |
   | Instance Type | `Free` 또는 `Starter` |

4. **Environment Variables 탭** → `OPENAI_API_KEY` 추가
5. 배포 완료 후, 고유한 백엔드 URL 할당

---

## 🧪 로컬 개발 및 테스트

- 백엔드 실행:
  ```bash
  node app.js
  ```
- Postman으로 API 테스트 가능
  - /upload: 영상 업로드
  - /stt: 텍스트 추출
  - /summarize
  - /generate/title
  - /generate/keywords
  - /generate/description

## ⚠️ 유의사항

- Whisper는 특정 포맷(.mp3, .mp4, .wav 등)만 허용됨
- 영상 업로드는 메모리 기반 처리로 용량 제한 설정 필요
- 프론트엔드와 연동 시 CORS 허용 설정 필수 (app.use(cors()))
- Render Free 플랜은 비활성 시 서버가 슬립됨

## ✅ 체크리스트

- .env 파일로 API 키 관리
- GitHub에 uploads/, .env 등 포함 ❌
- API 테스트 후 프론트엔드와 연동
- 백엔드 주소는 .env로 프론트에 전달
