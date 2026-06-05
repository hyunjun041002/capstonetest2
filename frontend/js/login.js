import { fetching } from "../network/http.js";

const loginForm = document.getElementById('loginForm');
    const IdInput = document.getElementById('id');
    const passwordInput = document.getElementById('password');

    // 폼 제출 이벤트 리스너
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // 기본 폼 제출 동작(새로고침) 방지

        const id = IdInput.value;
        const password = passwordInput.value;

        let info = {
          id,
          password,
        };

      try {
    const data = await fetching("/auth/login", {
      method: "post",
      body: info,
    });
    let { status, inf } = await data;
    if (status == 200) window.location.href = "/";
  } catch (err) {
    alert(err);
  }

document.addEventListener('DOMContentLoaded', () => {
  //   const loginForm = document.getElementById('loginForm');
  //   const IdInput = document.getElementById('id');
  //   const passwordInput = document.getElementById('password');

  //   // 폼 제출 이벤트 리스너
  //   loginForm.addEventListener('submit', async (e) => {
  //       e.preventDefault(); // 기본 폼 제출 동작(새로고침) 방지

  //       const id = IdInput.value;
  //       const password = passwordInput.value;

  //       let info = {
  //         id,
  //         password,
  //       };

  //     try {
  //   const data = await fetching("/auth/login", {
  //     method: "post",
  //     body: info,
  //   });
  //   let { status, inf } = await data;
  //   if (status == 200) window.location.href = "/";
  // } catch (err) {
  //   alert(err);
  // }

        // 간단한 유효성 검사
        // if (!validateEmail(email)) {
        //     showNotification('올바른 이메일 형식을 입력해주세요.', 'error');
        //     return;
        // }

        // if (password.length < 6) {
        //     showNotification('비밀번호는 최소 6자리 이상이어야 합니다.', 'error');
        //     return;
        // }

        // // 로그인 성공 가상 처리 (실제 개발 시 이 부분에서 API 통신을 진행합니다)
        // showNotification('로그인에 성공했습니다! 환영합니다.', 'success');
        
        // // 성공 시 메인 화면 등으로 이동 (가상으로 1.5초 후 이동 설정)
        // setTimeout(() => {
        //     // window.location.href = 'index.html'; // 실제 시작 페이지가 있다면 주석 해제
        // }, 1500);
    });

    // 이메일 정규식 검사 함수
    // function validateEmail(email) {
    //     const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //     return re.test(email);
    // }

    // ChatGPT 스타일의 커스텀 메시지 알림창 생성 함수 (alert 사용 금지 규칙 준수)
    // function showNotification(message, type = 'success') {
    //     // 기존 알림창이 있다면 제거
    //     const existingToast = document.querySelector('.toast-notification');
    //     if (existingToast) {
    //         existingToast.remove();
    //     }

    //     // 새로운 알림창 엘리먼트 생성
    //     const toast = document.createElement('div');
    //     toast.className = `toast-notification ${type}`;
    //     toast.textContent = message;

    //     // 스타일 적용 (CSS 파일에 넣어도 되지만, 독립적인 동작을 위해 JS 스타일 부여)
    //     Object.assign(toast.style, {
    //         position: 'fixed',
    //         bottom: '20px',
    //         right: '20px',
    //         padding: '12px 24px',
    //         borderRadius: '6px',
    //         color: '#fff',
    //         fontSize: '14px',
    //         fontWeight: '500',
    //         zIndex: '1000',
    //         boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    //         transition: 'opacity 0.3s, transform 0.3s',
    //         transform: 'translateY(20px)',
    //         opacity: '0',
    //         backgroundColor: type === 'success' ? '#10a37f' : '#ef4444' // 성공은 초록색, 에러는 빨간색
    //     });

    //     document.body.appendChild(toast);

    //     // 부드럽게 나타나기
    //     setTimeout(() => {
    //         toast.style.opacity = '1';
    //         toast.style.transform = 'translateY(0)';
    //     }, 50);

    //     // 3초 후 부드럽게 사라지기
    //     setTimeout(() => {
    //         toast.style.opacity = '0';
    //         toast.style.transform = 'translateY(20px)';
    //         setTimeout(() => toast.remove(), 300);
    //     }, 3000);
    // }
});