function generateTracker() {
    const steps = document.getElementById('steps').value.split(',').map(step => step.trim()).filter(step => step);
    const progressTracker = document.getElementById('progress-tracker');
    progressTracker.innerHTML = '';

    if (steps.length === 0) {
        alert("Enter at least one step.");
        return;
    }

    steps.forEach((step, index) => {
        const stepElement = document.createElement('div');
        stepElement.className = 'step';
        stepElement.textContent = step;
        stepElement.onclick = () => selectStep(index);
        progressTracker.appendChild(stepElement);
    });

    document.getElementById('progress-bar-container').style.display = 'block';
    document.getElementById('progress-bar').style.width = '0%';

    document.getElementById('progress-bar').dataset.totalSteps = steps.length;

    updateProgressBar();
}

function selectStep(index) {
    const steps = document.querySelectorAll('.step');

    if (!steps[index].classList.contains('completed')) {
        for (let i = 0; i <= index; i++) {
            steps[i].classList.add('completed');
            steps[i].style.backgroundColor = 'var(--step-complete-color)';
        }
    } else {
        for (let i = index; i < steps.length; i++) {
            steps[i].classList.remove('completed');
            steps[i].style.backgroundColor = 'var(--step-pending-color)';
        }
    }

    updateProgressBar();
}

function updateProgressBar() {
    const totalSteps = parseInt(document.getElementById('progress-bar').dataset.totalSteps, 10);
    const completedSteps = document.querySelectorAll('.step.completed').length;
    const progressBar = document.getElementById('progress-bar');

    const progress = (completedSteps / totalSteps) * 100;
    progressBar.style.width = `${progress}%`;

    if (completedSteps === totalSteps) {
        launchConfetti();
    }
}

function resetTracker() {
    document.getElementById('steps').value = '';
    document.getElementById('progress-tracker').innerHTML = '';
    document.getElementById('progress-bar-container').style.display = 'none';
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

    if (themeButton.textContent === 'Dark Mode') {
        themeButton.textContent = 'Light Mode';
    } else {
        themeButton.textContent = 'Dark Mode';
    }
}

window.onload = function() {
    const canvas = document.getElementById('confetti-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
