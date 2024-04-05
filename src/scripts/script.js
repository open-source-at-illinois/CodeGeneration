// Import the ollama package
import ollama from 'ollama';

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

// Use ollama in an async function to send a message and receive a response
async function sendMessageToOllama(messageContent) {
    try {
        let modelName = activeButton === "code-btn" ? "tinyllama" : "stable-code";
        const response = await ollama.chat({
            model: modelName,
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


function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    // messageDiv.textContent = message;
    typeMessage(message, messageDiv, 10)
    messageDiv.className = sender; // Use this for custom styling based on sender
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

// toggle llama vs code llms
const butts = document.querySelectorAll('#butts button');
let activeButton = "code-btn";
butts.forEach(button => {
    button.addEventListener('click', function() {
        // Remove the 'active' class from all buttons
        butts.forEach(btn => btn.classList.remove('active'));
        
        // Add the 'active' class back to the clicked button
        this.classList.add('active');
        
        // Your additional logic here
        activeButton = this.id; 
    });
});

// typing speed
function typeMessage(message, target, speed) {
    let i = 0;
    
    target.textContent = ""; // Clear existing content

    function typing() {
        if (i < message.length) {
            target.textContent += message.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }

    typing(); // Start typing effect
}
