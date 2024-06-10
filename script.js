document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const popup = document.getElementById('popup');
    const popupImg = document.getElementById('popup-img');
    const popupDescription = document.getElementById('popup-description');
    const closeBtn = document.querySelector('.close-btn');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            if (item.closest('#my-work')) { // Check if the clicked item is within the "Dev Stuff" section
                popupImg.src = item.src;
                // Create a link element with the "Try it out" text
                const link = document.createElement('a');
                link.href = item.getAttribute('data-link'); // Get the link from the data-link attribute
                link.target = '_blank'; // Open link in a new tab
                link.textContent = 'Try it out';
                // Create the description text with the link
                const description = document.createElement('span');
                description.textContent = item.getAttribute('data-description') + ' ';
                description.appendChild(link); // Append the link to the description
                // Clear previous description content
                popupDescription.innerHTML = '';
                // Append the new description content to the popup
                popupDescription.appendChild(description);
                popup.style.display = 'block';
            } else {
                // For items outside of the "Dev Stuff" section, display the default description without the link
                popupImg.src = item.src;
                popupDescription.textContent = item.getAttribute('data-description');
                popup.style.display = 'block';
            }
        });
    });
    

document.addEventListener('keydown', function(event) {
    if (event.key === "c" || event.key === "C") {
      launchConfetti();
    }
});

    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});

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

window.onload = function() {
    const canvas = document.getElementById('confetti-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

document.addEventListener('keydown', function(event) {
    if (event.key === "c" || event.key === "C") {
      launchConfetti();
    }
});