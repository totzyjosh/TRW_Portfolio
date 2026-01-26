document.addEventListener('DOMContentLoaded', () => {
    // Create Canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'cursor-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none'; // Click-through
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];

    // Resize Handlers
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Mouse Tracking
    const mouse = { x: undefined, y: undefined };
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        // Spawn particles (Pixie Dust) on move
        for (let i = 0; i < 3; i++) {
            particles.push(new Particle());
        }
    });

    // Particle Class
    class Particle {
        constructor() {
            this.x = mouse.x;
            this.y = mouse.y;
            // Random spread
            this.size = Math.random() * 2 + 0.5; // Small glowing specks, 0.5 to 2.5px
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.life = 1; // Alpha/Life
            this.decay = Math.random() * 0.02 + 0.01; // Fade speed
            this.color = '255, 255, 255'; // White

            // Add slight offset so they don't all spawn exact center
            this.x += Math.random() * 10 - 5;
            this.y += Math.random() * 10 - 5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= this.decay;
            // Shrink slightly
            if (this.size > 0.1) this.size -= 0.02;
        }

        draw() {
            ctx.fillStyle = `rgba(${this.color}, ${this.life})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'white';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            // Reset shadow to avoid affecting other draws if any (though clearRect handles it)
            ctx.shadowBlur = 0;
        }
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            if (particles[i].life <= 0 || particles[i].size <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(animate);
    }

    animate();
});
