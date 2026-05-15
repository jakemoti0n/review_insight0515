# OpenAI 연동 문서

# 목적
OpenAI API 기반 감성 분석 구현

---

# 모델 추천
- gpt-4o-mini

---

# Prompt 전략

```text
너는 감성 분석 AI다.
반드시 JSON 형식만 반환해라.

{
  "sentiment": "긍정 | 부정 | 중립",
  "confidence": 숫자,
  "reason": "분석 이유"
}
```

---

# 응답 예시

```json
{
  "sentiment": "긍정",
  "confidence": 92,
  "reason": "긍정적인 표현이 반복적으로 사용되었습니다."
}
```

---

# 구현 체크리스트

- [ ] API Key 연결
- [ ] JSON 응답 강제
- [ ] 예외 처리
- [ ] 토큰 절약 전략
