document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader ---
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('hidden');
    });

    // --- Theme Switcher ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const moonIcon = 'fa-moon';
    const sunIcon = 'fa-sun';

    const applyTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        const icon = themeToggle.querySelector('i');
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
            icon.classList.remove(sunIcon);
            icon.classList.add(moonIcon);
        } else {
            body.classList.remove('light-mode');
            icon.classList.remove(moonIcon);
            icon.classList.add(sunIcon);
        }
    };
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            icon.classList.remove(sunIcon);
            icon.classList.add(moonIcon);
        } else {
            localStorage.setItem('theme', 'dark');
            icon.classList.remove(moonIcon);
            icon.classList.add(sunIcon);
        }
    });
    applyTheme();

    // --- Hamburger Menu Logic ---
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('is-active');
            navLinks.classList.toggle('is-active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.classList.remove('is-active');
                navLinks.classList.remove('is-active');
            });
        });
    }

    // --- Logo Click to Reveal Profile Picture ---
    const logoTrigger = document.getElementById('logo-trigger');
    const profileOverlay = document.getElementById('profile-overlay');
    const profileCloseBtn = profileOverlay.querySelector('.close-btn');
    if (logoTrigger && profileOverlay && profileCloseBtn) {
        logoTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            profileOverlay.classList.add('visible');
        });
        profileCloseBtn.addEventListener('click', () => {
            profileOverlay.classList.remove('visible');
        });
        profileOverlay.addEventListener('click', (e) => {
            if (e.target === profileOverlay) {
                profileOverlay.classList.remove('visible');
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && profileOverlay.classList.contains('visible')) {
                profileOverlay.classList.remove('visible');
            }
        });
    }

    // --- Intersection Observer for fade-in animations ---
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('fade-in')) {
                    entry.target.classList.add('is-visible');
                } else if (entry.target.classList.contains('project-grid')) {
                    const cards = entry.target.querySelectorAll('.project-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('is-visible');
                        }, index * 150);
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
    const projectGrid = document.querySelector('.project-grid');
    if (projectGrid) { observer.observe(projectGrid); }

    // --- Smooth Scrolling for nav links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.getAttribute('id') !== 'logo-trigger') { // Prevent logo from scrolling
            anchor.addEventListener('click', function (e) {
                if (this.getAttribute('href') !== '#') {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });
});