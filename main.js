import './style.css'
import { ParticleNetwork } from './particles.js';

// Initialize Particles
new ParticleNetwork('hero-canvas');

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
});

// Intersection Observer for Fade In
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
  section.classList.add('fade-in-section');
  observer.observe(section);
});

// Add fade-in class to CSS
const style = document.createElement('style');
style.innerHTML = `
  .fade-in-section {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  .fade-in-section.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// Splash Screen Logic
window.addEventListener('load', () => {
  window.scrollTo(0, 0); // Force scroll to top
  const splash = document.querySelector('.splash-screen');
  const heroLogo = document.querySelector('.hero-logo-container');
  const heroSlider = document.querySelector('.hero-slider');

  // Wait for logo animation (2.5s)
  setTimeout(() => {
    splash.classList.add('hidden');
    document.body.classList.remove('no-scroll');

    // Trigger Hero Animations after splash fade starts
    setTimeout(() => {
      if (heroLogo) heroLogo.classList.add('animate-in');
      if (heroSlider) heroSlider.classList.add('active');

      // Animate Logo Out after it stays for a while (e.g., 2.5s)
      setTimeout(() => {
        if (heroLogo) heroLogo.classList.add('animate-out');
      }, 2500);

    }, 500); // Wait half a second into the fade for smoother overlap

  }, 2500);
});
