const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const yearEl = document.getElementById('year');
const revealItems = document.querySelectorAll('.reveal');
const themeToggle = document.querySelector('.theme-toggle');
const sections = document.querySelectorAll('main section[id]');
const scrollTopButton = document.getElementById('scroll-top-button');

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

if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            navLinks.forEach((link) => {
                const isActive = link.getAttribute('href') === `#${entry.target.id}`;
                link.classList.toggle('active', isActive);
                if (isActive) {
                    link.setAttribute('aria-current', 'location');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        });
    }, { rootMargin: '-35% 0px -55%', threshold: 0 });

    sections.forEach((section) => navObserver.observe(section));
}

const portfolioChat = document.getElementById('portfolio-chat');
const chatLauncher = portfolioChat?.querySelector('.chat-launcher');
const chatPanel = document.getElementById('chat-panel');
const chatClose = portfolioChat?.querySelector('.chat-close');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
let chatLabelTimeout;
let idleChatLabelTimeout;
let chatHasBeenInteracted = false;

function showChatLauncherLabel(duration = 2400) {
    if (!chatLauncher) return;

    window.clearTimeout(chatLabelTimeout);
    chatLauncher.classList.add('show-label');
    chatLabelTimeout = window.setTimeout(() => {
        chatLauncher.classList.remove('show-label');
    }, duration);
}

function setChatOpen(isOpen) {
    if (!chatPanel || !chatLauncher) return;

    if (isOpen) {
        chatHasBeenInteracted = true;
        window.clearTimeout(idleChatLabelTimeout);
        chatLauncher.classList.remove('show-label');
    }

    chatPanel.classList.toggle('open', isOpen);
    document.body.classList.toggle('chat-open', isOpen);
    chatPanel.setAttribute('aria-hidden', String(!isOpen));
    chatLauncher.setAttribute('aria-expanded', String(isOpen));
    chatLauncher.setAttribute('aria-label', isOpen ? "Close Ismail's AI assistant" : "Open Ismail's AI assistant");

    if (isOpen) {
        window.setTimeout(() => chatInput?.focus(), 180);
    }
}

chatLauncher?.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse') {
        chatLauncher.classList.remove('tap-bounce');
        void chatLauncher.offsetWidth;
        chatLauncher.classList.add('tap-bounce');
        window.setTimeout(() => chatLauncher.classList.remove('tap-bounce'), 520);
    }
});

chatLauncher?.addEventListener('click', () => {
    showChatLauncherLabel();
    setChatOpen(!chatPanel?.classList.contains('open'));
});

chatLauncher?.addEventListener('mouseenter', () => {
    if (!chatPanel?.classList.contains('open')) {
        showChatLauncherLabel();
    }
});

chatLauncher?.addEventListener('focus', () => {
    if (!chatPanel?.classList.contains('open')) {
        showChatLauncherLabel();
    }
});

chatClose?.addEventListener('click', () => setChatOpen(false));

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && chatPanel?.classList.contains('open')) {
        setChatOpen(false);
        chatLauncher?.focus();
    }
});

function appendChatMessage(text, sender) {
    if (!chatMessages) return;

    const message = document.createElement('div');
    message.className = `chat-message ${sender}-message`;
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getPortfolioResponse(question) {
    const query = question.toLowerCase();
    const data = window.portfolioAssistantData;

    if (!data) {
        return "The portfolio assistant is missing its knowledge data.";
    }

    if (data.greetings?.some(greeting => query === greeting || query.startsWith(`${greeting} `))) {
        return data.greetingAnswer;
    }

    let bestMatch = null;
    let bestScore = 0;

    data.knowledge.forEach((entry) => {
        const score = entry.keywords.reduce((total, keyword) => {
            return total + (query.includes(keyword.toLowerCase()) ? keyword.length : 0);
        }, 0);

        if (score > bestScore) {
            bestScore = score;
            bestMatch = entry;
        }
    });

    return bestScore > 0 ? bestMatch.answer : data.fallback;
}

function submitChatQuestion(question) {
    const cleanQuestion = question.trim();
    if (!cleanQuestion) return;

    appendChatMessage(cleanQuestion, 'user');
    const response = getPortfolioResponse(cleanQuestion);

    window.setTimeout(() => appendChatMessage(response, 'bot'), 280);
}

chatForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!chatInput) return;

    submitChatQuestion(chatInput.value);
    chatInput.value = '';
});

portfolioChat?.querySelectorAll('[data-question]').forEach((button) => {
    button.addEventListener('click', () => {
        submitChatQuestion(button.dataset.question || '');
    });
});

if (chatLauncher && chatPanel) {
    idleChatLabelTimeout = window.setTimeout(() => {
        if (!chatHasBeenInteracted && !chatPanel.classList.contains('open')) {
            showChatLauncherLabel(5000);
        }
    }, 10000);
}

if (scrollTopButton) {
    const updateScrollTopButton = () => {
        scrollTopButton.classList.toggle('visible', window.scrollY > 300);
        scrollTopButton.setAttribute('aria-hidden', String(window.scrollY <= 300));
    };

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
        });
    });

    window.addEventListener('scroll', updateScrollTopButton, { passive: true });
    updateScrollTopButton();
}
