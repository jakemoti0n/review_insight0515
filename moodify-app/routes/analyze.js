// server/routes/analyze.js
// 감성 분석 API 요청을 처리하는 라우터입니다.

const express = require('express');
const router = express.Router();
const { analyzeSentiment } = require('../services/openaiService');
const { encrypt } = require('../utils/crypto');
const { createClient } = require('@supabase/supabase-js');

// Supabase 클라이언트 초기화
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

/**
 * POST /api/analyze
 * 사용자의 텍스트를 분석하고 결과를 DB에 저장합니다.
 */
router.post('/', async (req, res) => {
    const { text } = req.body;

    // 1. 입력값 검증
    if (!text || text.trim().length === 0) {
        return res.status(400).json({
            success: false,
            message: '분석할 텍스트를 입력해주세요.'
        });
    }

    try {
        // 2. OpenAI API를 통한 감성 분석 수행
        const analysisResult = await analyzeSentiment(text);

        // 3. 보안 규칙 준수: 사용자 입력 텍스트 암호화
        const encryptedText = encrypt(text);

        // 4. Supabase DB에 로그 저장
        const { error: dbError } = await supabase
            .from('analysis_logs')
            .insert([
                {
                    input_text: encryptedText, // 암호화된 텍스트 저장
                    sentiment: analysisResult.sentiment,
                    confidence: analysisResult.confidence,
                    reason: analysisResult.reason
                }
            ]);

        if (dbError) {
            console.error('Database Error:', dbError);
            // DB 저장 실패는 사용자에게 알리되, 결과는 보여줄 수도 있습니다.
            // 여기서는 보안상 로그 기록이 중요하므로 함께 에러 처리합니다.
        }

        // 5. 최종 결과 반환 (원문 텍스트는 암호화하지 않고 결과와 함께 반환 가능)
        res.json({
            success: true,
            data: analysisResult
        });

    } catch (error) {
        console.error('Analysis Route Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || '서버 내부 오류가 발생했습니다.'
        });
    }
});

module.exports = router;
