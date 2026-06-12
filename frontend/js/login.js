import { fetching } from "../network/http.js";

const loginForm = document.getElementById("loginForm");
const IdInput = document.getElementById("id");
const passwordInput = document.getElementById("password");

// 폼 제출 이벤트 리스너
loginForm.addEventListener("submit", async (e) => {
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
});
