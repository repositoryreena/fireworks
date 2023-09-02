const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create an array to store fireworks
const fireworks = [];

// Function to create fireworks at a specific position
function createFirework(x, y) {
    const numberOfParticles = 100; // Number of particles in the explosion
    const explosionSpeed = 2; // Speed at which particles move away from the center

    for (let i = 0; i < numberOfParticles; i++) {
        const angle = (Math.PI * 2) * (i / numberOfParticles);
        const speed = Math.random() * explosionSpeed;
        const particle = {
            x,
            y,
            color: `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`,
            radius: 2,
            speed,
            angle,
            gravity: 0.2,
            opacity: 1,
        };
        fireworks.push(particle);
    }
}

// Function to update and draw fireworks
function updateFireworks() {
    for (let i = 0; i < fireworks.length; i++) {
        const particle = fireworks[i];

        // Update particle's position and attributes
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y -= Math.sin(particle.angle) * particle.speed;
        particle.speed -= particle.gravity;
        particle.opacity -= 0.02;

        // Remove particles that fade out
        if (particle.opacity <= 0) {
            fireworks.splice(i, 1);
            i--;
            continue;
        }

        // Draw the particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

// Function to animate the fireworks
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateFireworks();
}

// Listen for mouse clicks on the canvas
canvas.addEventListener("click", (event) => {
    createFirework(event.clientX, event.clientY);
});

// Start the animation
animate();
