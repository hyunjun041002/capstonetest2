import { fetching } from "../network/http.js";

const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
        // const chatFeed = document.getElementById('chat-feed');
const sendBtn = document.getElementById('send-btn');

console.log("ss")

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    console.log("asdsad")
            
    const messageText = chatInput.value
    console.log(messageText)

    try{

    }
    catch(err){
        alert(err)
    }
});

        // 입력창에 글자가 있을 때만 전송 버튼 활성화하는 함수
        // chatInput.addEventListener('input', (e) => {
        //     if (e.target.value.trim() !== '') {
        //         sendBtn.removeAttribute('disabled');
        //         sendBtn.classList.remove('text-gray-600', 'bg-transparent');
        //         sendBtn.classList.add('bg-white', 'text-black', 'hover:bg-gray-200');
        //     } else {
        //         sendBtn.setAttribute('disabled', 'true');
        //         sendBtn.classList.remove('bg-white', 'text-black', 'hover:bg-gray-200');
        //         sendBtn.classList.add('text-gray-600', 'bg-transparent');
        //     }
        // });

        // // 메시지를 화면에 추가하는 함수
        // function appendMessage(role, content) {
        //     const messageRow = document.createElement('div');
        //     messageRow.className = `flex gap-4 ${role === 'user' ? 'justify-end' : 'justify-start'}`;

        //     if (role === 'user') {
        //         messageRow.innerHTML = `
        //             <div class="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed bg-[#2f2f2f] text-gray-100">
        //                 ${content}
        //             </div>
        //         `;
        //     } else {
        //         messageRow.innerHTML = `
        //             <div class="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-xs font-bold text-white shrink-0">AI</div>
        //             <div class="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed bg-transparent text-gray-200">
        //                 ${content}
        //             </div>
        //         `;
        //     }

        //     chatFeed.appendChild(messageRow);
            
        //     // 새 메시지가 오면 자동으로 스크롤을 맨 아래로 이동
        //     chatFeed.scrollTop = chatFeed.scrollHeight;
        // }

        // 폼 제출(메시지 전송) 이벤트 처리
        

        // CDN 아이콘들을 화면에 그려주는 내장 함수 호출