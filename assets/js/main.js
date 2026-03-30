/**
 * LinguaBridge - Main Javascript Controller
 * Handles global theme switching, 1000% RTL functionality, and page-specific interactions.
 */

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Theme Toggle Management
     * Switches between 'light' and 'dark' modes using data-theme attribute on <html>.
     * Persists choice in localStorage.
     */
    const initTheme = () => {
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeToggleIcon(currentTheme);
    };

    const toggleTheme = () => {
        const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeToggleIcon(theme);
    };

    const updateThemeToggleIcon = (theme) => {
        const icons = document.querySelectorAll('.theme-toggle-icon');
        icons.forEach(icon => {
            if (theme === 'dark') {
                icon.classList.remove('bi-moon-fill');
                icon.classList.add('bi-sun-fill');
            } else {
                icon.classList.remove('bi-sun-fill');
                icon.classList.add('bi-moon-fill');
            }
        });
    };

    const themeBtns = document.querySelectorAll('#theme-toggle, .theme-toggle-btn');
    themeBtns.forEach(btn => btn.addEventListener('click', toggleTheme));
    initTheme();

    /**
     * RTL (Right-to-Left) Management (1000% RTL Perfection)
     * Dynamically switches between standard Bootstrap and Bootstrap RTL versions.
     * Mirrors the entire layout including margins, padding, and text-alignment.
     */
    const bootstrapStandard = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";
    const bootstrapRTL = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css";
    const bootstrapLink = document.querySelector('link[href*="bootstrap.min.css"]');

    const initRTL = () => {
        const currentDir = localStorage.getItem('dir') || 'ltr';
        document.documentElement.setAttribute('dir', currentDir);
        if (bootstrapLink) {
            bootstrapLink.href = currentDir === 'rtl' ? bootstrapRTL : bootstrapStandard;
        }
    };

    const toggleRTL = () => {
        const dir = document.documentElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
        document.documentElement.setAttribute('dir', dir);
        localStorage.setItem('dir', dir);
        if (bootstrapLink) {
            bootstrapLink.href = dir === 'rtl' ? bootstrapRTL : bootstrapStandard;
        }
    };

    const rtlBtns = document.querySelectorAll('#rtl-toggle, .rtl-toggle-btn');
    rtlBtns.forEach(btn => btn.addEventListener('click', toggleRTL));
    initRTL();

    /**
     * Phrase Rotation (Home 1 - Section 1)
     * Cycles through a list of phrases every 3 seconds with a fade effect.
     */
    const phrases = ["Bonjour!", "こんにちは!", "¡Hola!", "Hello!", "Ciao!", "Hallo!", "Oi!"];
    let phraseIndex = 0;
    const phraseSlot = document.querySelector('#phrase-day');

    if (phraseSlot) {
        setInterval(() => {
            phraseIndex = (phraseIndex + 1) % phrases.length;
            phraseSlot.style.opacity = 0;
            setTimeout(() => {
                phraseSlot.textContent = phrases[phraseIndex];
                phraseSlot.style.opacity = 1;
            }, 300);
        }, 3000);
    }

    /**
     * Language Matchmaker Counter (Home 1 - Section 2)
     * Simulates a search result count for language pairings.
     */
    const matchBtn = document.querySelector('#match-btn');
    const counterText = document.querySelector('#match-counter');

    if (matchBtn && counterText) {
        matchBtn.addEventListener('click', () => {
            const lang1 = document.querySelector('#i-speak').value;
            const lang2 = document.querySelector('#i-learn').value;
            const randomCount = Math.floor(Math.random() * 500) + 50;
            counterText.textContent = `${randomCount} active partners for ${lang1} ↔ ${lang2} right now.`;
        });
    }

    /**
     * Topic Card Flip (Home 1 - Section 5)
     * Toggles 'flipped' class on topic cards for a 3D effect.
     */
    const topicCards = document.querySelectorAll('.topic-card');
    topicCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    /**
     * Form Validation
     * Standard Bootstrap 5 client-side validation logic.
     */
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    /**
     * Scroll Animations
     * Uses Intersection Observer to add visibility classes to elements.
     */
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    /**
     * Tooltip Initialization
     * Initializes Bootstrap 5 tooltips for map pulsing dots and other elements.
     */
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
});
