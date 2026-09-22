const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const yearEl = document.getElementById('year');
const revealItems = document.querySelectorAll('.reveal');
const themeToggle = document.querySelector('.theme-toggle');

if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.setAttribute('aria-label', 'Switch to dark theme');
        themeToggle.setAttribute('aria-pressed', 'true');
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-theme');
        localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
        themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
        themeToggle.setAttribute('aria-pressed', String(isLight));
    });
}

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('active');
        navMenu.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Open navigation menu');
        });
    });
}

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealItems.forEach((item) => revealObserver.observe(item));
