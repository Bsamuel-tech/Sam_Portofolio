// ========================
// Main JavaScript
// ========================

// Create particles background
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--accent);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            animation: rise ${Math.random() * 10 + 10}s infinite ease-in;
            animation-delay: ${Math.random() * 15}s;
            opacity: 0;
        `;
        container.appendChild(particle);
    }
}

// Theme toggle
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const icon = document.getElementById('theme-icon');
    if (document.body.classList.contains('light-mode')) {
        icon.textContent = '☀️';
    } else {
        icon.textContent = '🌓';
    }
    
    // Save preference
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const icon = document.getElementById('theme-icon');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (icon) icon.textContent = '☀️';
    }
}

// CV Modal functions
function requestCV(event) {
    event.preventDefault();
    const modal = document.getElementById('cvModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeCVModal() {
    const modal = document.getElementById('cvModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function trackCVRequest() {
    console.log('CV access requested at:', new Date().toISOString());
    // You can add analytics tracking here if needed
    setTimeout(() => {
        closeCVModal();
    }, 1000);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('cvModal');
    if (event.target === modal) {
        closeCVModal();
    }
};

// Smooth scroll to navigation grid
function scrollToGrid(e) {
    e.preventDefault();
    const navGrid = document.querySelector('.navigation-grid');
    if (navGrid) {
        navGrid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    createParticles();
    loadTheme();
    
    // Add entrance animations
    const gridItems = document.querySelectorAll('.grid-item, .nav-card');
    gridItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Animated typing effect for title
window.addEventListener('load', () => {
    const titleLines = document.querySelectorAll('.title-line');
    titleLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(30px)';
        setTimeout(() => {
            line.style.transition = 'all 0.8s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, index * 300 + 500);
    });
});

// Parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.profile-img, .code-window');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Cursor trail effect (optional)
const coords = { x: 0, y: 0 };
const circles = [];

for (let i = 0; i < 10; i++) {
    const circle = document.createElement('div');
    circle.style.cssText = `
        position: fixed;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: var(--accent);
        opacity: 0;
        pointer-events: none;
        z-index: 9999;
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(circle);
    circles.push(circle);
}

let mouseActive = false;

window.addEventListener('mousemove', (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
    mouseActive = true;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach((circle, index) => {
        circle.style.left = x - 7.5 + 'px';
        circle.style.top = y - 7.5 + 'px';
        circle.style.transform = `scale(${(circles.length - index) / circles.length})`;
        circle.style.opacity = mouseActive ? '0.2' : '0';

        const nextCircle = circles[index + 1] || circles[0];
        const rect = nextCircle.getBoundingClientRect();
        x += (rect.left - x) * 0.3;
        y += (rect.top - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
}

animateCircles();