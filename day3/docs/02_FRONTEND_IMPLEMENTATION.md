# Frontend 구현 문서

# 목적
HTML/CSS/JavaScript 기반 감성 분석 UI 구현

---

# 파일 구조

```text
client/
├── index.html
├── style.css
└── app.js
```

---

# 주요 기능
- textarea 입력
- 버튼 상태 관리
- fetch API 호출
- loading 처리
- modal 렌더링
- 에러 처리

---

# 구현 체크리스트

- [ ] textarea 구현
- [ ] 글자 수 제한
- [ ] 버튼 disabled 처리
- [ ] API fetch 요청
- [ ] Loading Spinner
- [ ] 결과 Modal
- [ ] 에러 Modal

---

# API 호출 예시

```javascript
const response = await fetch('/api/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ text })
});
```
