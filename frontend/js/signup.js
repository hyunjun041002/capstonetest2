import { fetching } from "../network/http.js";

const registerForm = document.getElementById("registerForm");
const usernameInput = document.getElementById("username");
const IdInput = document.getElementById("id");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = usernameInput.value;
  const id = IdInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  let info = {
    id,
    name,
    password,
    password_check: confirmPassword.value,
  };

  try {
    const data = await fetching("/auth/signup", {
      method: "post",
      body: info,
    });
    let { status, inf } = await data;
    if (status == 201) {
      alert(inf.message);
      window.location.href = "/login";
    }
  } catch (err) {
    alert(err);
  }
});
