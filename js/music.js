// Music Player Module
const MusicPlayer = {
    isPlaying: false,
    music: null,
    playerElement: null,
    iconElement: null,
    
    init() {
        this.music = document.getElementById('backgroundMusic');
        this.playerElement = document.getElementById('musicPlayer');
        this.iconElement = document.getElementById('musicIcon');
        
        if (this.music) {
            this.music.volume = 0.4;
            
            this.music.addEventListener('error', (e) => {
                console.log('Music load error:', this.music.error);
                this.showToast('Error al cargar música', 'error');
            });
            
            this.music.addEventListener('ended', () => {
                this.music.play();
            });
        }
        
        if (this.playerElement) {
            this.playerElement.addEventListener('click', () => this.toggle());
        }
    },
    
    toggle() {
        if (!this.music) {
            this.showToast('Error: reproductor no encontrado', 'error');
            return;
        }
        
        if (this.isPlaying) {
            this.music.pause();
            this.iconElement.className = 'fas fa-music';
            this.playerElement.classList.remove('playing');
            this.isPlaying = false;
        } else {
            const playPromise = this.music.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    this.iconElement.className = 'fas fa-pause';
                    this.playerElement.classList.add('playing');
                    this.isPlaying = true;
                }).catch(error => {
                    console.log('Error playing music:', error);
                    this.showToast('Toca para reproducir música', 'info');
                });
            }
        }
    },
    
    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = message;
            toast.className = 'toast ' + type;
            
            setTimeout(() => toast.classList.add('show'), 10);
            setTimeout(() => toast.classList.remove('show'), 3000);
        }
    }
};

export default MusicPlayer;
