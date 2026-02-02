const gameArea = document.getElementById('game-area');
const startBtn = document.getElementById('start-btn');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const quizIntro = document.getElementById('quiz-intro');
const quizContainer = document.getElementById('quiz-container');
const quizQuestionEl = document.getElementById('quiz-question');
const quizOptionsEl = document.getElementById('quiz-options');
const quizResult = document.getElementById('quiz-result');
const quizResultTitle = document.getElementById('quiz-result-title');
const quizResultMessage = document.getElementById('quiz-result-message');
const teddyBearContainer = document.getElementById('teddy-bear');
const retryBtn = document.getElementById('retry-btn');

let score = 0;
let timeLeft = 60;
let timerInterval = null;
let currentQuestionIndex = 0;

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const QUESTIONS = [
    {
        q: "Who is known as the national hero of the Philippines?",
        options: ["Jose Rizal", "Andres Bonifacio", "Emilio Aguinaldo"],
        answer: "Jose Rizal"
    },
    {
        q: "In what year did the EDSA People Power Revolution happen?",
        options: ["1986", "1972", "1991"],
        answer: "1986"
    },
    {
        q: "Which city is considered the oldest city in the Philippines?",
        options: ["Cebu City", "Manila", "Davao City"],
        answer: "Cebu City"
    },
    {
        q: "Who wrote the novel 'Noli Me Tangere'?",
        options: ["Jose Rizal", "Apolinario Mabini", "Marcelo H. del Pilar"],
        answer: "Jose Rizal"
    },
    {
        q: "What is the former name of the Philippines under Spanish rule?",
        options: ["Las Islas Filipinas", "Maharlika", "La Isla Bonita"],
        answer: "Las Islas Filipinas"
    },
    {
        q: "Who is known as the 'Brains of the Philippine Revolution'?",
        options: ["Apolinario Mabini", "Antonio Luna", "Melchora Aquino"],
        answer: "Apolinario Mabini"
    },
    {
        q: "Which Philippine president declared Martial Law in 1972?",
        options: ["Ferdinand Marcos", "Corazon Aquino", "Manuel L. Quezon"],
        answer: "Ferdinand Marcos"
    },
    {
        q: "Where did Lapu-Lapu and his warriors defeat Magellan?",
        options: ["Mactan", "Manila Bay", "Intramuros"],
        answer: "Mactan"
    },
    {
        q: "What is the name of the blood compact between Legazpi and Sikatuna?",
        options: ["Sandugo", "La Solidaridad", "Pact of Biak-na-Bato"],
        answer: "Sandugo"
    },
    {
        q: "Which movement pushed for reforms through writing and peaceful means?",
        options: ["Propaganda Movement", "Katipunan", "Hukbalahap"],
        answer: "Propaganda Movement"
    },
    {
        q: "Who was the first female president of the Philippines?",
        options: ["Corazon Aquino", "Gloria Macapagal Arroyo", "Imelda Marcos"],
        answer: "Corazon Aquino"
    },
    {
        q: "What is the term for Filipino warriors who resisted Spanish rule in the mountains?",
        options: ["Katipuneros", "Pulahanes", "Moros"],
        answer: "Pulahanes"
    },
    {
        q: "Which document proclaimed Philippine independence from Spain on June 12, 1898?",
        options: ["Act of the Declaration of Independence", "Malolos Constitution", "Jones Law"],
        answer: "Act of the Declaration of Independence"
    },
    {
        q: "Where did the Malolos Congress convene to draft the first Philippine Constitution?",
        options: ["Barasoain Church", "San Agustin Church", "Quiapo Church"],
        answer: "Barasoain Church"
    },
    {
        q: "Which Philippine hero is called the 'Great Plebeian'?",
        options: ["Andres Bonifacio", "Emilio Jacinto", "Gregorio del Pilar"],
        answer: "Andres Bonifacio"
    }
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function showPanel(panel) {
    [quizIntro, quizContainer, quizResult].forEach(p => {
        if (!p) return;
        p.classList.add('hidden');
        p.classList.remove('quiz-panel-active');
    });
    panel.classList.remove('hidden');
    panel.classList.add('quiz-panel-active');
}

function animateQuizTransition() {
    try {
        confetti({ particleCount: 12, spread: 50, origin: { y: 0.4 } });
    } catch (e) { }

    const pulse = document.createElement('div');
    pulse.className = 'quiz-pulse-ring';
    gameArea.appendChild(pulse);
    setTimeout(() => pulse.remove(), 600);
}

function renderQuestion() {
    if (currentQuestionIndex >= QUESTIONS.length) {
        endGame();
        return;
    }

    const qData = QUESTIONS[currentQuestionIndex];
    quizQuestionEl.textContent = qData.q;

    quizOptionsEl.innerHTML = '';
    const shuffled = shuffle([...qData.options]);

    shuffled.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn glow-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => handleAnswer(opt));
        quizOptionsEl.appendChild(btn);
    });

    animateQuizTransition();
}

function handleAnswer(selected) {
    const qData = QUESTIONS[currentQuestionIndex];
    const normalizedSel = selected.toLowerCase();
    const normalizedAns = qData.answer.toLowerCase();

    if (normalizedSel === normalizedAns) {
        score += 1;
        scoreEl.textContent = score;
        try {
            confetti({ particleCount: 20, spread: 70, origin: { y: 0.7 } });
        } catch (e) { }
        gameArea.classList.add('quiz-correct-flash');
        setTimeout(() => gameArea.classList.remove('quiz-correct-flash'), 300);
    } else {
        gameArea.classList.add('quiz-wrong-shake');
        setTimeout(() => gameArea.classList.remove('quiz-wrong-shake'), 400);
    }

    currentQuestionIndex += 1;
    setTimeout(renderQuestion, 250);
}

function startGame() {
    if (!timeEl || timerInterval) return;

    score = 0;
    scoreEl.textContent = '0';
    timeLeft = 60;
    timeEl.textContent = timeLeft;
    currentQuestionIndex = 0;

    showPanel(quizContainer);

    timerInterval = setInterval(() => {
        timeLeft -= 1;
        if (timeLeft < 0) timeLeft = 0;
        timeEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);

    if (startBtn) {
        startBtn.textContent = 'Quiz Running...';
        startBtn.disabled = true;
    }

    renderQuestion();
}

function endGame() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    const maxScore = QUESTIONS.length;
    const passingScore = 7;
    const passed = score >= passingScore;

    let title;
    let msg;
    if (passed) {
        title = 'You passed!';
        msg = `Great job, prof-to-be! You scored ${score}/${maxScore}.`;
    } else {
        title = 'Let\'s review together';
        msg = `You scored ${score}/${maxScore}. Passing is ${passingScore}. I\'ll study with you 💗`;
    }
    quizResultTitle.textContent = title;
    quizResultMessage.textContent = msg;

    if (teddyBearContainer) {
        if (passed) {
            showTeddyBear();
        } else {
            teddyBearContainer.innerHTML = '';
        }
    }

    showPanel(quizResult);

    if (startBtn) {
        startBtn.textContent = 'Start Quiz';
        startBtn.disabled = false;
    }
}

if (startBtn) {
    startBtn.addEventListener('click', startGame);
}

if (retryBtn) {
    retryBtn.addEventListener('click', () => {
        score = 0;
        scoreEl.textContent = '0';
        timeLeft = 60;
        timeEl.textContent = timeLeft;
        currentQuestionIndex = 0;
        showPanel(quizContainer);
        if (!timerInterval) {
            timerInterval = setInterval(() => {
                timeLeft -= 1;
                if (timeLeft < 0) timeLeft = 0;
                timeEl.textContent = timeLeft;
                if (timeLeft <= 0) {
                    endGame();
                }
            }, 1000);
        }
        if (startBtn) {
            startBtn.textContent = 'Quiz Running...';
            startBtn.disabled = true;
        }
        renderQuestion();
    });
}

function showTeddyBear() {
    if (!teddyBearContainer) return;
    teddyBearContainer.innerHTML = `
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
            <div class="bear-msg">You passed the history quiz!<br>Here\'s your teddy bear 🧸</div>
        </div>
    `;
}

window.addEventListener('blur', () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
});
