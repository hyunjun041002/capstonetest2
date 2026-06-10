import { fetching } from "../network/http.js";

const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatFeed = document.getElementById('chat-feed');
const sendBtn = document.getElementById('send-btn');
const newChatBtn = document.getElementById('new-chat-btn');

let currentChatroomId = null

// 입력창 글자 있을 때 버튼 활성화
chatInput.addEventListener('input', (e) => {
    if (e.target.value.trim() !== '') {
        sendBtn.removeAttribute('disabled');
        sendBtn.classList.remove('text-gray-600', 'bg-transparent');
        sendBtn.classList.add('bg-white', 'text-black', 'hover:bg-gray-200');
    } else {
        sendBtn.setAttribute('disabled', 'true');
        sendBtn.classList.remove('bg-white', 'text-black', 'hover:bg-gray-200');
        sendBtn.classList.add('text-gray-600', 'bg-transparent');
    }
});

// 메시지 화면에 추가
function appendMessage(role, content) {
    const messageRow = document.createElement('div');
    messageRow.className = `flex gap-4 ${role === 'user' ? 'justify-end' : 'justify-start'}`;

    if (role === 'user') {
        messageRow.innerHTML = `
            <div class="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed bg-[#2f2f2f] text-gray-100">
                ${content}
            </div>
        `;
    } else {
        messageRow.innerHTML = `
            <div class="flex gap-3 items-start">
                <div class="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-xs font-bold text-white shrink-0">AI</div>
                <div class="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed bg-transparent text-gray-200">
                    ${content}
                </div>
            </div>
        `;
    }

    chatFeed.appendChild(messageRow);
    chatFeed.scrollTop = chatFeed.scrollHeight;
}

// 채팅방 목록 불러오기
async function loadChatrooms() {
    try {
        const result = await fetching('/api/rooms', { method: 'GET' })
        const rooms = result.inf
        const container = document.querySelector('.mt-4.flex.flex-col.gap-1')

        container.innerHTML = '<p class="text-xs text-gray-500 font-semibold px-3 mb-2">최근 대화</p>'

        rooms.forEach(room => {
            const btn = document.createElement('button')
            btn.className = 'flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-[#212121] rounded-lg text-left truncate'
            btn.innerHTML = `<i data-lucide="message-square" class="w-4 h-4"></i><span>채팅방 ${room.id}</span>`
            btn.addEventListener('click', () => loadMessages(room.id))
            container.appendChild(btn)
        })

        lucide.createIcons()
    } catch(err) {
        console.log(err)
    }
}

// 특정 채팅방 메시지 불러오기
async function loadMessages(chat_id) {
    try {
        currentChatroomId = chat_id
        chatFeed.innerHTML = ''

        const result = await fetching(`/api/rooms/${chat_id}`, { method: 'GET' })
        const messages = result.inf

        messages.forEach(msg => {
            appendMessage('user', msg.question)
            appendMessage('ai', msg.answer)
        })
    } catch(err) {
        console.log(err)
    }
}

// New chat 버튼
newChatBtn.addEventListener('click', () => {
    currentChatroomId = null
    chatFeed.innerHTML = ''
    loadChatrooms()
})

// 폼 제출
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const messageText = chatInput.value.trim();
    if (!messageText) return;

    appendMessage('user', messageText);
    chatInput.value = '';
    sendBtn.setAttribute('disabled', 'true');
    sendBtn.classList.remove('bg-white', 'text-black', 'hover:bg-gray-200');
    sendBtn.classList.add('text-gray-600', 'bg-transparent');

    try {
        const result = await fetching('/api/chat', {
            method: 'POST',
            body: { message: messageText, chatroom_id: currentChatroomId }
        });
        currentChatroomId = result.inf.chatroom_id
        appendMessage('ai', result.inf.reply)
    } catch(err) {
        alert(err);
    }
});

window.addEventListener('load', () => {
    lucide.createIcons()
    loadChatrooms()
})