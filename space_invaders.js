/**
 * Space Invaders Game Logic
 * integrated for Portfolio Website
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inject Game CSS
    const gameStyles = `
    .space-invaders-modal {
        position: fixed;
        inset: 0;
        z-index: 100;
        background: rgba(0, 0, 0, 0.5); /* Match nav menu bg-black/50 */
        backdrop-filter: blur(4px);    /* Match nav menu backdrop-blur-sm */
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    .space-invaders-modal.active {
        display: flex;
        opacity: 1;
    }
    canvas#space-invaders-canvas {
        background: rgba(0, 0, 0, 0.8); /* Slight transparency for game area */
        border: 1px solid rgba(255, 255, 255, 0.1); /* Subtle white border */
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.5); /* No green glow */
        border-radius: 12px;
        max-width: 100%;
        max-height: 80vh;
        cursor: none; /* Hide default cursor during game */
    }
    .game-ui {
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        max-width: 800px;
        display: flex;
        justify-content: space-between;
        color: #fff;
        font-family: 'Plus Jakarta Sans', sans-serif; /* Match site font */
        padding: 0 20px;
        pointer-events: none;
        z-index: 102;
    }
    .game-score {
        font-size: 24px;
        font-weight: 800;
        text-shadow: 0 0 10px rgba(255,255,255,0.5);
    }
    .game-controls-hint {
        color: rgba(255, 255, 255, 0.5);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }
    .game-close-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 103;
        transition: all 0.2s;
        backdrop-filter: blur(4px);
    }
    .game-close-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: rotate(90deg);
    }
    .game-over-screen {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        display: none;
        flex-direction: column;
        gap: 20px;
        background: rgba(10, 10, 10, 0.9);
        padding: 40px;
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 20px;
        backdrop-filter: blur(10px);
    }
    .game-over-screen.active {
        display: flex;
    }
    .restart-btn {
        background: #fff;
        color: #000;
        border: none;
        padding: 10px 30px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-weight: bold;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        cursor: pointer;
        transition: all 0.3s;
        border-radius: 99px;
    }
    .restart-btn:hover {
        box-shadow: 0 0 20px rgba(255,255,255,0.5);
        transform: scale(1.05);
    }
    .level-indicator {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-weight: 900;
        font-size: 72px;
        color: white;
        pointer-events: none;
        opacity: 0;
        z-index: 105;
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        text-shadow: 0 0 30px rgba(255,255,255,0.3);
    }
    .level-indicator.active {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.2);
    }
    .game-stats {
        display: flex;
        gap: 30px;
    }
    .stat-label {
        font-size: 10px;
        color: rgba(255,255,255,0.4);
        margin-bottom: 2px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }
    .stat-value {
        font-size: 20px;
        font-weight: 800;
        color: white;
    }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = gameStyles;
    document.head.appendChild(styleSheet);

    // Inject Game DOM
    const gameOverlay = document.createElement('div');
    gameOverlay.className = 'space-invaders-modal';
    gameOverlay.innerHTML = `
        <button class="game-close-btn">
            <span class="material-symbols-outlined text-sm">close</span>
        </button>
        <div class="game-ui">
            <div class="game-stats">
                <div>
                    <div class="stat-label">Score</div>
                    <div class="stat-value" id="si-score">0</div>
                </div>
                <div>
                    <div class="stat-label">High Score</div>
                    <div class="stat-value" id="si-high-score">0</div>
                </div>
            </div>
            <div style="text-align: center;">
                <div class="stat-label">Level</div>
                <div class="stat-value" id="si-level">1</div>
            </div>
            <div class="game-controls-hint">MOUSE to Move • CLICK to Shoot</div>
        </div>
        <div class="level-indicator" id="si-level-indicator">LEVEL 1</div>
        <canvas id="space-invaders-canvas" width="800" height="600"></canvas>
        <div class="game-over-screen" id="si-game-over">
            <h1 style="font-family: 'Plus Jakarta Sans'; font-weight: 900; color: white; font-size: 48px; margin: 0;">GAME OVER</h1>
            <p style="color: #888; font-family: 'Plus Jakarta Sans'; font-size: 16px;">Final Score: <span id="si-final-score" style="color: white; font-weight: bold;">0</span></p>
            <p style="color: #555; font-family: 'Plus Jakarta Sans'; font-size: 12px; margin-top: -10px;">High Score: <span id="si-final-high-score">0</span></p>
            <button class="restart-btn" id="si-restart-btn">Try Again</button>
        </div>
    `;
    document.body.appendChild(gameOverlay);

    // --- GAME LOGIC ---
    const canvas = document.getElementById('space-invaders-canvas');
    const ctx = canvas.getContext('2d');
    const scoreEl = document.getElementById('si-score');
    const highScoreEl = document.getElementById('si-high-score');
    const levelEl = document.getElementById('si-level');
    const levelIndicatorEl = document.getElementById('si-level-indicator');
    const finalScoreEl = document.getElementById('si-final-score');
    const finalHighScoreEl = document.getElementById('si-final-high-score');
    const gameOverScreen = document.getElementById('si-game-over');
    const restartBtn = document.getElementById('si-restart-btn');
    const closeBtn = gameOverlay.querySelector('.game-close-btn');

    let gameActive = false;
    let score = 0;
    let level = 1;
    let highScore = localStorage.getItem('si-high-score') || 0;
    highScoreEl.innerText = highScore;

    let animationId;
    let particles = [];

    // Player
    const player = {
        x: canvas.width / 2,
        y: canvas.height - 60,
        width: 40,
        height: 40,
        bullets: []
    };

    // Audio Assets
    const laserSound = new Audio('Laser Gun Sound Effect.mp3');
    const boomSound = new Audio('Boom Sound Effect.mp3');
    laserSound.preload = 'auto';
    boomSound.preload = 'auto';

    function playSound(audio, volume = 0.4, startTime = 0) {
        const clone = audio.cloneNode();
        clone.volume = volume;
        clone.currentTime = startTime;
        clone.play().catch(e => console.log("Sound play blocked:", e));
    }

    // Aliens
    let aliens = [];
    const alienRows = 4;
    const alienCols = 8;
    const alienWidth = 40;
    const alienHeight = 30;
    const alienPadding = 20;
    const alienOffsetTop = 60;
    const alienOffsetLeft = 50;
    let alienDirection = 1; // 1 right, -1 left
    let alienSpeed = 1;

    // Mouse Input
    let mouseX = canvas.width / 2;

    // Assets
    function drawPlayer() {
        ctx.fillStyle = '#ffffff'; // White
        ctx.shadowColor = '#ffffff'; // White Glow
        ctx.shadowBlur = 20;

        // Sleek ship shape
        ctx.beginPath();
        ctx.moveTo(player.x, player.y);
        ctx.lineTo(player.x + 10, player.y + 10);
        ctx.lineTo(player.x + player.width / 2, player.y + player.height);
        ctx.lineTo(player.x - player.width / 2, player.y + player.height);
        ctx.lineTo(player.x - 10, player.y + 10);
        ctx.closePath();
        ctx.fill();

        ctx.shadowBlur = 0; // Reset shadow
    }

    function drawAlien(x, y) {
        ctx.fillStyle = '#fff';
        // Simple alien shape
        ctx.fillRect(x, y, alienWidth, alienHeight);

        // Eyes (Dark)
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(x + 10, y + 10, 5, 5);
        ctx.fillRect(x + 25, y + 10, 5, 5);
    }

    function drawBullet(x, y) {
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 10;
        ctx.fillRect(x - 2, y, 4, 12);
        ctx.shadowBlur = 0;
    }

    function createAliens() {
        aliens = [];
        for (let c = 0; c < alienCols; c++) {
            for (let r = 0; r < alienRows; r++) {
                aliens.push({
                    x: (c * (alienWidth + alienPadding)) + alienOffsetLeft,
                    y: (r * (alienHeight + alienPadding)) + alienOffsetTop,
                    status: 1
                });
            }
        }
    }

    function createParticle(x, y) {
        const colors = ['#fff', '#ffeb3b', '#ff9800']; // White, Yellow, Orange
        for (let i = 0; i < 24; i++) {
            particles.push({
                x: x,
                y: y,
                dx: (Math.random() - 0.5) * 8, // Slightly faster spread
                dy: (Math.random() - 0.5) * 8,
                radius: Math.random() * 2.5,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 1
            });
        }
    }

    function update() {
        if (!gameActive) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update Player Position via Mouse
        // Smooth lerp for nicer feel, or direct mapping
        // Let's do direct mapping but clamped within screen
        player.x = Math.max(player.width / 2, Math.min(canvas.width - player.width / 2, mouseX));

        drawPlayer();

        // Bullets
        player.bullets.forEach((bullet, index) => {
            bullet.y -= 10; // Faster bullets
            drawBullet(bullet.x, bullet.y);

            // Remove off-screen bullets
            if (bullet.y < 0) {
                player.bullets.splice(index, 1);
            }

            // Bullet Collision with Aliens
            aliens.forEach(alien => {
                if (alien.status === 1) {
                    if (bullet.x > alien.x &&
                        bullet.x < alien.x + alienWidth &&
                        bullet.y > alien.y &&
                        bullet.y < alien.y + alienHeight) {

                        alien.status = 0;
                        score += 10;
                        scoreEl.innerText = score;
                        createParticle(alien.x + alienWidth / 2, alien.y + alienHeight / 2);
                        playSound(boomSound, 0.15, 0.1); // Lower volume and skip 0.1s silence for boom

                        // Remove bullet
                        player.bullets.splice(index, 1);
                    }
                }
            });
        });

        // Aliens Movement
        let edgeReached = false;
        aliens.forEach(alien => {
            if (alien.status === 1) {
                alien.x += alienSpeed * alienDirection;
                drawAlien(alien.x, alien.y);

                if (alien.x + alienWidth > canvas.width - alienOffsetLeft || alien.x < alienOffsetLeft) {
                    edgeReached = true;
                }

                // Game Over Check
                if (alien.y + alienHeight > player.y) {
                    gameOver();
                }
            }
        });

        if (edgeReached) {
            alienDirection *= -1;
            aliens.forEach(alien => {
                alien.y += 20; // Move down
            });
            alienSpeed += 0.2;
        }

        // Particles
        particles.forEach((p, i) => {
            p.x += p.dx;
            p.y += p.dy;
            p.life -= 0.04; // Slightly slower fade

            ctx.save();
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            if (p.life <= 0) particles.splice(i, 1);
        });

        // Win Condition
        if (aliens.filter(a => a.status === 1).length === 0) {
            level++;
            levelEl.innerText = level;
            alienSpeed += 0.5;
            showLevelIndicator(`LEVEL ${level}`);
            createAliens();
        }

        animationId = requestAnimationFrame(update);
    }

    function showLevelIndicator(text) {
        levelIndicatorEl.innerText = text;
        levelIndicatorEl.classList.add('active');
        setTimeout(() => {
            levelIndicatorEl.classList.remove('active');
        }, 2000);
    }

    function gameOver() {
        gameActive = false;
        cancelAnimationFrame(animationId);

        if (score > highScore) {
            highScore = score;
            localStorage.setItem('si-high-score', highScore);
            highScoreEl.innerText = highScore;
        }

        gameOverScreen.classList.add('active');
        finalScoreEl.innerText = score;
        finalHighScoreEl.innerText = highScore;
        canvas.style.cursor = 'default';
    }

    function initGame() {
        score = 0;
        level = 1;
        scoreEl.innerText = '0';
        levelEl.innerText = '1';
        highScoreEl.innerText = highScore;
        gameActive = true;
        gameOverScreen.classList.remove('active');
        createAliens();
        player.bullets = [];
        alienSpeed = 1;
        canvas.style.cursor = 'none'; // Hide cursor inside game
        showLevelIndicator('LEVEL 1');
        update();
    }

    // Controls
    // Track mouse position relative to canvas
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        // Calculate mouse X relative to canvas scaling
        const scaleX = canvas.width / rect.width;
        mouseX = (e.clientX - rect.left) * scaleX;
    });

    // Click to shoot
    canvas.addEventListener('mousedown', (e) => {
        if (gameActive) {
            player.bullets.push({ x: player.x, y: player.y });
            playSound(laserSound);
        }
    });

    // Buttons
    restartBtn.addEventListener('click', initGame);
    closeBtn.addEventListener('click', () => {
        gameActive = false;
        gameOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // OPEN GAME EVENT
    window.openSpaceInvaders = function () {
        gameOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        initGame();
    }
});
