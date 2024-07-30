document.addEventListener('DOMContentLoaded', function () {
    const usernameModal = document.getElementById('username-modal');
    const usernameInput = document.getElementById('username-input');
    const usernameButton = document.getElementById('username-button');
    const usersList = document.getElementById('users-list');
    const messagesDiv = document.getElementById('messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    
    let username = '';
    let users = [];
    let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];

    // Display stored messages on load
    messages.forEach(message => addMessageToDOM(message));

    usernameButton.addEventListener('click', () => {
        username = usernameInput.value.trim();
        if (username) {
            usernameModal.style.display = 'none';
            users.push(username);
            localStorage.setItem('chatUsers', JSON.stringify(users));
            displayUsers();
        }
    });

    sendButton.addEventListener('click', () => {
        sendMessage();
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText) {
            const message = {
                username,
                text: messageText,
                timestamp: new Date().toLocaleTimeString()
            };
            messages.push(message);
            localStorage.setItem('chatMessages', JSON.stringify(messages));
            addMessageToDOM(message);
            messageInput.value = '';
        }
    }

    function addMessageToDOM(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `<strong>${message.username}:</strong> ${message.text} <span class="timestamp">${message.timestamp}</span>`;
        messagesDiv.appendChild(messageElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function displayUsers() {
        usersList.innerHTML = '';
        users.forEach(user => {
            const userElement = document.createElement('li');
            userElement.textContent = user;
            usersList.appendChild(userElement);
        });
    }

    setInterval(() => {
        users = JSON.parse(localStorage.getItem('chatUsers')) || [];
        displayUsers();
    }, 5000);
});
