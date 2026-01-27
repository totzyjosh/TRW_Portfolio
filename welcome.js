document.addEventListener('DOMContentLoaded', () => {
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const loopVideo = document.getElementById('welcome-loop-video');
    const explosionVideo = document.getElementById('welcome-explosion-video');
    const enterButton = document.getElementById('enter-button');
    const whiteFlash = document.querySelector('.white-flash');
    const body = document.body;

    // Prevent scrolling behind welcome screen
    body.style.overflow = 'hidden';

    // Particle System Removed per request

    // Pre-seek explosion video to 1s & Mute it
    if (explosionVideo) {
        explosionVideo.currentTime = 1;
        explosionVideo.muted = true; // No sound
    }

    // Ensure loop video plays
    if (loopVideo) {
        loopVideo.play().catch(e => console.warn("Loop video require interaction:", e));
    }

    // Typing Animation Logic
    // Typing Animation Logic & Global Interaction
    if (enterButton) {
        const text1 = "WELCOME";
        // Single spaces for tighter appearance
        const text2 = "CLICK ANYWHERE TO BEGIN";
        const typingSpeed = 100;
        const pauseBetween = 1500;


        enterButton.innerText = "";

        let isLooping = true;

        function typeString(str, onComplete) {
            if (!isLooping) return;
            let i = 0;
            const interval = setInterval(() => {
                enterButton.innerText = str.substring(0, i + 1);
                i++;
                if (i > str.length) {
                    clearInterval(interval);
                    setTimeout(onComplete, pauseBetween);
                }
            }, typingSpeed);
        }

        function deleteString(onComplete) {
            if (!isLooping) return;
            let len = enterButton.innerText.length;
            const interval = setInterval(() => {
                enterButton.innerText = enterButton.innerText.substring(0, len - 1);
                len--;
                if (len <= 0) {
                    clearInterval(interval);
                    setTimeout(onComplete, typingSpeed);
                }
            }, typingSpeed / 2);
        }

        function runLoop() {
            if (!isLooping) return;
            typeString(text1, () => {
                deleteString(() => {
                    typeString(text2, () => {
                        deleteString(() => {
                            runLoop();
                        });
                    });
                });
            });
        }

        // Start loop
        setTimeout(runLoop, 500);

        // Global Click Listener
        function handleWelcomeClick(e) {
            // Only act if overlay exists
            if (!welcomeOverlay || !document.contains(welcomeOverlay)) return;

            // Stop loop
            isLooping = false;

            // Prevent multiple triggers
            if (welcomeOverlay.classList.contains('clicked')) return;
            welcomeOverlay.classList.add('clicked');

            // 1. Hide Button
            enterButton.style.opacity = '0';

            // 2. Play Explosion
            explosionVideo.style.display = 'block';
            document.querySelector('.video-wrapper').classList.add('zoom-active');
            explosionVideo.play().catch(console.error);

            // 3. Handle Transition Logic
            const triggerFlash = () => {
                if (whiteFlash.classList.contains('flash-active')) return;
                // Transition handled in CSS via transform scale
                whiteFlash.classList.add('flash-active');
            };

            const cleanup = () => {
                window.scrollTo(0, 0);
                setTimeout(() => {
                    welcomeOverlay.classList.add('fade-out');
                    body.style.overflow = '';
                    setTimeout(() => {
                        welcomeOverlay.remove();
                        document.removeEventListener('click', handleWelcomeClick);
                    }, 4000);
                }, 1000);
            };

            // Trigger flash 2.5s before video ends
            const checkTime = () => {
                if (explosionVideo.duration && explosionVideo.currentTime >= explosionVideo.duration - 2.5) {
                    triggerFlash();
                    explosionVideo.removeEventListener('timeupdate', checkTime);
                }
            };

            explosionVideo.addEventListener('timeupdate', checkTime);

            // Backup/Cleanup on end
            explosionVideo.addEventListener('ended', () => {
                triggerFlash(); // Ensure flash runs if timeupdate missed
                cleanup();
            }, { once: true });
        }

        // Listen purely to document click to catch ALL interactions
        document.addEventListener('click', handleWelcomeClick);
    }
});
