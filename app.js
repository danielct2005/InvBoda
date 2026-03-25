// Wedding Chat App - JavaScript

// State
let messages = [];
let photos = [];
let guestCount = 1;

// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const photosGrid = document.getElementById('photosGrid');
const guestCountElement = document.getElementById('guestCount');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadFromStorage();
    renderMessages();
    renderPhotos();
    simulateGuests();
});

// Storage Functions
function saveToStorage() {
    localStorage.setItem('weddingMessages', JSON.stringify(messages));
    localStorage.setItem('weddingPhotos', JSON.stringify(photos));
}

function loadFromStorage() {
    const savedMessages = localStorage.getItem('weddingMessages');
    const savedPhotos = localStorage.getItem('weddingPhotos');
    
    if (savedMessages) {
        messages = JSON.parse(savedMessages);
    }
    
    if (savedPhotos) {
        photos = JSON.parse(savedPhotos);
    }
}

// Message Functions
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const text = messageInput.value.trim();
    
    if (text) {
        const message = {
            id: Date.now(),
            type: 'user',
            text: text,
            time: new Date().toLocaleTimeString('es-ES', { 
                hour: '2-digit', 
                minute: '2-digit' 
            })
        };
        
        messages.push(message);
        messageInput.value = '';
        saveToStorage();
        renderMessages();
        scrollToBottom();
    }
}

function renderMessages() {
    const systemMessages = chatMessages.querySelectorAll('.message:not(.system)');
    systemMessages.forEach(msg => msg.remove());
    
    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.type}`;
        
        if (message.type === 'photo') {
            messageDiv.innerHTML = `
                <div class="photo-container">
                    <img src="${message.image}" alt="Foto de boda" onclick="viewFullImage('${message.image}')">
                </div>
                <span class="message-time">${message.time}</span>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${message.text}</p>
                </div>
                <span class="message-time">${message.time}</span>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
    });
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Photo Functions
function handlePhotoUpload(event) {
    const files = event.target.files;
    
    if (files) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                
                reader.onload = (e) => {
                    const photo = {
                        id: Date.now() + Math.random(),
                        image: e.target.result,
                        time: new Date().toLocaleTimeString('es-ES', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                        })
                    };
                    
                    photos.unshift(photo);
                    
                    // Add message for photo
                    const message = {
                        id: photo.id,
                        type: 'photo',
                        image: e.target.result,
                        time: photo.time
                    };
                    
                    messages.push(message);
                    
                    saveToStorage();
                    renderMessages();
                    renderPhotos();
                    scrollToBottom();
                };
                
                reader.readAsDataURL(file);
            }
        });
        
        event.target.value = '';
    }
}

function renderPhotos() {
    photosGrid.innerHTML = '';
    
    photos.forEach(photo => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.innerHTML = `
            <img src="${photo.image}" alt="Foto de boda" onclick="viewFullImage('${photo.image}')">
        `;
        photosGrid.appendChild(photoItem);
    });
}

function viewFullImage(imageSrc) {
    // Create full screen image viewer
    const viewer = document.createElement('div');
    viewer.className = 'image-viewer';
    viewer.innerHTML = `
        <div class="viewer-content" onclick="this.parentElement.remove()">
            <img src="${imageSrc}" alt="Foto ampliada">
            <button class="close-viewer" onclick="event.target.closest('.image-viewer').remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    viewer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        z-index: 2000;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    `;
    
    const viewerContent = viewer.querySelector('.viewer-content');
    viewerContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
    `;
    
    const img = viewer.querySelector('img');
    img.style.cssText = `
        max-width: 100%;
        max-height: 80vh;
        border-radius: 12px;
        box-shadow: 0 0 40px rgba(212,165,116,0.3);
    `;
    
    const closeBtn = viewer.querySelector('.close-viewer');
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: white;
        border: none;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        color: #8b7355;
    `;
    
    document.body.appendChild(viewer);
}

// Guest Simulation
function simulateGuests() {
    setInterval(() => {
        if (Math.random() > 0.7) {
            guestCount = Math.floor(Math.random() * 5) + 1;
            guestCountElement.textContent = guestCount;
        }
    }, 5000);
}

// Modal Functions
function openInvitation() {
    const modal = document.getElementById('invitationModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeInvitation() {
    const modal = document.getElementById('invitationModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on outside click
document.getElementById('invitationModal').addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeInvitation();
    }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeInvitation();
    }
});
