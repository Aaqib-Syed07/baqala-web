/* ==========================================================================
   Baqala Supermarket Premium JS Logic (Minimalist Glass Storefront)
   ========================================================================== */

// --- 1. DOM Elements ---
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const mainHeader = document.getElementById('mainHeader');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const contactForm = document.getElementById('contactForm');

// --- 2. Initialize Website ---
document.addEventListener('DOMContentLoaded', () => {
    setupCountdown();
    setupScrollAnimations();
    setupEventListeners();
    setupActiveNavOnScroll();
});

// --- 3. Event Listeners ---
function setupEventListeners() {
    // Scroll header styling & Back to top visibility
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            mainHeader.classList.add('scrolled');
            scrollTopBtn.classList.add('show');
        } else {
            mainHeader.classList.remove('scrolled');
            scrollTopBtn.classList.remove('show');
        }
    }, { passive: true });

    // Back to top click
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Mobile Menu toggle
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navMenu.classList.toggle('open');
            mobileMenuBtn.classList.toggle('open', isOpen);
        });

        // Close mobile menu when nav link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileMenuBtn.classList.remove('open');
            });
        });

        // Close menu on click outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navMenu.classList.remove('open');
                mobileMenuBtn.classList.remove('open');
            }
        });
    }

    // Contact Form Submission (Mock Feedback)
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contactName')?.value || 'there';
            alert(`Thank you, ${name}! Your inquiry has been sent to Baqala Supermarket. Our team will contact you promptly via WhatsApp or email.`);
            contactForm.reset();
        });
    }
}

// --- 4. Active Nav Link on Scroll ---
function setupActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 180;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSectionId}` || (currentSectionId === '' && href === '#')) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

// --- 5. Countdown Timer (Dynamic Weekly target) ---
function setupCountdown() {
    // Set target date to next Sunday at 11:59:59 PM
    const now = new Date();
    const target = new Date();
    target.setDate(now.getDate() + ((7 - now.getDay()) % 7 || 7));
    target.setHours(23, 59, 59, 999);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('minutes');
    const secsEl = document.getElementById('seconds');

    function updateTimer() {
        const current = new Date();
        const diff = target - current;

        if (diff <= 0) {
            // Reset timer target to next week
            target.setDate(target.getDate() + 7);
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = d.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = h.toString().padStart(2, '0');
        if (minsEl) minsEl.textContent = m.toString().padStart(2, '0');
        if (secsEl) secsEl.textContent = s.toString().padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// --- 6. Intersection Observer Scroll Animations ---
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.reveal-on-scroll');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Animates once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        animatedElements.forEach(el => el.classList.add('active'));
    }
}
