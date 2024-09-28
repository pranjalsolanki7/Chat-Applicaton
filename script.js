// This event listener waits for the user to click the "Join" button after entering their username.
document.getElementById('join-btn').addEventListener('click', () => {
    // Get the username from the input field
    const usernameInput = document.getElementById('username-input').value;

    // Check if the input is not empty
    if (usernameInput.trim() !== '') {
        // Save the username in localStorage so it can be accessed later
        localStorage.setItem('chatUsername', usernameInput.trim());

        // Hide the username modal once the user joins
        document.getElementById('username-modal').style.display = 'none';

        // Load any previous chat messages from localStorage
        loadMessages();
    }
});

// This event listener waits for the user to click the "Send" button after typing a message.
document.getElementById('send-btn').addEventListener('click', () => {
    // Get the message from the input field
    const messageInput = document.getElementById('message-input').value;

    // Check if the message is not empty
    if (messageInput.trim() !== '') {
        // Retrieve the username that was stored in localStorage
        const username = localStorage.getItem('chatUsername');

        // Create a new message object with the username, message, and timestamp
        const newMessage = {
            username: username,
            message: messageInput,
            timestamp: new Date().toLocaleTimeString(), // Current time as the message timestamp
        };

        // Save the message to localStorage
        saveMessage(newMessage);

        // Display the message in the chat area
        displayMessage(newMessage);

        // Clear the input field after sending the message
        document.getElementById('message-input').value = '';
    }
});

// This function loads previous messages from localStorage and displays them in the chat area.
function loadMessages() {
    // Get all messages from localStorage (it stores as a JSON array of messages)
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];

    // Loop through each message and display it on the page
    messages.forEach((msg) => displayMessage(msg));
}

// This function saves a new message to localStorage.
function saveMessage(message) {
    // Get all previous messages from localStorage (if none exist, use an empty array)
    let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];

    // Add the new message to the list of messages
    messages.push(message);

    // Save the updated list of messages back into localStorage
    localStorage.setItem('chatMessages', JSON.stringify(messages));
}

// This function displays a single message in the chat area.
function displayMessage(message) {
    // Find the chat message container (where all the messages are displayed)
    const messageContainer = document.getElementById('messages');

    // Create a new div element to hold the chat message
    const messageElement = document.createElement('div');

    // Add a class to the div for styling
    messageElement.classList.add('chat-message');

    // Set the inner HTML of the message, including the username, message, and timestamp
    messageElement.innerHTML = `<span>${message.username}:</span> ${message.message} <span class="timestamp">${message.timestamp}</span>`;

    // Add the message element to the message container (append it to the chat area)
    messageContainer.appendChild(messageElement);

    // Automatically scroll to the bottom of the chat area to show the latest message
    messageContainer.scrollTop = messageContainer.scrollHeight;
}
