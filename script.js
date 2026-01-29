
function updateKittyWaveVisibility(stepId) {
    const kitty = document.querySelector('.hello-kitty-wave-bg');
    if (!kitty) return;

    if (["step-typing", "step-music", "step0", "step1", "step2", "step3", "step4", "step5", "step6"].includes(stepId)) {
        kitty.style.display = '';
    } else {
        kitty.style.display = 'none';
    }
}

let currentStep = 0;

function showStep(stepId) {
    document.querySelectorAll('.step').forEach(s => {
        s.classList.remove('active');
        s.classList.add('hidden');
    });
    const step = document.getElementById(stepId);
    if (step) {
        step.classList.remove('hidden');
        step.classList.add('active');
    }
    updateKittyWaveVisibility(stepId);
}


const typewriterMessages = [
    "hi love",
    "i hope u're doing fine rn",
    "ik recently is madalas ang tampo but dw i told u naman",
    "na ill bawi and this is just one of my way to do it",
    "told you ako lang makakagawa sayo neto",
    "hehe",
    "should we proceed?"
];

function typeWriterLines(lines, container, cb) {
    let idx = 0;
    function typeLine() {
        if (idx >= lines.length) { cb && cb(); return; }
        const line = lines[idx];
        container.innerHTML = '';
        const lineEl = document.createElement('div');
        lineEl.className = 'typewriter-line';
        container.appendChild(lineEl);
        let charIdx = 0;
        function typeChar() {
            if (charIdx <= line.length) {
                let html = '';
                for (let i = 0; i < charIdx - 1; i++) {
                    const letter = line[i];
                    if (letter === ' ') {
                        html += ' ';
                    } else {
                        html += `<span class=\"letter\">${letter}</span>`;
                    }
                }
                if (charIdx > 0 && charIdx <= line.length) {
                    const letter = line[charIdx - 1];
                    if (letter === ' ') {
                        html += ' ';
                    } else {
                        html += `<span class=\"letter\" style=\"animation-delay:0s\">${letter}</span>`;
                    }
                }
                lineEl.innerHTML = html + '<span class="typewriter-cursor">|</span>';
                charIdx++;
                setTimeout(typeChar, 80 + Math.random() * 60);
            } else {
                let html = '';
                for (let i = 0; i < line.length; i++) {
                    const letter = line[i];
                    if (letter === ' ') {
                        html += ' ';
                    } else {
                        html += `<span class=\"letter\">${letter}</span>`;
                    }
                }
                lineEl.innerHTML = html;
                idx++;
                setTimeout(typeLine, 1100);
            }
        }
        typeChar();
    }
    typeLine();
}

window.addEventListener('DOMContentLoaded', function () {
    updateKittyWaveVisibility('step-typing');

    const typingStep = document.getElementById('step-typing');
    if (typingStep && typingStep.classList.contains('active')) {
        const msgBox = document.getElementById('typewriter-messages');
        const continueBtn = document.getElementById('typing-continue');
        typeWriterLines(typewriterMessages, msgBox, function () {
            continueBtn.classList.remove('hidden');
        });
        continueBtn.addEventListener('click', function () {
            showStep('step-music');
            currentStep = 'music';
        });
    }


    const musicStep = document.getElementById('step-music');
    if (musicStep) {
        const musicBtns = musicStep.querySelectorAll('.music-btn');
        musicBtns.forEach(btn => {
            btn.addEventListener('click', function () {

                const src = btn.getAttribute('data-src');
                let audio = document.getElementById('bg-music');
                if (!audio) {
                    audio = document.createElement('audio');
                    audio.id = 'bg-music';
                    audio.loop = true;
                    document.body.appendChild(audio);
                }
                audio.src = src;
                audio.volume = 0.7;
                audio.play();

                showStep('step-typing');
                currentStep = 'typing';

                const msgBox = document.getElementById('typewriter-messages');
                const continueBtn = document.getElementById('typing-continue');
                msgBox.innerHTML = '';
                continueBtn.classList.add('hidden');
                typeWriterLines(typewriterMessages, msgBox, function () {
                    continueBtn.classList.remove('hidden');
                });
                continueBtn.onclick = function () {
                    showStep('step0');
                    currentStep = 0;
                };
            });
        });
    }
});


document.getElementById('skip-video').addEventListener('click', function () {
    showStep('step1');
    currentStep = 1;

});
const PASSWORD = "CLUBHOUSE";
const TRIVIA = { food: "ADOBO", color: "RED", dog: "SAYSAY" };
const REASONS = [
    "You are my home.",
    "You give me peace.",
    "You love me so right.",
    "You always take care of me.",
    "Loving you feels so right."
];


function playPixelSound(type = 'beep') {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === 'beep') {
        oscillator.frequency.value = 800;
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } else if (type === 'success') {
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.linearRampToValueAtTime(800, audioContext.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    } else if (type === 'error') {
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


function createBgHearts() {
    const container = document.getElementById('hearts-container');
    for (let i = 0; i < 20; i++) {
        const h = document.createElement('div');
        h.className = 'bg-heart';
        h.innerText = '❤️';
        h.style.left = Math.random() * 100 + 'vw';
        h.style.bottom = '0';
        h.style.animationDelay = Math.random() * 8 + 's';
        h.style.fontSize = (Math.random() * 30 + 15) + 'px';
        h.style.setProperty('--sway-offset', (Math.random() * 60 - 30) + 'px');
        container.appendChild(h);
    }

    setInterval(() => {
        if (container.children.length < 30) {
            const h = document.createElement('div');
            h.className = 'bg-heart';
            h.innerText = '❤️';
            h.style.left = Math.random() * 100 + 'vw';
            h.style.bottom = '0';
            h.style.animationDelay = '0s';
            h.style.fontSize = (Math.random() * 30 + 15) + 'px';
            container.appendChild(h);
        }
    }, 5000);
}


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


function createStars() {
    const container = document.getElementById('hearts-container');
    for (let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.className = 'pixel-star';
        star.innerHTML = '⭐';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 60 + 'vh';
        star.style.animationDelay = (Math.random() * 2) + 's';
        container.appendChild(star);
    }
}


function createFireworks() {
    setInterval(() => {
        const x = Math.random() * 100;
        const y = Math.random() * 50 + 10;

        for (let i = 0; i < 8; i++) {
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


createBgHearts();
createStars();
createSparkles();

createFloatingPixels();

function nextStep() {

    document.querySelectorAll('.step').forEach(s => {
        s.classList.remove('active');
        s.classList.add('hidden');
    });
    currentStep++;
    const nextSection = document.getElementById('step' + currentStep);
    nextSection.classList.remove('hidden');
    nextSection.classList.add('active');
    if (currentStep === 5) updateSlider();

    if (currentStep === 7) {
        let audio = document.getElementById('bg-music');
        if (audio) { audio.pause(); audio.currentTime = 0; }
        typeWriter();
    }

    confetti({ particleCount: 8, origin: { y: 0.3 } });
}


document.getElementById('heart-trigger').onclick = function () {
    playPixelSound('success');
    document.getElementById('bg-music').play().catch(() => { });
    this.classList.add('pulse-exit');
    const hint = document.querySelector('.tap-hint');
    if (hint) hint.classList.add('hidden');
    document.getElementById('loader-ui').classList.remove('hidden');
    let w = 0;
    document.getElementById('bar-fill').style.width = '0%';
    let t = setInterval(() => {
        w += 1;
        document.getElementById('bar-fill').style.width = w + '%';
        if (w % 25 === 0) playPixelSound('beep');
        if (w >= 100) {
            clearInterval(t);
            document.getElementById('loader-ui').classList.add('hidden');
            setTimeout(nextStep, 500);
        }
    }, 25);
};


function handleEnvelope(el) {
    if (el.classList.contains('open')) return;

    playPixelSound('beep');
    el.classList.add('open');


    const openCount = document.querySelectorAll('.env-wrapper.open').length;


    if (openCount >= 4) {
        playPixelSound('success');
        setTimeout(() => {
            const btn = document.getElementById('nav-to-pw');
            btn.classList.remove('hidden');

            confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        }, 500);
    }
}


function verifyAccess() {
    const input = document.getElementById('pw-field').value.toUpperCase().trim();
    if (input === PASSWORD) {
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


function checkTrivia() {
    const f = document.getElementById('ans-food').value.toUpperCase().trim();
    const c = document.getElementById('ans-color').value.toUpperCase().trim();
    const d = document.getElementById('ans-dog').value.toUpperCase().trim();

    const allCorrect = f === TRIVIA.food && c === TRIVIA.color && d === TRIVIA.dog;
    if (allCorrect) {
        playPixelSound('success');
        nextStep();
    } else {
        playPixelSound('error');
        const hints = [];
        if (f !== TRIVIA.food) hints.push('Food ✗');
        if (c !== TRIVIA.color) hints.push('Color ✗');
        if (d !== TRIVIA.dog) hints.push('Dog ✗');

        document.querySelectorAll('.quiz-item input').forEach(inp => {
            inp.classList.add('shake');
            setTimeout(() => inp.classList.remove('shake'), 500);
        });

        const msg = `Check: ${hints.join(', ')} | Try: (ADOBO, RED, SAYSAY)`;
        alert(msg);
    }
}


function updateSlider() {
    document.getElementById('reason-text').innerText = REASONS[reasonIdx];
    document.getElementById('reason-count').innerText = `${reasonIdx + 1}/5`;
    if (reasonIdx === 4) document.getElementById('nav-to-flowers').classList.remove('hidden');
}
function nextReason() { if (reasonIdx < 4) { reasonIdx++; playPixelSound('beep'); updateSlider(); } }
function prevReason() { if (reasonIdx > 0) { reasonIdx--; playPixelSound('beep'); updateSlider(); } }


function spawnFlower(type) {
    if (fCount >= 10) return;
    playPixelSound('beep');
    const bed = document.getElementById('flower-bed');
    const div = document.createElement('div');
    div.className = 'pixel-flower-svg';
    div.innerHTML = FLOWER_DESIGNS[type];
    const rot = Math.random() * 60 - 30;

    const baseBottom = 20 + (fCount * 8);
    div.style.bottom = `${baseBottom}px`;
    div.style.setProperty('--r', `${rot}deg`);
    bed.appendChild(div);
    fCount++;
    confetti({ particleCount: 20, origin: { y: 0.7 } });


    for (let i = 0; i < 4; i++) {
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


    if (fCount >= 2) {
        const navBtn = document.getElementById('nav-to-final');
        if (navBtn) navBtn.classList.remove('hidden');
    }


    if (fCount >= 10) {
        playPixelSound('success');
        for (let j = 0; j < 3; j++) {
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


function accept() {
    playPixelSound('success');

    let audio = document.getElementById('bg-music');
    if (audio) { audio.pause(); audio.currentTime = 0; }

    let marryAudio = document.getElementById('marry-music');
    if (!marryAudio) {
        marryAudio = document.createElement('audio');
        marryAudio.id = 'marry-music';
        marryAudio.src = 'music/marry_you.mp3';
        marryAudio.volume = 0.8;
        document.body.appendChild(marryAudio);
    }
    marryAudio.currentTime = 0;
    marryAudio.play();
    document.getElementById('proposal-card').classList.add('hidden');
    document.getElementById('celebration-ui').classList.remove('hidden');
    const end = Date.now() + 8000;
    let beatCount = 0;
    (function frame() {
        confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0, y: 0.6 } });
        confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1, y: 0.6 } });
        if (beatCount % 20 === 0) playPixelSound('beep');
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


    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 100;

    noBtn.style.position = 'relative';
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

    playPixelSound('beep');


    noBtn.classList.add('angry-dodge');
    setTimeout(() => noBtn.classList.remove('angry-dodge'), 300);


    const scale = 1 + (noClickCount * 0.1);
    yesBtn.style.fontSize = (1.6 + noClickCount * 0.15) + 'rem';
    yesBtn.style.transform = `scale(${Math.min(scale, 1.8)})`;


    if (noClickCount >= 5) {
        showAngryAnimation();
    }
}

function showAngryAnimation() {
    const noBtn = document.getElementById('runaway-no');
    const yesBtn = document.getElementById('yes-btn');

    noBtn.classList.add('button-angry');
    noBtn.disabled = true;
    yesBtn.classList.add('button-huge');


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


    for (let i = 0; i < 8; i++) {
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
    function type() { if (i < text.length) { el.innerHTML += text.charAt(i); i++; setTimeout(type, 100); } }
    type();
}