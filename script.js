// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.sub-nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Remove active class from all links
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                });

                // Add active class to clicked link
                this.classList.add('active');

                // Calculate offset for fixed header, navigation, and translation bar
                const headerHeight = 180; // Header height
                const navHeight = 70; // Navigation height
                const translationHeight = 60; // Translation bar height
                const totalOffset = headerHeight + navHeight + translationHeight + 20; // Extra padding

                // Smooth scroll to target with offset
                const targetPosition = targetSection.offsetTop - totalOffset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('.section');
        const scrollOffset = 330; // Account for fixed header, nav, and translation bar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - scrollOffset) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Add fade-in animation for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add hover effects for cards
    const cards = document.querySelectorAll('.intro-card, .step-card, .filter-card, .faq-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effect for buttons
    const buttons = document.querySelectorAll('.download-button a, .nav-menu a');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Header is now fixed, no parallax effect needed
    
    // Add typing effect to main title
    const mainTitle = document.querySelector('.logo h1');
    if (mainTitle) {
        const text = mainTitle.textContent;
        mainTitle.textContent = '';
        
        let i = 0;
        const typeWriter = function() {
            if (i < text.length) {
                mainTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
    
    // Add progress bar for reading
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
    
    // Add back to top button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // Add FAQ toggle functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Initially hide answers
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease';
        
        question.style.cursor = 'pointer';
        question.addEventListener('click', function() {
            const isOpen = answer.style.maxHeight !== '0px';
            
            if (isOpen) {
                answer.style.maxHeight = '0';
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
    
    // Add search functionality
    const searchContainer = document.createElement('div');
    searchContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1001;
    `;
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'البحث في الدليل...';
    searchInput.style.cssText = `
        padding: 10px 15px;
        border: 2px solid #667eea;
        border-radius: 25px;
        outline: none;
        font-family: 'Cairo', sans-serif;
        direction: rtl;
        width: 200px;
        transition: all 0.3s ease;
    `;
    
    searchInput.addEventListener('focus', function() {
        this.style.width = '250px';
        this.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
    });
    
    searchInput.addEventListener('blur', function() {
        this.style.width = '200px';
        this.style.boxShadow = 'none';
    });
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            if (text.includes(searchTerm) || searchTerm === '') {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });
    
    searchContainer.appendChild(searchInput);
    document.body.appendChild(searchContainer);

    // Initialize translation enhancements
    initializeTranslationEnhancements();

    // Initialize page-specific features
    initializePageFeatures();
});

// Translation enhancement functions
function initializeTranslationEnhancements() {
    // Hide Google Translate banner and fix body positioning
    const style = document.createElement('style');
    style.innerHTML = `
        .goog-te-banner-frame.skiptranslate {
            display: none !important;
        }
        body {
            top: 0px !important;
        }
        .goog-te-balloon-frame {
            display: none !important;
        }
        .goog-te-ftab {
            display: none !important;
        }
        #google_translate_element * {
            pointer-events: auto !important;
        }
        .goog-te-gadget-simple {
            pointer-events: auto !important;
            cursor: pointer !important;
        }
        .goog-te-combo {
            pointer-events: auto !important;
            cursor: pointer !important;
        }
    `;
    document.head.appendChild(style);

    // Monitor for Google Translate widget load with longer timeout
    let attempts = 0;
    const maxAttempts = 50;
    const checkTranslateWidget = setInterval(() => {
        attempts++;
        const translateElement = document.querySelector('#google_translate_element');
        const gadget = document.querySelector('.goog-te-gadget-simple');

        if ((translateElement && translateElement.innerHTML.trim() !== '') || gadget || attempts >= maxAttempts) {
            customizeTranslateWidget();
            clearInterval(checkTranslateWidget);
        }
    }, 200);

    // Add translation status indicator
    addTranslationStatusIndicator();

    // Force enable pointer events after page load
    setTimeout(() => {
        enableTranslateInteraction();
        checkTranslateAvailability();
    }, 3000);
}

function enableTranslateInteraction() {
    // Force enable all translate elements
    const translateElements = document.querySelectorAll('#google_translate_element, #google_translate_element *, .goog-te-gadget, .goog-te-gadget *, .goog-te-combo, .goog-te-gadget-simple');
    translateElements.forEach(element => {
        element.style.pointerEvents = 'auto';
        element.style.cursor = 'pointer';
        element.style.zIndex = '1003';
    });

    // Add click handlers as backup
    const gadgetSimple = document.querySelector('.goog-te-gadget-simple');
    if (gadgetSimple) {
        gadgetSimple.addEventListener('click', function(e) {
            e.stopPropagation();
            // Force trigger the dropdown
            const combo = document.querySelector('.goog-te-combo');
            if (combo) {
                combo.focus();
                combo.click();
            }
        });
    }
}

function customizeTranslateWidget() {
    // Add custom styling and behavior to the translate widget
    const translateSelect = document.querySelector('.goog-te-combo');
    if (translateSelect) {
        // Ensure it's clickable
        translateSelect.style.pointerEvents = 'auto';
        translateSelect.style.cursor = 'pointer';
        translateSelect.style.zIndex = '1003';

        // Add change event listener
        translateSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            if (selectedLanguage) {
                showTranslationLoading();
                updateTranslationStatus(selectedLanguage);
            }
        });

        // Add custom options for popular languages
        addPopularLanguageOptions(translateSelect);
    }

    // Also check for gadget simple
    const gadgetSimple = document.querySelector('.goog-te-gadget-simple');
    if (gadgetSimple) {
        gadgetSimple.style.pointerEvents = 'auto';
        gadgetSimple.style.cursor = 'pointer';
        gadgetSimple.style.zIndex = '1003';
    }

    // Enable all interaction
    enableTranslateInteraction();

    // Monitor for translation completion
    const observer = new MutationObserver(function(mutations) {
        let translationDetected = false;
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' || mutation.type === 'characterData') {
                translationDetected = true;
            }
        });

        if (translationDetected) {
            setTimeout(() => {
                hideTranslationLoading();
                updateTranslationComplete();
            }, 1000);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });
}

function addPopularLanguageOptions(selectElement) {
    // Add separator and popular languages at the top
    const popularLanguages = [
        { code: 'en', name: 'English - الإنجليزية' },
        { code: 'fr', name: 'Français - الفرنسية' },
        { code: 'es', name: 'Español - الإسبانية' },
        { code: 'de', name: 'Deutsch - الألمانية' },
        { code: 'tr', name: 'Türkçe - التركية' },
        { code: 'fa', name: 'فارسی - الفارسية' },
        { code: 'ur', name: 'اردو - الأردية' }
    ];

    // Create popular languages section
    const separator = document.createElement('option');
    separator.value = '';
    separator.textContent = '--- اللغات الشائعة ---';
    separator.disabled = true;
    selectElement.insertBefore(separator, selectElement.firstChild);

    popularLanguages.reverse().forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.code;
        option.textContent = lang.name;
        selectElement.insertBefore(option, selectElement.firstChild);
    });
}

function addTranslationStatusIndicator() {
    const statusIndicator = document.createElement('div');
    statusIndicator.id = 'translation-status';
    statusIndicator.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(44, 62, 80, 0.9);
        color: white;
        padding: 10px 15px;
        border-radius: 20px;
        font-size: 0.8rem;
        z-index: 1000;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    statusIndicator.innerHTML = `
        <i class="fas fa-globe"></i>
        <span>الصفحة باللغة العربية</span>
    `;
    document.body.appendChild(statusIndicator);

    // Show status indicator
    setTimeout(() => {
        statusIndicator.style.opacity = '1';
        statusIndicator.style.transform = 'translateY(0)';
    }, 1000);
}

function updateTranslationStatus(languageCode) {
    const statusIndicator = document.getElementById('translation-status');
    if (statusIndicator) {
        const languageNames = {
            'en': 'English',
            'fr': 'Français',
            'es': 'Español',
            'de': 'Deutsch',
            'it': 'Italiano',
            'pt': 'Português',
            'ru': 'Русский',
            'zh': '中文',
            'ja': '日本語',
            'ko': '한국어',
            'hi': 'हिन्दी',
            'tr': 'Türkçe',
            'fa': 'فارسی',
            'ur': 'اردو'
        };

        const languageName = languageNames[languageCode] || languageCode;
        statusIndicator.innerHTML = `
            <i class="fas fa-language"></i>
            <span>مترجم إلى ${languageName}</span>
        `;
    }
}

function updateTranslationComplete() {
    const statusIndicator = document.getElementById('translation-status');
    if (statusIndicator) {
        statusIndicator.style.background = 'rgba(39, 174, 96, 0.9)';
        setTimeout(() => {
            statusIndicator.style.background = 'rgba(44, 62, 80, 0.9)';
        }, 2000);
    }
}

function showTranslationLoading() {
    // Remove existing loading overlay
    hideTranslationLoading();

    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'translation-loading';
    loadingOverlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
            </div>
            <div class="loading-text">
                <h3>جاري الترجمة...</h3>
                <p>يرجى الانتظار بينما نترجم المحتوى</p>
            </div>
        </div>
    `;
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        color: white;
        font-family: 'Cairo', sans-serif;
        backdrop-filter: blur(5px);
    `;

    const loadingContent = loadingOverlay.querySelector('.loading-content');
    loadingContent.style.cssText = `
        text-align: center;
        background: rgba(44, 62, 80, 0.95);
        padding: 40px;
        border-radius: 20px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        max-width: 400px;
        width: 90%;
    `;

    const spinner = loadingContent.querySelector('.loading-spinner i');
    spinner.style.cssText = `
        font-size: 3rem;
        color: #3498db;
        margin-bottom: 20px;
    `;

    const loadingText = loadingContent.querySelector('.loading-text');
    loadingText.style.cssText = `
        margin-top: 20px;
    `;

    const loadingTitle = loadingText.querySelector('h3');
    loadingTitle.style.cssText = `
        margin-bottom: 10px;
        color: white;
        font-size: 1.3rem;
    `;

    const loadingDesc = loadingText.querySelector('p');
    loadingDesc.style.cssText = `
        color: #bdc3c7;
        font-size: 0.9rem;
        margin: 0;
    `;

    document.body.appendChild(loadingOverlay);

    // Auto-hide after 5 seconds as fallback
    setTimeout(() => {
        hideTranslationLoading();
    }, 5000);
}

function hideTranslationLoading() {
    const loadingOverlay = document.getElementById('translation-loading');
    if (loadingOverlay) {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.remove();
        }, 300);
    }
}

// Page-specific features initialization
function initializePageFeatures() {
    // Mobile menu toggle
    initializeMobileMenu();

    // FAQ functionality
    initializeFAQ();

    // Smooth scrolling for anchor links
    initializeSmoothScrolling();

    // Landing page animations
    if (document.body.classList.contains('landing-page')) {
        initializeLandingPageAnimations();
    }
}

function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');

            // Toggle icon
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', function() {
                // Close other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

function initializeSmoothScrolling() {
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.main-navigation')?.offsetHeight || 0;
                const subNavHeight = document.querySelector('.sub-navigation')?.offsetHeight || 0;
                const translationHeight = document.querySelector('.translation-bar')?.offsetHeight || 0;
                const offset = headerHeight + subNavHeight + translationHeight + 20;

                const targetPosition = target.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initializeLandingPageAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .step-item, .pricing-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Hero stats counter animation
    animateCounters();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = counter.textContent;
        const isNumber = !isNaN(target.replace(/[^0-9]/g, ''));

        if (isNumber) {
            const finalNumber = parseInt(target.replace(/[^0-9]/g, ''));
            const suffix = target.replace(/[0-9]/g, '');
            let current = 0;
            const increment = finalNumber / 100;

            const timer = setInterval(() => {
                current += increment;
                if (current >= finalNumber) {
                    counter.textContent = finalNumber + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, 20);
        }
    });
}

function checkTranslateAvailability() {
    const googleTranslateElement = document.querySelector('#google_translate_element');
    const gadget = document.querySelector('.goog-te-gadget-simple');
    const combo = document.querySelector('.goog-te-combo');

    // If Google Translate is not working, show fallback
    if (!gadget && !combo) {
        showFallbackTranslate();
    } else {
        // Ensure Google Translate is clickable
        enableTranslateInteraction();

        // Test if it's actually clickable
        setTimeout(() => {
            if (gadget && !isElementClickable(gadget)) {
                showFallbackTranslate();
            }
        }, 1000);
    }
}

function isElementClickable(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const elementAtPoint = document.elementFromPoint(centerX, centerY);

    return element.contains(elementAtPoint) || elementAtPoint === element;
}

function showFallbackTranslate() {
    const googleElement = document.querySelector('#google_translate_element');
    const fallbackElement = document.querySelector('#fallback_translate');

    if (googleElement && fallbackElement) {
        googleElement.style.display = 'none';
        fallbackElement.style.display = 'block';

        // Add event listener to fallback selector
        const selector = document.querySelector('#language_selector');
        if (selector) {
            selector.addEventListener('change', function() {
                const selectedLang = this.value;
                if (selectedLang) {
                    translatePageWithFallback(selectedLang);
                }
            });
        }
    }
}

function translatePageWithFallback(targetLang) {
    showTranslationLoading();

    // Use Google Translate URL method as fallback
    const currentUrl = window.location.href;
    const translateUrl = `https://translate.google.com/translate?sl=ar&tl=${targetLang}&u=${encodeURIComponent(currentUrl)}`;

    // Show confirmation dialog
    setTimeout(() => {
        hideTranslationLoading();

        if (confirm('سيتم فتح الصفحة المترجمة في نافذة جديدة. هل تريد المتابعة؟')) {
            window.open(translateUrl, '_blank');
        }
    }, 1000);
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-menu a.active {
        background: rgba(255, 255, 255, 0.3) !important;
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);
