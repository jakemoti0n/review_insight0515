// client/app.js
// Moodify AI 프론트엔드 로직

document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const currentCharCount = document.getElementById('currentCharCount');
    
    const resultModal = document.getElementById('resultModal');
    const loading = document.getElementById('loading');
    const resultContent = document.getElementById('resultContent');
    const errorContent = document.getElementById('errorContent');
    const errorMessage = document.getElementById('errorMessage');
    
    const sentimentBadge = document.getElementById('sentimentBadge');
    const confidenceValue = document.getElementById('confidenceValue');
    const confidenceFill = document.getElementById('confidenceFill');
    const sentimentReason = document.getElementById('sentimentReason');
    
    const closeBtns = document.querySelectorAll('.close-btn, .modal-close-btn');

    // 1. 입력 글자 수 체크 및 버튼 활성화 제어
    textInput.addEventListener('input', () => {
        const length = textInput.value.trim().length;
        currentCharCount.textContent = length;
        
        // 텍스트가 있을 때만 버튼 활성화
        analyzeBtn.disabled = length === 0;
    });

    // 2. 분석 버튼 클릭 이벤트
    analyzeBtn.addEventListener('click', async () => {
        const text = textInput.value.trim();
        if (!text) return;

        // 모달 열기 및 로딩 상태 표시
        showModal('loading');

        try {
            // 백엔드 API 호출
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });

            const result = await response.json();

            if (result.success) {
                renderResult(result.data);
            } else {
                showError(result.message || '분석에 실패했습니다.');
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            showError('서버와의 통신 중 오류가 발생했습니다.');
        }
    });

    // 3. 결과 렌더링 함수
    function renderResult(data) {
        const { sentiment, confidence, reason } = data;

        // 배지 텍스트 및 스타일 설정
        sentimentBadge.textContent = sentiment;
        sentimentBadge.className = 'result-badge'; // 클래스 초기화
        sentimentBadge.classList.add(`sentiment-${sentiment}`);

        // 신뢰도 바 애니메이션
        confidenceValue.textContent = confidence;
        setTimeout(() => {
            confidenceFill.style.width = `${confidence}%`;
        }, 100);

        // 분석 이유
        sentimentReason.textContent = reason;

        showModal('result');
    }

    // 4. 모달 제어 유틸리티
    function showModal(type) {
        resultModal.style.display = 'flex';
        loading.classList.add('hidden');
        resultContent.classList.add('hidden');
        errorContent.classList.add('hidden');

        if (type === 'loading') {
            loading.classList.remove('hidden');
        } else if (type === 'result') {
            resultContent.classList.remove('hidden');
        } else if (type === 'error') {
            errorContent.classList.remove('hidden');
        }
    }

    function showError(message) {
        errorMessage.textContent = message;
        showModal('error');
    }

    function closeModal() {
        resultModal.style.display = 'none';
        // 신뢰도 바 초기화 (다음 애니메이션을 위해)
        confidenceFill.style.width = '0%';
    }

    // 5. 이벤트 리스너: 모달 닫기
    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // 배경 클릭 시 닫기
    window.addEventListener('click', (e) => {
        if (e.target === resultModal) closeModal();
    });

    // ESC 키 누를 때 닫기
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});
