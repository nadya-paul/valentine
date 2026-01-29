const gameArea = document.getElementById('game-area');
const startBtn = document.getElementById('start-btn');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');

let score = 0;
let timeLeft = 20;
let spawnInterval = null;
let timerInterval = null;

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function spawnHeart() {
    const heart = document.createElement('div');
    heart.className = 'game-heart animated-heart fancy-heart';
    heart.innerHTML = `
        <svg viewBox="0 0 96 86" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="heartGrad" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stop-color="#fff" stop-opacity="0.8"/>
                    <stop offset="80%" stop-color="#ff1744"/>
                </radialGradient>
            </defs>
            <path d="M48 78s-36-24.6-36-46.8C12 18.6 28.8 6 48 24.6 67.2 6 84 18.6 84 31.2c0 22.2-36 46.8-36 46.8z" fill="url(#heartGrad)" stroke="#b71c4f" stroke-width="4"/>
        </svg>`;


    const rect = gameArea.getBoundingClientRect();
    const w = Math.max(44, Math.min(72, Math.floor(rect.width * 0.12)));
    heart.style.width = `${w}px`;
    heart.style.height = `${Math.floor(w * 0.8)}px`;
    const x = rand(8, rect.width - w - 8);
    heart.style.left = x + 'px';
    heart.style.top = '-60px';
    heart.style.position = 'absolute';
    heart.style.transition = 'top 1.2s cubic-bezier(.4,1.6,.6,1), transform 0.2s';
    heart.style.zIndex = 2;


    for (let i = 0; i < 3; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'heart-sparkle';
        sparkle.style.left = (x + rand(-8, w + 8)) + 'px';
        sparkle.style.top = rand(-30, 10) + 'px';
        sparkle.style.animationDuration = (0.7 + Math.random() * 0.7) + 's';
        gameArea.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1200);
    }

    setTimeout(() => {
        heart.style.top = rand(40, rect.height - Math.floor(w * 0.8) - 8) + 'px';
        heart.style.transform = `rotate(${rand(-18, 18)}deg)`;
    }, 30);

    heart.addEventListener('click', (e) => {
        e.stopPropagation();
        score += 1;
        scoreEl.textContent = score;
        heart.style.transform = 'scale(1.4) rotate(-10deg)';
        heart.style.opacity = '0';

        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'heart-sparkle';
            sparkle.style.left = (x + rand(-8, w + 8)) + 'px';
            sparkle.style.top = (parseInt(heart.style.top) + rand(-8, 8)) + 'px';
            sparkle.style.animationDuration = (0.5 + Math.random() * 0.5) + 's';
            gameArea.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 900);
        }
        try { confetti({ particleCount: 18, spread: 60, origin: { x: (x + 20) / rect.width, y: 0.3 } }); } catch (err) { }
        setTimeout(() => heart.remove(), 300);
    });

    gameArea.appendChild(heart);


    setTimeout(() => {
        if (heart.parentNode) {
            heart.classList.add('missed-heart');
            setTimeout(() => { if (heart.parentNode) heart.remove(); }, 400);
        }
    }, 2000 + rand(0, 1000));
}

function animateBgHearts() {
    for (let i = 0; i < 10; i++) {
        const bg = document.createElement('div');
        bg.className = 'bg-anim-heart';
        bg.innerHTML = '<svg width="32" height="28" viewBox="0 0 96 86" xmlns="http://www.w3.org/2000/svg"><path d="M48 78s-36-24.6-36-46.8C12 18.6 28.8 6 48 24.6 67.2 6 84 18.6 84 31.2c0 22.2-36 46.8-36 46.8z" fill="#ffb3c1" stroke="#ff1744" stroke-width="2"/></svg>';
        bg.style.position = 'absolute';
        bg.style.left = rand(0, 90) + '%';
        bg.style.top = rand(0, 80) + '%';
        bg.style.opacity = Math.random() * 0.3 + 0.2;
        bg.style.pointerEvents = 'none';
        bg.style.zIndex = 0;
        bg.style.animation = `floatBgHeart ${rand(7, 14)}s linear infinite`;
        gameArea.appendChild(bg);
    }
}

animateBgHearts();

function startGame() {
    if (timerInterval) return;
    score = 0; scoreEl.textContent = 0;
    timeLeft = 20; timeEl.textContent = timeLeft;
    spawnInterval = setInterval(spawnHeart, 600);
    timerInterval = setInterval(() => {
        timeLeft -= 1; timeEl.textContent = timeLeft;
        if (timeLeft <= 0) endGame();
    }, 1000);
    startBtn.textContent = 'In Progress...';
    startBtn.disabled = true;
}

function endGame() {
    clearInterval(spawnInterval); spawnInterval = null;
    clearInterval(timerInterval); timerInterval = null;
    startBtn.textContent = 'Start'; startBtn.disabled = false;

    const overlay = document.createElement('div'); overlay.className = 'game-overlay';
    const modal = document.createElement('div'); modal.className = 'game-modal';

    modal.innerHTML = win
        ? `<h3 class="pixel-text">You Win!</h3><p>Your score: <strong>${score}</strong></p><div id="teddy-bear"></div><div style="margin-top:10px;"><button id='retry' class='glow-btn'>Play Again</button> <a class='glow-btn' href='index.html'>Back</a></div>`
        : `<h3 class="pixel-text">Time!</h3><p>Your score: <strong>${score}</strong></p><div style="margin-top:10px;"><button id='retry' class='glow-btn'>Play Again</button> <a class='glow-btn' href='index.html'>Back</a></div>`;
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    document.getElementById('retry').addEventListener('click', () => { overlay.remove(); startGame(); });

    if (win) showTeddyBear();
}

function showTeddyBear() {
    const bearDiv = document.getElementById('teddy-bear');
    if (!bearDiv) return;
    bearDiv.innerHTML = `
        <div class="teddy-bear-anim">
            <svg viewBox="0 0 120 120" width="120" height="120">
                <ellipse cx="60" cy="90" rx="32" ry="18" fill="#a67c52"/>
                <circle cx="40" cy="60" r="24" fill="#a67c52"/>
                <circle cx="80" cy="60" r="24" fill="#a67c52"/>
                <ellipse cx="60" cy="80" rx="28" ry="22" fill="#c49a6c"/>
                <ellipse cx="60" cy="90" rx="16" ry="10" fill="#fff"/>
                <ellipse cx="60" cy="95" rx="8" ry="5" fill="#a67c52"/>
                <circle cx="40" cy="60" r="6" fill="#fff"/>
                <circle cx="80" cy="60" r="6" fill="#fff"/>
                <circle cx="40" cy="60" r="3" fill="#000"/>
                <circle cx="80" cy="60" r="3" fill="#000"/>
                <ellipse cx="60" cy="100" rx="6" ry="3" fill="#000"/>
                <ellipse cx="30" cy="38" rx="10" ry="10" fill="#a67c52"/>
                <ellipse cx="90" cy="38" rx="10" ry="10" fill="#a67c52"/>
                <ellipse cx="30" cy="38" rx="5" ry="5" fill="#fff"/>
                <ellipse cx="90" cy="38" rx="5" ry="5" fill="#fff"/>
            </svg>
            <div class="bear-msg">You caught enough hearts!<br>Here's a teddy bear for you 🧸</div>
        </div>
        `;
}

startBtn.addEventListener('click', startGame);

gameArea.addEventListener('click', () => { });

window.addEventListener('blur', () => {
    const existing = gameArea.querySelectorAll('.game-heart');
    existing.forEach(h => h.remove());
});
