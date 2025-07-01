// Mobile Navigation Control - Simple Version
console.log('Mobile navigation script loaded');

let lastScrollTop = 0;

function isMobile() {
    return window.innerWidth <= 768;
}

function handleScroll() {
    if (!isMobile()) return;
    
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const navigation = document.getElementById('navigation');
    
    if (!navigation) {
        console.log('Navigation element not found');
        return;
    }
    
    console.log('Current scroll:', currentScroll, 'Last scroll:', lastScrollTop);
    
    if (currentScroll > lastScrollTop && currentScroll > 100) {
        // Scrolling down - hide navigation
        console.log('Hiding navigation');
        navigation.style.transform = 'translateY(-100%)';
        navigation.style.opacity = '0';
    } else if (currentScroll < lastScrollTop) {
        // Scrolling up - show navigation
        console.log('Showing navigation');
        navigation.style.transform = 'translateY(0)';
        navigation.style.opacity = '1';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}

// Language switching
function switchLanguage(lang) {
    if (lang === 'ar') {
        window.location.href = 'index.html';
    } else if (lang === 'en') {
        window.location.href = 'index-en.html';
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing mobile navigation');
    
    const navigation = document.getElementById('navigation');
    if (navigation) {
        console.log('Navigation found:', navigation);
        navigation.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    } else {
        console.log('Navigation not found!');
    }
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Handle resize
    window.addEventListener('resize', function() {
        if (!isMobile() && navigation) {
            navigation.style.transform = 'translateY(0)';
            navigation.style.opacity = '1';
        }
    });
    
    console.log('Mobile navigation initialized');
});
