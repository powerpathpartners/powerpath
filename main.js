// ===================================
// PowerPath Partners - Main JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Mobile Navigation Toggle
    // ===================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking on a link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ===================================
    // Navbar Scroll Effect
    // ===================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ===================================
    // Smooth Scrolling for Anchor Links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') {
                e.preventDefault();
                return;
            }

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // Intersection Observer for Fade-in Animations
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll('.section, .stat-card, .problem-card, .advantage-card, .revenue-card, .metric-card');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    // ===================================
    // Active Navigation Link Highlighting
    // ===================================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // ===================================
    // Number Counter Animation
    // ===================================
    function animateCounter(element) {
        const target = element.textContent;
        const isNumber = /^\d+$/.test(target);
        
        if (!isNumber) return;

        const duration = 2000;
        const steps = 60;
        const stepDuration = duration / steps;
        const increment = parseInt(target) / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= parseInt(target)) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepDuration);
    }

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number, .problem-stat').forEach(counter => {
        counterObserver.observe(counter);
    });

    // ===================================
    // Parallax Effect for Hero Section
    // ===================================
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const heroContent = document.querySelector('.hero-content');
            
            if (heroContent && scrollPosition < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrollPosition / window.innerHeight) * 0.8;
            }
        });
    }

    // ===================================
    // Dynamic Year in Footer
    // ===================================
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.footer-bottom p');
    yearElements.forEach(element => {
        element.textContent = element.textContent.replace('2025', currentYear);
    });

    // ===================================
    // Scroll to Top Button (Optional Enhancement)
    // ===================================
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);

    // Add styles for scroll to top button
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #5ba3d0, #003d5c);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 5px 20px rgba(91, 163, 208, 0.3);
            font-size: 1.2rem;
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(91, 163, 208, 0.5);
        }
        
        @media (max-width: 768px) {
            .scroll-to-top {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
            }
        }
    `;
    document.head.appendChild(style);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===================================
    // Card Tilt Effect (Optional Enhancement)
    // ===================================
    const cards = document.querySelectorAll('.stat-card, .advantage-card, .revenue-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===================================
    // Preloader (Optional)
    // ===================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // ===================================
    // Form Validation (if contact form is added)
    // ===================================
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const formData = new FormData(contactForm);
            let isValid = true;
            
            for (let [key, value] of formData.entries()) {
                if (!value.trim()) {
                    isValid = false;
                    break;
                }
            }
            
            if (isValid) {
                // Show success message
                alert('Thank you for your interest! We will contact you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // ===================================
    // Performance Optimization - Debounce
    // ===================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll-heavy functions
    const debouncedHighlight = debounce(highlightNavigation, 100);
    window.removeEventListener('scroll', highlightNavigation);
    window.addEventListener('scroll', debouncedHighlight);

    // ===================================
    // Console Welcome Message
    // ===================================
    console.log('%c PowerPath Partners ', 'background: linear-gradient(135deg, #5ba3d0, #003d5c); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
    console.log('%c Powering the Digital Future 🚀', 'color: #5ba3d0; font-size: 14px; font-weight: bold;');
});

// ===================================
// Accessibility Enhancements
// ===================================
document.addEventListener('keydown', function(e) {
    // Allow keyboard navigation to skip to main content
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #5ba3d0;
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyle);
