# Backend 구현 문서

# 목적
Node.js + Express 기반 API 서버 구현

---

# 파일 구조

```text
server/
├── server.js
├── routes/
│   └── analyze.js
├── services/
│   └── openaiService.js
```

---

# 주요 기능
- Express 서버 생성
- API 라우팅
- OpenAI 연동
- 에러 처리
- CORS 설정

---

# 필수 패키지

```bash
npm install express cors dotenv openai
```

---

# API Endpoint
POST /api/analyze

---

# 에러 처리
- OpenAI API 실패
- 네트워크 오류
- 빈 입력값
