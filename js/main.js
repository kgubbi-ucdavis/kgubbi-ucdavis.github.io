/* ================================================
   1. Mobile Navigation Toggle
   ================================================ */
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav-open');
        navToggle.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-open');
            navToggle.classList.remove('active');
        });
    });
}

/* ================================================
   2. Navbar Background on Scroll
   ================================================ */
const navbar = document.getElementById('navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
    // Set initial state
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}

/* ================================================
   3. Typing Effect for Hero Tagline
   ================================================ */
const typedOutput = document.getElementById('typed-output');

if (typedOutput) {
    const phrases = [
        'Hardware Security Researcher',
        'VLSI Design Engineer',
        'ML for EDA',
        'Award-Winning Team Lead'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const current = phrases[phraseIndex];

        if (isDeleting) {
            typedOutput.textContent = current.substring(0, charIndex--);
        } else {
            typedOutput.textContent = current.substring(0, charIndex++);
        }

        let delay = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === current.length + 1) {
            delay = 2000;
            isDeleting = true;
        }

        if (isDeleting && charIndex < 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 500;
        }

        setTimeout(typeEffect, delay);
    }

    typeEffect();
}

/* ================================================
   4. Scroll-Reveal Animations (Intersection Observer)
   ================================================ */
const fadeElements = document.querySelectorAll('.fade-in');

if (fadeElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => revealObserver.observe(el));
}

/* ================================================
   5. Active Nav Link Highlighting
   ================================================ */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

if (sections.length > 0 && navItems.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navItems.forEach(item => item.classList.remove('active'));
                const activeLink = document.querySelector(
                    `.nav-links a[href="#${entry.target.id}"]`
                );
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, { rootMargin: '-30% 0px -70% 0px' });

    sections.forEach(section => sectionObserver.observe(section));
}
