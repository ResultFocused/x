// Additional optimizations and fixes for ResultFocused website

// Fix for animation performance on mobile devices
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    // Reduce animations on mobile for better performance
    document.documentElement.classList.add('reduce-motion');
    
    // Add CSS class to handle reduced animations
    const style = document.createElement('style');
    style.textContent = `
        .reduce-motion .animate-on-scroll {
            transition-duration: 0.3s;
        }
        .reduce-motion .intro-shape {
            animation: none;
        }
    `;
    document.head.appendChild(style);
}

// Fix for Safari flexbox issues
if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
    document.documentElement.classList.add('safari');
    
    const safariStyle = document.createElement('style');
    safariStyle.textContent = `
        .safari .intro-container {
            display: block;
        }
        .safari .intro-text, .safari .intro-image {
            width: 100%;
            max-width: 100%;
            margin-bottom: 2rem;
        }
    `;
    document.head.appendChild(safariStyle);
}

// Lazy loading for service cards
document.addEventListener('DOMContentLoaded', function() {
    // Defer loading of non-critical resources
    setTimeout(function() {
        const deferredStyles = document.createElement('link');
        deferredStyles.rel = 'stylesheet';
        deferredStyles.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
        document.head.appendChild(deferredStyles);
    }, 1000);
    
    // Add aria-labels for better accessibility
    const navToggle = document.querySelector('.navbar-toggle');
    if (navToggle) {
        navToggle.setAttribute('aria-label', 'Toggle navigation menu');
    }
    
    // Fix for service cards focus states
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                this.click();
            }
        });
    });
});

// Fix for scroll behavior in older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    // Polyfill for smooth scrolling
    document.querySelectorAll('.navbar-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update URL hash without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Fix for controltask-specific issues mentioned in the requirements
// Ensure all external links open in new tab with proper security attributes
document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.hasAttribute('target')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// Add preload for critical resources
const preloadLink = document.createElement('link');
preloadLink.rel = 'preload';
preloadLink.as = 'image';
preloadLink.href = 'images/WebLogo.png';
document.head.appendChild(preloadLink);
