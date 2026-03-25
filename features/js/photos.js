// Photos Module
const Photos = {
    photos: [],
    isUploading: false,
    
    init() {
        this.loadFromStorage();
        this.render();
        
        const photoInput = document.getElementById('photoInput');
        if (photoInput) {
            photoInput.addEventListener('change', (e) => this.handleUpload(e));
        }
    },
    
    loadFromStorage() {
        const stored = localStorage.getItem('weddingPhotos');
        if (stored) {
            this.photos = JSON.parse(stored);
        }
    },
    
    saveToStorage() {
        localStorage.setItem('weddingPhotos', JSON.stringify(this.photos));
    },
    
    handleUpload(event) {
        const files = event.target.files;
        if (!files || files.length === 0) return;
        
        this.isUploading = true;
        this.showLoading(true);
        
        Array.from(files).forEach(file => {
            if (!file.type.startsWith('image/')) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                this.photos.push(e.target.result);
                this.saveToStorage();
                this.render();
                
                if (this.photos.length >= files.length) {
                    this.isUploading = false;
                    this.showLoading(false);
                    this.showToast('¡Fotos subidas!', 'success');
                }
            };
            reader.readAsDataURL(file);
        });
        
        event.target.value = '';
    },
    
    render() {
        const grid = document.getElementById('photosGrid');
        if (!grid) return;
        
        const emptySlots = 6;
        const totalSlots = Math.max(this.photos.length, emptySlots);
        
        grid.innerHTML = '';
        
        for (let i = 0; i < totalSlots; i++) {
            const item = document.createElement('div');
            item.className = 'photo-item';
            
            if (this.photos[i]) {
                const img = document.createElement('img');
                img.src = this.photos[i];
                img.alt = 'Foto de la boda';
                img.onclick = () => this.openModal(this.photos[i]);
                item.appendChild(img);
            } else {
                item.classList.add('empty');
                item.innerHTML = '<i class="fas fa-images"></i>';
            }
            
            grid.appendChild(item);
        }
        
        const emptyMsg = document.getElementById('emptyMessage');
        if (emptyMsg) {
            emptyMsg.style.display = this.photos.length > 0 ? 'none' : 'block';
        }
    },
    
    openModal(src) {
        const modal = document.getElementById('photoModal');
        const img = document.getElementById('modalImage');
        
        if (modal && img) {
            img.src = src;
            modal.classList.add('active');
        }
    },
    
    closeModal() {
        const modal = document.getElementById('photoModal');
        if (modal) {
            modal.classList.remove('active');
        }
    },
    
    showLoading(show) {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.toggle('active', show);
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

// Make functions available globally
window.handlePhotoUpload = (event) => Photos.handleUpload(event);
window.closePhotoModal = () => Photos.closeModal();

export default Photos;
