// server/check_db.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

async function checkConnection() {
    console.log('DB 연결 테스트 시작...');
    console.log('URL:', process.env.SUPABASE_URL);
    
    try {
        const { data, error } = await supabase
            .from('analysis_logs')
            .select('*')
            .limit(1);

        if (error) {
            if (error.code === 'PGRST116' || (error.message && error.message.includes('relation "analysis_logs" does not exist'))) {
                console.error('❌ 오류: "analysis_logs" 테이블이 DB에 존재하지 않습니다.');
                console.log('👉 해결 방법: supabase/migrations/001_create_analysis_logs_table.sql 내용을 Supabase SQL Editor에서 실행해주세요.');
            } else {
                console.error('❌ DB 연결 오류:', error.message);
                console.log('에러 코드:', error.code);
            }
        } else {
            console.log('✅ DB 연결 성공! 테이블이 정상적으로 존재합니다.');
            console.log('현재 데이터 건수:', data ? data.length : 0);
        }
    } catch (err) {
        console.error('❌ 예기치 못한 오류:', err.message);
    }
}

checkConnection();
