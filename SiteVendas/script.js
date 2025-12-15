// MENU MOBILE
const navSlide = () => {
    const burger = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if(burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
        });
    });
}
navSlide();

// SCROLL SUAVE
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target){
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// LOGICA DO CARROSSEL
const track = document.getElementById('track');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const indicators = document.querySelectorAll('.indicator');
let currentIndex = 0;

function updateCarousel() {
    if(!track) return;
    const width = track.offsetWidth; 
    track.style.transform = `translateX(-${currentIndex * width}px)`;

    indicators.forEach((ind, index) => {
        if(index === currentIndex) {
            ind.classList.add('active');
        } else {
            ind.classList.remove('active');
        }
    });
}

if(nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        if (currentIndex < indicators.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = indicators.length - 1;
        }
        updateCarousel();
    });
}

// Atualizar ao redimensionar a tela
window.addEventListener('resize', updateCarousel);