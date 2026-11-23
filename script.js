const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const yearEl = document.getElementById('year');
const revealItems = document.querySelectorAll('.reveal');
const themeToggle = document.querySelector('.theme-toggle');
const sections = document.querySelectorAll('main section[id]');

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

function setChatOpen(isOpen) {
    if (!chatPanel || !chatLauncher) return;

    chatPanel.classList.toggle('open', isOpen);
    chatPanel.setAttribute('aria-hidden', String(!isOpen));
    chatLauncher.setAttribute('aria-expanded', String(isOpen));
    chatLauncher.setAttribute('aria-label', isOpen ? 'Close portfolio assistant' : 'Open portfolio assistant');

    if (isOpen) {
        window.setTimeout(() => chatInput?.focus(), 180);
    }
}

chatLauncher?.addEventListener('click', () => {
    setChatOpen(!chatPanel?.classList.contains('open'));
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

    if (/hello|hi\b|hey|good (morning|afternoon|evening)/.test(query)) {
        return "Hello! You can ask me about Ismail's education, skills, projects, ORCID profile, or contact details.";
    }

    if (/contact|email|linkedin|github|reach|connect/.test(query)) {
        return "You can email Ismail at 25-62976-2@student.aiub.edu. His LinkedIn is linkedin.com/in/ismail-siddiquee-93b354407 and his GitHub is github.com/ih6297191-sudo.";
    }

    if (/education|study|university|college|school|degree|aiub|academic/.test(query)) {
        return "Ismail is pursuing a BSc in Computer Science and Engineering at American International University-Bangladesh (AIUB), starting in 2025. He completed HSC at Notre Dame College Mymensingh and SSC at Govt. Fulbariya Model Pilot High School.";
    }

    if (/skill|language|technology|tech|coding|programming|know|stack/.test(query)) {
        return "His skills include Python, Java, C++, JavaScript, C#, HTML5, CSS3, React, Node.js, Git, MySQL, Linux, and Cloud Computing.";
    }

    if (/project|work|portfolio|vehicle|rental|built|build/.test(query)) {
        return "Ismail has built a Vehicle Rental Company Java console application using text-file storage, and a responsive Personal Portfolio in HTML, CSS, and JavaScript.";
    }

    if (/orcid|research|researcher|profile/.test(query)) {
        return "Ismail's ORCID research profile is available at https://orcid.org/0009-0008-0176-7138.";
    }

    if (/name|who (is|are) (he|you)|about/.test(query)) {
        return "Ismail Siddiquee is a Computer Science and Engineering undergraduate at AIUB who enjoys software development, problem solving, and building practical applications.";
    }

    if (/thank|thanks/.test(query)) {
        return "You're welcome!";
    }

    return "I can answer from the local portfolio data: try asking about skills, education, projects, contact details, or the ORCID profile.";
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
