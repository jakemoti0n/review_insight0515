# 보안 및 환경 변수 관리

# 보안 원칙
- API Key는 서버에서만 사용
- 클라이언트 노출 금지
- .env 사용

---

# .env 예시

```env
OPENAI_API_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

---

# 권장 보안 전략
- Rate Limit 적용
- CORS 제한
- 요청 길이 제한
- 입력 검증

---

# 금지 사항
- 프론트엔드에 OpenAI Key 저장
- 공개 Repository에 .env 업로드
