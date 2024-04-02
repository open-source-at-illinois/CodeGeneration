// Import the ollama package
import ollama from 'ollama';

// Use ollama in an async function to send a message and receive a response
async function sendMessageToOllama(messageContent) {
    try {
        const response = await ollama.chat({
            model: 'llama2',
            messages: [{ role: 'user', content: messageContent }],
        });
        
        // Process and display the response
        console.log(response.message.content);
        // Display the response in your chat interface
        displayMessage(response.message.content, 'bot');
    } catch (error) {
        console.error('There was an error communicating with ollama:', error);
        // Handle the error appropriately in your UI
        displayMessage('Sorry, there was an error processing your request.', 'bot');
    }
}

document.getElementById('send-btn').onclick = async function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== '') {
        displayMessage(userInput, 'user');
        // Call your API here
        // callLanguageModelAPI(userInput);
        
        await sendMessageToOllama(userInput);

        document.getElementById('user-input').value = ''; // Clear input after sending
    }
};

function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.className = sender; // Use this for custom styling based on sender
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

async function callLanguageModelAPI(userInput) {
    // Example POST request to an API
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Additional headers like API keys if required
        },
        body: JSON.stringify({prompt: userInput})
    });
    if (response.ok) {
        const data = await response.json();
        // Assuming the response has a 'text' field
        displayMessage(data.text, 'bot');
    } else {
        console.error('API call failed');
    }
}
