// Main Entry Point
import MusicPlayer from './music.js';
import Countdown from './countdown.js';
import ModalManager from './modal.js';
import Photos from './photos.js';

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Modal Manager
    ModalManager.init();
    
    // Initialize Music Player
    MusicPlayer.init();
    
    // Initialize Countdown
    Countdown.init();
    
    // Initialize Photos
    Photos.init();
    
    console.log('Wedding Invitation initialized');
});

// Song suggestion from main modal
window.sendSongSuggestion2 = function() {
    const song = document.getElementById('songSuggestion2').value.trim();
    if (!song) {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = 'Por favor, escribe una canción';
            toast.className = 'toast error';
            setTimeout(() => toast.classList.add('show'), 10);
            setTimeout(() => toast.classList.remove('show'), 3000);
        }
        return;
    }
    const message = encodeURIComponent('Sugerencia de canción para la boda: ' + song);
    window.open('https://wa.me/56966529597?text=' + message, '_blank');
    document.getElementById('songSuggestion2').value = '';
    
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = '¡Gracias por tu sugerencia!';
        toast.className = 'toast success';
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
};

// Legacy function for backward compatibility
window.sendSongSuggestion = window.sendSongSuggestion2;
