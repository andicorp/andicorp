let timer;
let timeLeft;
let goalTime;
let isPaused = false;

function startTimer() {
    const goalHours = parseInt(document.getElementById('goal-hours').value) || 0;
    const goalMinutes = parseInt(document.getElementById('goal-minutes').value) || 0;

    if (goalHours === 0 && goalMinutes === 0) {
        alert("Please enter a valid goal time.");
        return;
    }

    goalTime = (goalHours * 60 * 60) + (goalMinutes * 60);
    timeLeft = goalTime;
    updateDisplay();
    clearInterval(timer);
    timer = setInterval(countdown, 1000);
    isPaused = false;
    document.getElementById('pause-button').textContent = 'Pause';

    document.getElementById('pause-button').classList.remove('hidden');
    document.getElementById('reset-button').classList.remove('hidden');
}

function countdown() {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
    } else {
        clearInterval(timer);
        alert("Time's up!");
        launchConfetti();
    }
}

function updateDisplay() {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    document.getElementById('time-left').textContent = 
        `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function togglePause() {
    const pauseButton = document.getElementById('pause-button');
    if (isPaused) {
        timer = setInterval(countdown, 1000);
        pauseButton.textContent = 'Pause';
    } else {
        clearInterval(timer);
        pauseButton.textContent = 'Unpause';
    }
    isPaused = !isPaused;
}

function resetTimer() {
    clearInterval(timer);
    document.getElementById('goal-hours').value = '';
    document.getElementById('goal-minutes').value = '';
    document.getElementById('time-left').textContent = '00:00:00';
    isPaused = false;
    document.getElementById('pause-button').textContent = 'Pause';

    document.getElementById('pause-button').classList.add('hidden');
    document.getElementById('reset-button').classList.add('hidden');
}

function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const context = canvas.getContext('2d');
    const confettiCount = 300;
    const confetti = [];

    function resetConfetti(confetto) {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        confetto.color = `${red}, ${green}, ${blue}`;
        confetto.x = Math.random() * canvas.width;
        confetto.y = Math.random() * canvas.height - canvas.height;
        confetto.size = Math.random() * 5 + 2;
        confetto.speed = Math.random() * 3 + 1;
        confetto.wind = Math.random() * 2 - 1;
        confetto.opacity = 1;
        return confetto;
    }

    for (let i = 0; i < confettiCount; i++) {
        confetti.push(resetConfetti({}));
    }

    let animationFrameId;

    function update() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach((confetto, index) => {
            confetto.y += confetto.speed;
            confetto.x += confetto.wind;
            confetto.opacity -= 0.005;

            if (confetto.y > canvas.height || confetto.opacity <= 0) {
                confetti.splice(index, 1);
            }

            context.fillStyle = `rgba(${confetto.color}, ${confetto.opacity})`;
            context.fillRect(confetto.x, confetto.y, confetto.size, confetto.size);
        });
        if (confetti.length > 0) {
            animationFrameId = requestAnimationFrame(update);
        }
    }

    update();

    setTimeout(() => {
        cancelAnimationFrame(animationFrameId);
        context.clearRect(0, 0, canvas.width, canvas.height);
    }, 8000);
}

function toggleTheme() {
    const themeButton = document.querySelector('.theme-toggle');
    document.body.classList.toggle('dark-mode');
    themeButton.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
}

window.onload = function() {
    document.getElementById('time-left').textContent = '00:00:00';

    document.getElementById('start-button').addEventListener('click', startTimer);
    document.getElementById('pause-button').addEventListener('click', togglePause);

    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'hidden') {
            clearInterval(timer);
            isPaused = true;
        } else if (document.visibilityState === 'visible' && timeLeft > 0) {
            timer = setInterval(countdown, 1000);
        }
    });
};

window.onload = function() {
    const canvas = document.getElementById('confetti-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
