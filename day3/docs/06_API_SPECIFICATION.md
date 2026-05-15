# API 명세서

# Endpoint
POST /api/analyze

---

# Request

```json
{
  "text": "오늘 하루 정말 행복했어."
}
```

---

# Success Response

```json
{
  "success": true,
  "data": {
    "sentiment": "긍정",
    "confidence": 95,
    "reason": "긍정 표현이 포함되어 있습니다."
  }
}
```

---

# Error Response

```json
{
  "success": false,
  "message": "감성 분석 실패"
}
```

---

# 상태 코드

| 코드 | 의미 |
|---|---|
| 200 | 성공 |
| 400 | 잘못된 요청 |
| 500 | 서버 오류 |
