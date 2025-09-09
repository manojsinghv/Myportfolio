document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader ---
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('hidden');
        const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const moonIcon = 'fa-moon';
const sunIcon = 'fa-sun';


const logoTrigger = document.getElementById('logo-trigger');
const profileOverlay = document.getElementById('profile-overlay');
const profileCloseBtn = profileOverlay.querySelector('.close-btn');

if (logoTrigger && profileOverlay && profileCloseBtn) {
    logoTrigger.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        profileOverlay.classList.add('visible');
    });

    profileCloseBtn.addEventListener('click', () => {
        profileOverlay.classList.remove('visible');
    });

    // Close when clicking outside the profile content
    profileOverlay.addEventListener('click', (e) => {
        if (e.target === profileOverlay) {
            profileOverlay.classList.remove('visible');
        }
    });

    // Optional: Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && profileOverlay.classList.contains('visible')) {
            profileOverlay.classList.remove('visible');
        }
    });
}

// Function to apply the saved theme on load
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

// Event listener for the toggle button
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

    });


    // --- Intersection Observer for fade-in animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // For general fade-in sections
                if (entry.target.classList.contains('fade-in')) {
                    entry.target.classList.add('is-visible');
                }
                // For staggered project cards
                else if (entry.target.classList.contains('project-grid')) {
                    const cards = entry.target.querySelectorAll('.project-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('is-visible');
                        }, index * 150); // Staggered delay
                    });
                }
                observer.unobserve(entry.target); // Unobserve after animating
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe general fade-in sections
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Observe the project grid for staggered animation
    const projectGrid = document.querySelector('.project-grid');
    if (projectGrid) {
        observer.observe(projectGrid);
    }
    

    // --- Smooth Scrolling for nav links ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

});