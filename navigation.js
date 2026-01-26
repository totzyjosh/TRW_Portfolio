document.addEventListener('DOMContentLoaded', () => {
    const navHtml = `
    <!-- Navigation Overlay -->
    <div id="nav-overlay" class="fixed inset-0 z-[100] hidden items-center justify-center p-4 md:p-10 bg-black/50 backdrop-blur-sm">
        <div class="relative w-full max-w-7xl min-h-[500px] md:min-h-0 md:aspect-[16/9] bg-white dark:bg-zinc-900 rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col p-6 md:p-16 border border-zinc-100 dark:border-zinc-800 hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] transition-all duration-500 animate-slideIn">
            <div class="flex justify-between items-start w-full z-10">
                <div class="flex flex-col">
                    <h2 class="text-lg md:text-xl font-bold text-zinc-900 dark:text-zinc-100">JOSHUA ADRIANE A. LARA</h2>
                    <p class="text-zinc-500 dark:text-zinc-400 font-medium">Computer Engineering Student</p>
                </div>
                <button id="nav-close-btn" class="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors group">
                    <span class="material-symbols-outlined text-zinc-900 dark:text-zinc-100 group-hover:rotate-90 transition-transform duration-300">close</span>
                </button>
            </div>
            <div class="flex-grow flex flex-col justify-center gap-2 md:gap-4 mt-8">
                <nav class="flex flex-col items-start space-y-2 md:space-y-0">
                    <a href="#home" class="nav-item group flex items-center">
                        <span class="text-4xl md:text-7xl font-extrabold text-zinc-900 dark:text-zinc-100 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 transition-all duration-300">Home</span>
                    </a>
                    <a href="#experience" class="nav-item group flex items-center">
                        <span class="text-4xl md:text-7xl font-extrabold text-zinc-900 dark:text-zinc-100 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-cyan-600 transition-all duration-300">Experience</span>
                    </a>
                    <a href="#projects" class="nav-item group flex items-center">
                        <span class="text-4xl md:text-7xl font-extrabold text-zinc-900 dark:text-zinc-100 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-400 hover:to-emerald-600 transition-all duration-300">Projects</span>
                    </a>
                    <a href="#skills" class="nav-item group flex items-center">
                        <span class="text-4xl md:text-7xl font-extrabold text-zinc-900 dark:text-zinc-100 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-600 transition-all duration-300">Skills</span>
                    </a>
                    <a href="#education" class="nav-item group flex items-center">
                        <span class="text-4xl md:text-7xl font-extrabold text-zinc-900 dark:text-zinc-100 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-400 hover:to-rose-600 transition-all duration-300">Education</span>
                    </a>
                    <a href="#about" class="nav-item group flex items-center">
                        <span class="text-4xl md:text-7xl font-extrabold text-zinc-900 dark:text-zinc-100 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-400 hover:to-violet-600 transition-all duration-300">About</span>
                    </a>
                    <a href="resumeoutdated.pdf" target="_blank" class="nav-item group flex items-center">
                        <span class="text-4xl md:text-7xl font-extrabold text-zinc-900 dark:text-zinc-100 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-teal-400 hover:to-cyan-600 transition-all duration-300">Resume</span>
                    </a>
                </nav>
            </div>
            
            <!-- Decorational Blobs -->
            <div class="absolute top-1/2 right-10 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
            <div class="absolute bottom-10 left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none -z-10"></div>
        </div>
    </div>

    <!-- Contact Overlay -->
    <div id="contact-overlay" class="fixed inset-0 z-[100] hidden items-center justify-center p-4 md:p-10 bg-black/50 backdrop-blur-sm">
        <div class="relative w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col p-8 md:p-12 border border-zinc-100 dark:border-zinc-800 hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-500 animate-slideIn">
            <div class="flex justify-between items-start w-full mb-8">
                <h2 class="text-3xl md:text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-zinc-100">Get in Touch</h2>
                <button id="contact-close-btn" class="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors group">
                    <span class="material-symbols-outlined text-zinc-900 dark:text-zinc-100 group-hover:rotate-90 transition-transform duration-300">close</span>
                </button>
            </div>
            
            <div class="flex flex-col gap-8">
                <div class="group">
                    <label class="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Email</label>
                    <a href="mailto:jalara12082003@gmail.com" class="text-2xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-cyan-600 transition-all duration-300 break-all cursor-pointer">
                        jalara12082003@gmail.com
                    </a>
                </div>
                <div class="group">
                    <label class="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Phone</label>
                    <a href="tel:+639163755223" class="text-2xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-400 hover:to-emerald-600 transition-all duration-300 cursor-pointer">
                        0916 375 5223
                    </a>
                </div>
            </div>

            <div class="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-zinc-400 text-sm">
                <span>Based in Philippines</span>
                <span>Open for opportunities</span>
            </div>
        </div>
    </div>

    <style>
        .nav-item { transition: transform 0.3s ease; }
        .nav-item:hover { transform: translateX(1.5rem); }
        @keyframes slideIn {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideIn { animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
    </style>
    `;

    // Inject HTML
    const div = document.createElement('div');
    div.innerHTML = navHtml;
    document.body.appendChild(div);

    // --- Navigation Logic ---
    const navOverlay = document.getElementById('nav-overlay');
    const navCloseBtn = document.getElementById('nav-close-btn');
    const navTriggers = document.querySelectorAll('.menu-trigger'); // The hamburger menu
    const navLinks = document.querySelectorAll('.nav-item');

    function openNav() {
        navOverlay.classList.remove('hidden');
        navOverlay.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }

    function closeNav() {
        navOverlay.classList.add('hidden');
        navOverlay.classList.remove('flex');
        document.body.style.overflow = '';
    }

    navTriggers.forEach(btn => btn.addEventListener('click', openNav));
    if (navCloseBtn) navCloseBtn.addEventListener('click', closeNav);
    navLinks.forEach(link => link.addEventListener('click', closeNav));

    // --- Contact Modal Logic ---
    const contactOverlay = document.getElementById('contact-overlay');
    const contactCloseBtn = document.getElementById('contact-close-btn');
    const contactTriggers = document.querySelectorAll('.contact-trigger'); // The "Say Hello" button

    function openContact() {
        contactOverlay.classList.remove('hidden');
        contactOverlay.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }

    function closeContact() {
        contactOverlay.classList.add('hidden');
        contactOverlay.classList.remove('flex');
        document.body.style.overflow = '';
    }

    contactTriggers.forEach(btn => btn.addEventListener('click', openContact));
    if (contactCloseBtn) contactCloseBtn.addEventListener('click', closeContact);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeNav();
            closeContact();
        }
    });

    // Smart Header Logic
    const header = document.querySelector('header');
    header.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)';

    let isScrolling;
    let lastScrollY = window.scrollY;

    // Footer Logic
    const footer = document.getElementById('smart-footer');
    const scrollHint = document.getElementById('scroll-hint');
    const aboutSection = document.getElementById('about');

    if (footer) {
        footer.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    }

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const homeSectionHeight = window.innerHeight * 0.8;

        // Check if we're in the About section
        let isInAboutSection = false;
        if (aboutSection) {
            const aboutTop = aboutSection.offsetTop;
            const aboutBottom = aboutTop + aboutSection.offsetHeight;
            isInAboutSection = currentScrollY + window.innerHeight > aboutTop && currentScrollY < aboutBottom;
        }

        // Scroll Hint Logic (Only show on Home)
        if (scrollHint) {
            if (currentScrollY > 100) {
                scrollHint.style.opacity = '0';
                scrollHint.style.pointerEvents = 'none';
            } else {
                scrollHint.style.opacity = '1';
                scrollHint.style.pointerEvents = 'auto';
            }
        }

        // Hide footer completely if in About section
        if (isInAboutSection && footer) {
            footer.style.transform = 'translateY(100%)';
            footer.style.opacity = '0';
            lastScrollY = currentScrollY;
            return; // Skip the rest of the logic
        }

        // Hide header & footer while actively scrolling (any direction)
        if (currentScrollY > homeSectionHeight) {
            header.style.transform = 'translateY(-100%)';
            header.style.opacity = '0';

            if (footer) {
                footer.style.transform = 'translateY(100%)';
                footer.style.opacity = '0';
            }
        }

        // Show header & footer when scrolling stops
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            // Don't show footer if in About section
            if (!isInAboutSection) {
                header.style.transform = 'translateY(0)';
                header.style.opacity = '1';
                if (footer) {
                    footer.style.transform = 'translateY(0)';
                    footer.style.opacity = '1';
                }
            }
        }, 150);

        lastScrollY = currentScrollY;
    });

    // --- Scroll Reveal Animation Logic ---
    // Select elements to animate
    const revealElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, ul li, .skill-pill, .experience-card, .project-card, .stat-card, .logo-reveal');

    // Add base class to all targets immediately
    revealElements.forEach(el => {
        el.classList.add('scroll-reveal');
    });

    const observerOptions = {
        root: null,
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before bottom
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    revealElements.forEach(el => revealObserver.observe(el));
});
