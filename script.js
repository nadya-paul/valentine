let currentStep = 1;
const PASSWORD = "CLUBHOUSE"; 
const TRIVIA = { food: "ADOBO", color: "RED", dog: "SAYSAY" };
const REASONS = ["You're my home 🏠", "Your laugh is music 🎶", "You make me brave 💪", "I love our adventures ✈️", "You're my everything ❤️"];

// PIXEL SOUND EFFECTS
function playPixelSound(type = 'beep') {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if(type === 'beep') {
        oscillator.frequency.value = 800;
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } else if(type === 'success') {
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.linearRampToValueAtTime(800, audioContext.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    } else if(type === 'error') {
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);
    }
}

const FLOWER_DESIGNS = {
    lily: `<svg width="70" height="120" viewBox="0 0 70 120"><rect x="32" y="60" width="6" height="60" fill="#2d5016"/><circle cx="35" cy="40" r="22" fill="#ffffff"/><circle cx="35" cy="40" r="10" fill="#ffd700"/><circle cx="22" cy="35" r="18" fill="#fffacd"/><circle cx="48" cy="35" r="18" fill="#fffacd"/></svg>`,
    rose: `<svg width="70" height="120" viewBox="0 0 70 120"><rect x="32" y="60" width="6" height="60" fill="#1a3a1a"/><circle cx="35" cy="35" r="26" fill="#ff1744"/><circle cx="35" cy="35" r="18" fill="#d71650"/><circle cx="35" cy="35" r="10" fill="#b71c4f"/><circle cx="25" cy="30" r="14" fill="#ff4081"/><circle cx="45" cy="30" r="14" fill="#ff4081"/></svg>`,
    tulip: `<svg width="70" height="120" viewBox="0 0 70 120"><rect x="32" y="65" width="6" height="55" fill="#2d5016"/><path d="M20 30 Q35 50 50 30 Q50 50 35 70 Q20 50 20 30 Z" fill="#ff69b4"/><path d="M30 40 Q35 55 40 40" fill="#ff1493"/></svg>`,
    daisy: `<svg width="70" height="120" viewBox="0 0 70 120"><rect x="32" y="60" width="6" height="60" fill="#2d5016"/><circle cx="35" cy="38" r="24" fill="#ffffff"/><circle cx="35" cy="38" r="8" fill="#ffa500"/><circle cx="20" cy="28" r="10" fill="#fff9e6"/><circle cx="50" cy="28" r="10" fill="#fff9e6"/><circle cx="15" cy="45" r="9" fill="#fff9e6"/><circle cx="55" cy="45" r="9" fill="#fff9e6"/></svg>`
};

let reasonIdx = 0;
let fCount = 0;

// Create background animation
function createBgHearts() {
    const container = document.getElementById('hearts-container');
    for(let i=0; i<20; i++) {
        const h = document.createElement('div');
        h.className = 'bg-heart';
        h.innerText = '❤️';
        h.style.left = Math.random() * 100 + 'vw';
        h.style.animationDelay = Math.random() * 8 + 's';
        h.style.fontSize = (Math.random() * 30 + 15) + 'px';
        h.style.setProperty('--sway-offset', (Math.random() * 60 - 30) + 'px');
        container.appendChild(h);
    }
    // Add hearts continuously
    setInterval(() => {
        if(container.children.length < 30) {
            const h = document.createElement('div');
            h.className = 'bg-heart';
            h.innerText = '❤️';
            h.style.left = Math.random() * 100 + 'vw';
            h.style.animationDelay = '0s';
            h.style.fontSize = (Math.random() * 30 + 15) + 'px';
            container.appendChild(h);
        }
    }, 5000);
}

// Create romantic sparkle effects
function createSparkles() {
    const container = document.getElementById('hearts-container');
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.innerHTML = '✨';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.top = Math.random() * 100 + 'vh';
        sparkle.style.animationDelay = Math.random() * 0.5 + 's';
        sparkle.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        container.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 3000);
    }, 600);
}

// Create pixelated stars
function createStars() {
    const container = document.getElementById('hearts-container');
    for(let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.className = 'pixel-star';
        star.innerHTML = '⭐';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 60 + 'vh';
        star.style.animationDelay = (Math.random() * 2) + 's';
        container.appendChild(star);
    }
}

// Create romantic particles (fireworks effect)
function createFireworks() {
    setInterval(() => {
        const x = Math.random() * 100;
        const y = Math.random() * 50 + 10;
        
        for(let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            particle.style.left = x + 'vw';
            particle.style.top = y + 'vh';
            particle.style.setProperty('--angle', (360 / 8 * i) + 'deg');
            particle.innerHTML = ['❤️', '💕', '💖', '💝', '💗', '💓', '💞', '💘'][i];
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 2500);
        }
    }, 3500);
}

// Create floating pixels
function createFloatingPixels() {
    const container = document.getElementById('hearts-container');
    setInterval(() => {
        const pixel = document.createElement('div');
        pixel.style.position = 'fixed';
        pixel.style.left = Math.random() * 100 + 'vw';
        pixel.style.top = Math.random() * 100 + 'vh';
        pixel.style.width = (Math.random() * 8 + 3) + 'px';
        pixel.style.height = pixel.style.width;
        pixel.style.backgroundColor = ['#ff4d6d', '#ff8fa3', '#ffb3c1', '#ffe5ec', '#ffffff'][Math.floor(Math.random() * 5)];
        pixel.style.opacity = (Math.random() * 0.6 + 0.2);
        pixel.style.pointerEvents = 'none';
        pixel.style.zIndex = '0';
        pixel.style.animation = 'pixelFloat 4s ease-in-out forwards';
        container.appendChild(pixel);
        
        setTimeout(() => pixel.remove(), 4000);
    }, 1000);
}

createStars();
createSparkles();
createFireworks();
createFloatingPixels();

function nextStep() {
    const currentSection = document.getElementById('step' + currentStep);
    currentSection.classList.remove('active');
    currentSection.style.animation = 'none';
    setTimeout(() => {
        currentSection.style.animation = '';
    }, 10);
    
    currentStep++;
    setTimeout(() => {
        const nextSection = document.getElementById('step' + currentStep);
        nextSection.classList.add('active');
        if(currentStep === 5) updateSlider();
        if(currentStep === 7) typeWriter();
        
        // Add celebration particles
        confetti({ particleCount: 8, origin: { y: 0.3 } });
    }, 600);
}

// 1. START & PIXEL LOADER
document.getElementById('heart-trigger').onclick = function() {
    playPixelSound('success');
    document.getElementById('bg-music').play().catch(() => {});
    this.classList.add('pulse-exit');
    document.querySelector('.tap-hint').classList.add('hidden');
    document.getElementById('loader-ui').classList.remove('hidden');
    let w = 0;
    let t = setInterval(() => {
        w += 1; 
        document.getElementById('bar-fill').style.width = w + '%';
        if(w % 25 === 0) playPixelSound('beep');
        if(w >= 100) { clearInterval(t); setTimeout(nextStep, 500); }
    }, 25);
};

// 2. ENVELOPES
function handleEnvelope(el) {
    if(el.classList.contains('open')) return;
    playPixelSound('beep');
    el.classList.add('open');
    const openCount = document.querySelectorAll('.open').length;
    if(openCount >= 4) {
        playPixelSound('success');
        setTimeout(() => document.getElementById('nav-to-pw').classList.remove('hidden'), 300);
    }
}

// 3. PASSWORD
function verifyAccess() {
    const input = document.getElementById('pw-field').value.toUpperCase().trim();
    if(input === PASSWORD) {
        playPixelSound('success');
        nextStep();
    } else {
        playPixelSound('error');
        const pwField = document.getElementById('pw-field');
        pwField.classList.add('shake');
        setTimeout(() => pwField.classList.remove('shake'), 500);
        pwField.style.borderColor = '#ff4d6d';
        pwField.placeholder = '✗ Wrong! Think clubhouse...';
        setTimeout(() => {
            pwField.style.borderColor = 'white';
            pwField.placeholder = 'Type secret...';
        }, 2000);
        pwField.value = '';
    }
}

// 4. TRIVIA
function checkTrivia() {
    const f = document.getElementById('ans-food').value.toUpperCase().trim();
    const c = document.getElementById('ans-color').value.toUpperCase().trim();
    const d = document.getElementById('ans-dog').value.toUpperCase().trim();
    
    const allCorrect = f === TRIVIA.food && c === TRIVIA.color && d === TRIVIA.dog;
    if(allCorrect) {
        playPixelSound('success');
        nextStep();
    } else {
        playPixelSound('error');
        const hints = [];
        if(f !== TRIVIA.food) hints.push('Food ✗');
        if(c !== TRIVIA.color) hints.push('Color ✗');
        if(d !== TRIVIA.dog) hints.push('Dog ✗');
        
        document.querySelectorAll('.quiz-item input').forEach(inp => {
            inp.classList.add('shake');
            setTimeout(() => inp.classList.remove('shake'), 500);
        });
        
        const msg = `Check: ${hints.join(', ')} | Try: (ADOBO, RED, SAYSAY)`;
        alert(msg);
    }
}

// 5. SLIDER
function updateSlider() {
    document.getElementById('reason-text').innerText = REASONS[reasonIdx];
    document.getElementById('reason-count').innerText = `${reasonIdx + 1}/5`;
    if(reasonIdx === 4) document.getElementById('nav-to-flowers').classList.remove('hidden');
}
function nextReason() { if(reasonIdx < 4) { reasonIdx++; playPixelSound('beep'); updateSlider(); } }
function prevReason() { if(reasonIdx > 0) { reasonIdx--; playPixelSound('beep'); updateSlider(); } }

// 6. FLOWERS (INSIDE VASE)
function spawnFlower(type) {
    if(fCount >= 10) return;
    playPixelSound('beep');
    const bed = document.getElementById('flower-bed');
    const div = document.createElement('div');
    div.className = 'pixel-flower-svg';
    div.innerHTML = FLOWER_DESIGNS[type];
    const rot = Math.random() * 60 - 30;
    // Stack flowers inside vase from bottom up
    const baseBottom = 20 + (fCount * 8);
    div.style.bottom = `${baseBottom}px`;
    div.style.setProperty('--r', `${rot}deg`);
    bed.appendChild(div);
    fCount++;
    confetti({ particleCount: 20, origin: { y: 0.7 } });
    
    // Add sparkle effect when flower is added
    for(let i = 0; i < 4; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.innerHTML = '✨';
        sparkle.style.left = '50vw';
        sparkle.style.top = '50vh';
        sparkle.style.animationDelay = (i * 0.15) + 's';
        sparkle.style.fontSize = (Math.random() * 1.2 + 0.8) + 'rem';
        document.getElementById('hearts-container').appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 3000);
    }
    
    // Show continue button after 2 flowers added
    if(fCount >= 2) {
        const navBtn = document.getElementById('nav-to-final');
        if(navBtn) navBtn.classList.remove('hidden');
    }
    
    // Extra celebration when bouquet is full
    if(fCount >= 10) {
        playPixelSound('success');
        for(let j = 0; j < 3; j++) {
            setTimeout(() => {
                confetti({ 
                    particleCount: 30, 
                    origin: { y: 0.5 },
                    spread: 60
                });
            }, j * 300);
        }
    }
}

// 7. FINALE
function accept() {
    playPixelSound('success');
    document.getElementById('proposal-card').classList.add('hidden');
    document.getElementById('celebration-ui').classList.remove('hidden');
    const end = Date.now() + 8000;
    let beatCount = 0;
    (function frame() {
        confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0, y: 0.6 } });
        confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1, y: 0.6 } });
        if(beatCount % 20 === 0) playPixelSound('beep');
        beatCount++;
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}

let noClickCount = 0;

function dodgeNo(event) {
    event.preventDefault();
    const noBtn = document.getElementById('runaway-no');
    const yesBtn = document.getElementById('yes-btn');
    noClickCount++;
    
    // Random dodge position
    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 100;
    
    noBtn.style.position = 'relative';
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    playPixelSound('beep');
    
    // Show angry effect at each dodge
    noBtn.classList.add('angry-dodge');
    setTimeout(() => noBtn.classList.remove('angry-dodge'), 300);
    
    // Expand YES button gradually
    const scale = 1 + (noClickCount * 0.1);
    yesBtn.style.fontSize = (1.6 + noClickCount * 0.15) + 'rem';
    yesBtn.style.transform = `scale(${Math.min(scale, 1.8)})`;
    
    // After 5 dodges, show mega angry animation
    if(noClickCount >= 5) {
        showAngryAnimation();
    }
}

function showAngryAnimation() {
    const noBtn = document.getElementById('runaway-no');
    const yesBtn = document.getElementById('yes-btn');
    
    noBtn.classList.add('button-angry');
    noBtn.disabled = true;
    yesBtn.classList.add('button-huge');
    
    // Create angry Pacman animation
    const pacman = document.createElement('div');
    pacman.style.position = 'fixed';
    pacman.style.left = (noBtn.getBoundingClientRect().left + 50) + 'px';
    pacman.style.top = (noBtn.getBoundingClientRect().top + 20) + 'px';
    pacman.style.width = '60px';
    pacman.style.height = '60px';
    pacman.style.pointerEvents = 'none';
    pacman.style.zIndex = '1000';
    pacman.style.animation = 'pacmanAttack 1.5s ease-out forwards';
    pacman.innerHTML = `
        <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="28" fill="#FFD700" stroke="#000" stroke-width="2"/>
            <circle cx="35" cy="28" r="5" fill="#000"/>
            <circle cx="42" cy="25" r="3" fill="#000"/>
            <line x1="40" y1="38" x2="50" y2="42" stroke="#000" stroke-width="2"/>
            <line x1="40" y1="42" x2="50" y2="38" stroke="#000" stroke-width="2"/>
        </svg>
    `;
    document.body.appendChild(pacman);
    
    // Create angry particles
    for(let i = 0; i < 8; i++) {
        const angerParticle = document.createElement('div');
        angerParticle.style.position = 'fixed';
        angerParticle.style.left = (noBtn.getBoundingClientRect().left + 50) + 'px';
        angerParticle.style.top = (noBtn.getBoundingClientRect().top + 20) + 'px';
        angerParticle.style.width = '12px';
        angerParticle.style.height = '12px';
        angerParticle.style.backgroundColor = '#ff4d6d';
        angerParticle.style.pointerEvents = 'none';
        angerParticle.style.zIndex = '999';
        angerParticle.style.animation = 'angerBurst 1s ease-out forwards';
        angerParticle.style.setProperty('--angle', (360 / 8 * i) + 'deg');
        angerParticle.innerHTML = '❌';
        angerParticle.style.fontSize = '1.2rem';
        document.body.appendChild(angerParticle);
        
        setTimeout(() => angerParticle.remove(), 1000);
    }
    
    setTimeout(() => pacman.remove(), 1500);
    
    playPixelSound('error');
    playPixelSound('error');
}

function typeWriter() {
    const text = "Will you be my Valentine?";
    let i = 0; const el = document.getElementById('typewriter-text');
    el.innerHTML = "";
    function type() { if(i < text.length) { el.innerHTML += text.charAt(i); i++; setTimeout(type, 100); } }
    type();
}