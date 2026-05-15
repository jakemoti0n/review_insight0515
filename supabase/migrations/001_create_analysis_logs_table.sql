-- 001_create_analysis_logs_table.sql
-- 분석 로그를 저장하기 위한 테이블을 생성합니다.
-- 사용자 규칙에 따라 파일명 앞에 001_ 순서 번호를 붙였습니다.

CREATE TABLE analysis_logs (
  -- 각 로그의 고유 ID (UUID)
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- 사용자가 입력한 텍스트 (개인정보 보호를 위해 서버에서 암호화되어 저장될 예정)
  input_text TEXT NOT NULL,
  
  -- 분석된 감정 (긍정, 부정, 중립 등)
  sentiment VARCHAR(20) NOT NULL,
  
  -- 분석 결과의 신뢰도 (0-100 사이의 정수)
  confidence INT NOT NULL,
  
  -- AI가 분석한 이유 설명
  reason TEXT NOT NULL,
  
  -- 데이터 생성 시각 (기본값: 현재 시간)
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 주석: 이 테이블은 Supabase 대시보드의 SQL Editor에서 실행하거나 CLI를 통해 적용할 수 있습니다.
