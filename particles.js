const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

// Configuration
let particleCount = window.innerWidth < 768 ? 50 : 250; // Dynamic count: 50 for mobile, 250 for desktop
const connectionDistance = 180; // Increased reach
const mouseDistance = 300; // Increased interaction radius
const particleSpeed = 0.6; // Slightly faster

// Resize handling
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    // Update particle count on resize if device orientation changes
    const targetCount = window.innerWidth < 768 ? 50 : 250;
    if (particleCount !== targetCount) {
        particleCount = targetCount;
        init();
    }
}
window.addEventListener('resize', resize);
resize();

// Mouse state
const mouse = { x: null, y: null };
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

// Click interaction (Burst/Push)
// Click interaction (Spawn Particle)
window.addEventListener('mousedown', (e) => {
    // Create new particle at mouse position
    const p = new Particle();
    p.x = e.clientX;
    p.y = e.clientY;

    // Give it a random burst velocity
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2 + 1;
    p.vx = Math.cos(angle) * speed;
    p.vy = Math.sin(angle) * speed;

    particles.push(p);

    // Optional: Remove oldest particle if too many to keep performance high
    if (particles.length > particleCount + 20) {
        particles.shift();
    }
});

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * particleSpeed;
        this.vy = (Math.random() - 0.5) * particleSpeed;
        this.size = Math.random() * 2 + 1;
    }

    update() {
        // Move
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction
        if (mouse.x != null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouseDistance) {
                // Gentle attraction/repulsion - let's do slight repulsion for "interactive" feel
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (mouseDistance - distance) / mouseDistance;
                // Move slightly away
                this.vx -= forceDirectionX * force * 0.8;
                this.vy -= forceDirectionY * force * 0.8;
            }
        }

        // Friction to stabilize speed
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > particleSpeed * 2) {
            this.vx *= 0.95;
            this.vy *= 0.95;
        }
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // Increased opacity
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

// Black Hole State
// Removed

function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // Draw connections
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                const opacity = 1 - (distance / connectionDistance);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }

    // Draw mouse connections
    if (mouse.x != null) {
        particles.forEach(p => {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouseDistance) {
                const opacity = 1 - (distance / mouseDistance);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(mouse.x, mouse.y);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();
            }
        });
    }

    requestAnimationFrame(animate);
}

init();
animate();
