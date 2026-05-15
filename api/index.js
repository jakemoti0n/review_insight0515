// server/server.js
// Moodify AI 백엔드 서버의 메인 파일입니다.

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const analyzeRouter = require('../routes/analyze');

// .env 파일의 환경 변수 로드
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors()); // CORS 허용
app.use(express.json()); // JSON 파싱

// API 라우트 연결
app.use('/api/analyze', analyzeRouter);

// 정적 파일 제공 (프론트엔드 연결)
// 브라우저에서 http://localhost:3000 으로 접속하면 client/index.html이 뜹니다.
const path = require('path');
app.use(express.static(path.join(__dirname, '../public')));

// 서버 시작 (로컬 환경에서만 실행되도록 설정 가능)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Moodify AI 서버가 포트 ${PORT}에서 실행 중입니다.`);
    });
}

// Vercel 서버리스 함수를 위해 app 객체 내보내기
module.exports = app;
