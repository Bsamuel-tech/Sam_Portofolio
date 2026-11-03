// ========================
// Navigation Logic
// ========================

// Navigate to different pages
function navigateTo(page) {
    // Add exit animation
    const gridContainer = document.querySelector('.grid-container');
    if (gridContainer) {
        gridContainer.style.opacity = '0';
        gridContainer.style.transform = 'scale(0.95)';
    }
    
    // Navigate after animation
    setTimeout(() => {
        window.location.href = page;
    }, 300);
}

// Back to home
function goHome() {
    navigateTo('index.html');
}

// Page transition on load
window.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    body.style.opacity = '0';
    
    setTimeout(() => {
        body.style.transition = 'opacity 0.5s ease';
        body.style.opacity = '1';
    }, 100);
});

// Add smooth page transitions
document.addEventListener('DOMContentLoaded', () => {
    // Add transition class to body
    document.body.classList.add('page-loaded');
    
    // Handle all internal links
    const links = document.querySelectorAll('a[href$=".html"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && !link.hasAttribute('target')) {
                e.preventDefault();
                navigateTo(href);
            }
        });
    });
});