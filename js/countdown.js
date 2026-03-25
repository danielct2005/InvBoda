// Countdown Timer Module
const Countdown = {
    weddingDate: new Date('December 30, 2035 16:00:00').getTime(),
    
    init() {
        this.update();
        setInterval(() => this.update(), 1000);
    },
    
    update() {
        const now = new Date().getTime();
        const distance = this.weddingDate - now;
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (!daysEl) return;
        
        if (distance < 0) {
            document.querySelector('.countdown').innerHTML = '<p style="font-family: Cormorant Garamond, serif; font-size: 1.2rem; color: var(--vintage-brown);">¡Es el día de la boda!</p>';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysEl.textContent = days;
        hoursEl.textContent = hours;
        minutesEl.textContent = minutes;
        secondsEl.textContent = seconds;
    }
};

export default Countdown;
