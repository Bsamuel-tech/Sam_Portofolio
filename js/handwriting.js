// Handwriting Animation
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('handwritingOverlay');
    const mainContent = document.getElementById('mainContent');
    const typedText = document.getElementById('typedText');

    const text = "WELCOME TO MY PORTFOLIO!";
    let index = 0;
    
    // Typing effect
    function typeWriter() {
        if (index < text.length) {
            typedText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 200);
        } else {
            // After typing completes, wait and fade out
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.style.display = 'none';
                    mainContent.style.opacity = '1';
                    mainContent.style.transition = 'opacity 1s ease';
                }, 1000);
            }, 1500);
        }
    }
    
    // Start animation after a short delay
    setTimeout(() => {
        typeWriter();
    }, 500);
});