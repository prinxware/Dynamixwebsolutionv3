// Bulletproof Safari-Compatible JavaScript
'use strict';

// Initialize immediately when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}

function initAll() {
    console.log('🚀 Initializing website...');
    
    // Wait a tiny bit for GSAP to be ready
    setTimeout(() => {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            console.log('✅ GSAP loaded');
            initAnimations();
        } else {
            console.warn('⚠️ GSAP not loaded, skipping animations');
        }
    }, 100);
    
    // These don't need GSAP
    initNavigation();
    initMobileMenu();
    initAccordion();
    initViewportFix();
}

// Viewport height fix for iOS
function initViewportFix() {
    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
    }
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
}

// Navigation scroll effect - SIMPLIFIED
function initNavigation() {
    const navbar = document.querySelector("#navbar");
    const mainHeader = document.querySelector("#main-header");
    
    if (!navbar || !mainHeader) {
        console.warn('⚠️ Navbar not found');
        return;
    }
    
    console.log('✅ Navigation initialized');
    
    let isScrolled = false;
    let ticking = false;
    
    function updateNav() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollY > 50 && !isScrolled) {
            // Add pill style
            isScrolled = true;
            navbar.classList.remove("max-w-[92%]", "md:max-w-7xl", "bg-transparent");
            navbar.classList.add("w-[90%]", "md:w-full", "max-w-2xl", "bg-white/90", "backdrop-blur-lg", "shadow-lg", "border", "border-slate-200", "rounded-2xl", "py-3");
            console.log('📍 Nav: pill mode');
        } else if (scrollY <= 50 && isScrolled) {
            // Remove pill style
            isScrolled = false;
            navbar.classList.add("max-w-[92%]", "md:max-w-7xl", "bg-transparent");
            navbar.classList.remove("w-[90%]", "md:w-full", "max-w-2xl", "bg-white/90", "backdrop-blur-lg", "shadow-lg", "border", "border-slate-200", "rounded-2xl", "py-3");
            console.log('📍 Nav: transparent mode');
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateNav);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Run once on load
    updateNav();
}

// Mobile menu - BULLETPROOF
function initMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const mainHeader = document.getElementById('main-header');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!menuBtn || !mainHeader || !mobileMenu) {
        console.warn('⚠️ Menu elements not found');
        return;
    }
    
    console.log('✅ Mobile menu initialized');
    
    let isOpen = false;
    let scrollPos = 0;
    
    function openMenu() {
        console.log('📱 Opening menu');
        isOpen = true;
        
        // Save scroll position
        scrollPos = window.pageYOffset;
        
        // Show mobile menu FIRST
        mobileMenu.style.display = 'flex';
        mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
        mobileMenu.classList.add('mobile-menu-open');
        
        // Then hide header
        mainHeader.style.opacity = '0';
        mainHeader.style.pointerEvents = 'none';
        
        // Lock body scroll - iOS Safari fix
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPos}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
    }
    
    function closeMenu() {
        console.log('📱 Closing menu');
        isOpen = false;
        
        // Hide mobile menu
        mobileMenu.classList.add('opacity-0', 'pointer-events-none');
        mobileMenu.classList.remove('mobile-menu-open');
        setTimeout(() => {
            mobileMenu.style.display = 'none';
        }, 300);
        
        // Show header
        mainHeader.style.opacity = '1';
        mainHeader.style.pointerEvents = '';
        
        // Unlock body scroll
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        
        // Restore scroll position
        window.scrollTo(0, scrollPos);
    }
    
    function toggle() {
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    // Button click
    menuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🖱️ Menu button clicked');
        toggle();
    });
    
    // Make globally accessible for inline onclick
    window.toggleMenu = toggle;
    
    // Close on menu link click
    const menuLinks = mobileMenu.querySelectorAll('a[href^="#"]');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('🔗 Menu link clicked');
            closeMenu();
        });
    });
    
    // Close button inside menu
    const closeBtn = mobileMenu.querySelector('button');
    if (closeBtn && closeBtn !== menuBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('❌ Close button clicked');
            closeMenu();
        });
    }
}

// Animations with GSAP
function initAnimations() {
    console.log('🎬 Initializing animations');
    
    // Hero reveals
    const revealTexts = document.querySelectorAll(".reveal-text");
    if (revealTexts.length > 0) {
        gsap.from(revealTexts, {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.2
        });
    }
    
    const revealOpacity = document.querySelectorAll(".reveal-opacity");
    if (revealOpacity.length > 0) {
        gsap.from(revealOpacity, {
            opacity: 0,
            duration: 1.5,
            delay: 0.8,
            ease: "power2.out"
        });
    }
    
    // Fade up sections
    const fadeUps = document.querySelectorAll(".gsap-fade-up");
    fadeUps.forEach((section) => {
        gsap.fromTo(section,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Project cards
    const projects = document.querySelectorAll(".project-card");
    projects.forEach((card) => {
        gsap.from(card, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 90%"
            }
        });
    });
    
    // Counter animation - Safari safe
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || '0', 10);
        const obj = { value: 0 };
        
        gsap.to(obj, {
            value: target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: counter,
                start: "top 85%",
                once: true
            },
            onUpdate: function() {
                counter.textContent = Math.round(obj.value);
            }
        });
    });
    
    console.log('✅ Animations initialized');
}

// Accordion
function initAccordion() {
    console.log('🎵 Accordion initialized');
    
    window.toggleAccordion = function(element) {
        const content = element.querySelector('.accordion-content');
        const icon = element.querySelector('.icon-toggle');
        
        if (!content) return;
        
        const allContents = document.querySelectorAll('.accordion-content');
        const allIcons = document.querySelectorAll('.icon-toggle');
        const allItems = document.querySelectorAll('.accordion-item');
        
        // Close others
        allContents.forEach((item) => {
            if (item !== content) item.style.height = '0px';
        });
        
        allIcons.forEach((item) => {
            if (item !== icon && item) {
                item.classList.remove('rotate-45', 'text-blue-600');
                item.setAttribute('icon', 'solar:add-linear');
            }
        });
        
        allItems.forEach((item) => {
            if (item !== element) {
                item.classList.remove('border-blue-500', 'shadow-md');
            }
        });
        
        // Toggle current
        if (content.style.height === '0px' || !content.style.height) {
            content.style.height = content.scrollHeight + 'px';
            if (icon) {
                icon.classList.add('rotate-45', 'text-blue-600');
            }
            element.classList.add('border-blue-500', 'shadow-md');
        } else {
            content.style.height = '0px';
            if (icon) {
                icon.classList.remove('rotate-45', 'text-blue-600');
            }
            element.classList.remove('border-blue-500', 'shadow-md');
        }
    }
    
    // Open first accordion
    setTimeout(() => {
        const first = document.querySelector('.accordion-item');
        if (first && window.toggleAccordion) {
            window.toggleAccordion(first);
        }
    }, 300);
}

console.log('📜 Script loaded successfully');