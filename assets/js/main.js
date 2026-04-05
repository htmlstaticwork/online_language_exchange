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

    const blogTitle = document.getElementById('blog-details-title');
    const blogCategory = document.getElementById('blog-details-category');
    const blogDate = document.getElementById('blog-details-date');
    const blogReadTime = document.getElementById('blog-details-readtime');
    const blogHero = document.getElementById('blog-details-hero');
    const blogCaption = document.getElementById('blog-details-caption');
    const blogBody = document.getElementById('blog-details-body');
    const blogRelated = document.getElementById('blog-details-related');

    if (blogTitle && blogCategory && blogDate && blogReadTime && blogHero && blogCaption && blogBody && blogRelated) {
        const posts = {
            slang: {
                title: '5 secrets to native slang.',
                category: 'CULTURE',
                date: 'OCT 15, 2026',
                readTime: '5 MIN READ',
                hero: { src: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=500&fit=crop', alt: 'Native Slang' },
                caption: 'Real fluency is built in real conversations.',
                bodyHtml: `
                    <p class="mb-5">Language is more than just a set of grammatical rules. It is a living, breathing entity that evolves through the streets, the cafés, and the conversations of everyday people. To truly master a language, one must venture beyond the textbooks and dive into the world of slang.</p>
                    <h2 class="fw-bolder mb-4 text-inherit" style="font-size: clamp(1.5rem, 2.4vw, 2.25rem);">1. Context Over Literal Translation</h2>
                    <p class="mb-5">Many slang phrases make zero sense when translated literally. Understanding the context—who is speaking, where they are, and the underlying emotion—is the first key to unlocking native-level communication.</p>
                    <blockquote class="border-start border-4 border-primary ps-4 ps-md-5 my-5 h4 fw-bolder">"The best classroom for slang is a 30-minute session with a native partner who isn't afraid to correct your awkwardness."</blockquote>
                    <h2 class="fw-bolder mb-4 text-inherit" style="font-size: clamp(1.5rem, 2.4vw, 2.25rem);">2. Emotional Cadence</h2>
                    <p class="mb-5">Every culture has a unique emotional rhythm. Japanese slang often focuses on shared social harmony, while Italian colloquialisms might emphasize dramatic emphasis. Listen for the pauses as much as the words.</p>
                `,
                related: ['tandem', 'prep']
            },
            tandem: {
                title: 'Tandem acceleration.',
                category: 'FLUENCY',
                date: 'OCT 12, 2026',
                readTime: '8 MIN READ',
                hero: { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop', alt: 'Tandem Acceleration' },
                caption: 'Pair practice turns input into output, fast.',
                bodyHtml: `
                    <p class="mb-5">A good exchange isn’t random chat. It’s a structured loop: speak, get corrected, try again, and repeat until it sticks.</p>
                    <h2 class="fw-bolder mb-4 text-inherit" style="font-size: clamp(1.5rem, 2.4vw, 2.25rem);">1. Use a 50/50 timer</h2>
                    <p class="mb-5">Split your session into equal halves. One language at a time, no mixing. The clarity makes progress measurable.</p>
                    <h2 class="fw-bolder mb-4 text-inherit" style="font-size: clamp(1.5rem, 2.4vw, 2.25rem);">2. Collect “repeatable corrections”</h2>
                    <p class="mb-5">Ask your partner for corrections you can reuse in many topics: connectors, fillers, and polite clarifications.</p>
                    <blockquote class="border-start border-4 border-primary ps-4 ps-md-5 my-5 h4 fw-bolder">"The goal of a tandem session is not perfect grammar. It's faster feedback cycles."</blockquote>
                `,
                related: ['slang', 'grammar']
            },
            grammar: {
                title: 'Stop overthinking tense.',
                category: 'GRAMMAR',
                date: 'OCT 08, 2026',
                readTime: '12 MIN READ',
                hero: { src: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=500&fit=crop', alt: 'Grammar Tips' },
                caption: 'Fluency improves when you prioritize meaning first.',
                bodyHtml: `
                    <p class="mb-5">Tense mistakes rarely block understanding. What blocks understanding is hesitation and broken rhythm. Reduce the cognitive load and your speaking speed improves.</p>
                    <h2 class="fw-bolder mb-4 text-inherit" style="font-size: clamp(1.5rem, 2.4vw, 2.25rem);">1. Anchor with time words</h2>
                    <p class="mb-5">Use “yesterday”, “last week”, “next year” to signal time. Let the listener infer the rest while you keep momentum.</p>
                    <h2 class="fw-bolder mb-4 text-inherit" style="font-size: clamp(1.5rem, 2.4vw, 2.25rem);">2. Upgrade later</h2>
                    <p class="mb-5">After the sentence lands, re-say it with better grammar. That second pass is where accuracy is built.</p>
                `,
                related: ['tandem', 'prep']
            },
            prep: {
                title: 'Preparing for sessions.',
                category: 'TIPS',
                date: 'OCT 05, 2026',
                readTime: '4 MIN READ',
                hero: { src: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=500&fit=crop', alt: 'Session Prep' },
                caption: 'A short ritual keeps sessions focused and fun.',
                bodyHtml: `
                    <p class="mb-5">If you arrive with zero plan, you’ll spend the first 10 minutes searching for topics. A tiny prep ritual removes friction.</p>
                    <h2 class="fw-bolder mb-4 text-inherit" style="font-size: clamp(1.5rem, 2.4vw, 2.25rem);">1. Pick 3 prompts</h2>
                    <p class="mb-5">Choose one personal story, one opinion question, and one vocabulary theme. You’ll always have somewhere to go.</p>
                    <h2 class="fw-bolder mb-4 text-inherit" style="font-size: clamp(1.5rem, 2.4vw, 2.25rem);">2. Decide your feedback style</h2>
                    <p class="mb-5">Interrupt corrections, end-of-session notes, or chat corrections. Agree once and the session feels smoother.</p>
                `,
                related: ['slang', 'tandem']
            }
        };

        const params = new URLSearchParams(window.location.search);
        const slug = params.get('post') || 'slang';
        const post = posts[slug] || posts.slang;

        blogCategory.textContent = post.category;
        blogTitle.textContent = post.title;
        blogDate.textContent = post.date;
        blogReadTime.textContent = post.readTime;
        blogHero.src = post.hero.src;
        blogHero.alt = post.hero.alt;
        blogCaption.textContent = post.caption;
        blogBody.innerHTML = post.bodyHtml;
        document.title = `${post.title} | LinguaBridge - Detailed Insights`;

        const relatedSlugs = (post.related || []).filter(s => posts[s]).slice(0, 2);
        const iconSrc = ['assets/images/methods-1.svg', 'assets/images/methods-2.svg', 'assets/images/methods-3.svg', 'assets/images/methods-4.svg'];
        blogRelated.innerHTML = relatedSlugs.map((s, idx) => {
            const r = posts[s];
            const href = `blog-details.html?post=${encodeURIComponent(s)}`;
            return `
                <li class="d-flex gap-3">
                    <a href="${href}" class="flex-shrink-0">
                        <img src="${iconSrc[idx % iconSrc.length]}" alt="${r.title}" width="64" height="64" class="border border-3 border-primary p-2 bg-white">
                    </a>
                    <div class="flex-grow-1">
                        <a href="${href}" class="text-inherit fw-bolder text-decoration-none d-inline-block">${r.title.toUpperCase()} →</a>
                        <p class="small opacity-50 fw-bold mt-1 mb-0">${r.date}</p>
                    </div>
                </li>
            `;
        }).join('');
    }
});
