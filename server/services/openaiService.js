// server/services/openaiService.js
// OpenAI API를 사용하여 감성 분석을 수행하는 서비스입니다.

const OpenAI = require('openai');
require('dotenv').config();

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * 텍스트를 분석하여 감성 결과를 반환합니다.
 * @param {string} text - 분석할 사용자 입력 텍스트
 * @returns {Promise<Object>} - { sentiment, confidence, reason }
 */
async function analyzeSentiment(text) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // 문서 04_OPENAI_INTEGRATION.md 권장 모델
            messages: [
                {
                    role: "system",
                    content: `너는 감성 분석 AI다. 사용자의 입력에 대해 반드시 아래와 같은 JSON 형식으로만 답변해라.
                    {
                        "sentiment": "긍정 | 부정 | 중립",
                        "confidence": 0에서 100 사이의 숫자,
                        "reason": "한국어로 된 분석 이유 설명"
                    }`
                },
                {
                    role: "user",
                    content: text
                }
            ],
            response_format: { type: "json_object" } // JSON 응답 강제
        });

        // 결과 파싱
        const result = JSON.parse(response.choices[0].message.content);
        return result;
    } catch (error) {
        console.error('OpenAI API Error:', error);
        throw new Error('AI 분석 중 오류가 발생했습니다.');
    }
}

module.exports = { analyzeSentiment };
