import { fetching } from "../network/http.js";

const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatFeed = document.getElementById("chat-feed");
const sendBtn = document.getElementById("send-btn");
const newChatBtn = document.getElementById("new-chat-btn");

const logoutBtn = document.querySelector(".logout-btn");

// 로그아웃
logoutBtn.addEventListener("click", async () => {
  try {
    const result = await fetching("/auth/logout", { method: "get" });
    let { status, inf } = await result;
    if (status == 200) window.location.href = "/login";
  } catch (err) {
    console.log(err);
  }
});

let currentChatroomId = null;

//    입력창 활성화
sendBtn.disabled = true;

chatInput.addEventListener("input", () => {
  if (chatInput.value.trim()) {
    sendBtn.disabled = false;
    sendBtn.classList.add("active");
  } else {
    sendBtn.disabled = true;
    sendBtn.classList.remove("active");
  }
});

//메시지 출력
function appendMessage(role, content) {
  const messageRow = document.createElement("div");

  if (role === "user") {
    messageRow.className = "message user-message";

    messageRow.innerHTML = `
      <div class="user-bubble">
        ${content}
      </div>
    `;
  } else {
    messageRow.className = "message ai-message";

    messageRow.innerHTML = `
      <div class="avatar">AI</div>

      <div class="message-content">
        ${content}
      </div>
    `;
  }

  chatFeed.appendChild(messageRow);

  chatFeed.scrollTop = chatFeed.scrollHeight;
}

//채팅방 목록
async function loadChatrooms() {
  try {
    const result = await fetching("/api/rooms", {
      method: "GET",
    });

    const rooms = result.inf;

    const container = document.querySelector(".history");

    container.innerHTML = `
      <p class="history-title">
        최근 대화
      </p>
    `;

    rooms.forEach((room) => {
      const btn = document.createElement("button");

      btn.className = "history-item";

      btn.textContent = `💬 채팅방 ${room.id}`;

      btn.addEventListener("click", () => {
        loadMessages(room.id);
      });

      container.appendChild(btn);
    });
  } catch (err) {
    console.error(err);
  }
}

//특정 채팅방 불러오기
async function loadMessages(chatId) {
  try {
    currentChatroomId = chatId;

    chatFeed.innerHTML = "";

    const result = await fetching(`/api/rooms/${chatId}`, {
      method: "GET",
    });

    const messages = result.inf;

    messages.forEach((msg) => {
      appendMessage("user", msg.question);
      appendMessage("ai", msg.answer);
    });
  } catch (err) {
    console.error(err);
  }
}

//새 채팅
newChatBtn.addEventListener("click", () => {
  currentChatroomId = null;

  chatFeed.innerHTML = "";

  appendMessage(
    "ai",
    "안녕하세요! 순수 자바스크립트로 만든 GPT 대화창입니다. 무엇을 도와드릴까요?",
  );

  loadChatrooms();
});

//메시지 전송
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const messageText = chatInput.value.trim();

  if (!messageText) return;

  appendMessage("user", messageText);

  chatInput.value = "";

  sendBtn.disabled = true;
  sendBtn.classList.remove("active");

  try {
    const result = await fetching("/api/chat", {
      method: "POST",
      body: {
        message: messageText,
        chatroom_id: currentChatroomId,
      },
    });

    currentChatroomId = result.inf.chatroom_id;

    appendMessage("ai", result.inf.reply);
    loadChatrooms();
  } catch (err) {
    console.error(err);
    alert("메시지 전송 실패");
  }
});

//    초기 로드
window.addEventListener("load", () => {
  loadChatrooms();
});
