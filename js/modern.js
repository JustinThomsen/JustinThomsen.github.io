/* modern.js - Scroll Animations & Dynamic Interactions for Justin Thomsen's CV */

document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-left, .reveal-right');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        // Optionally unobserve if we only want one-time animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // Active Navbar Link Highlighting on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Animated Stat Counter Increment Effect
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          animatedStats = true;
          statNumbers.forEach(stat => {
            const targetText = stat.getAttribute('data-target') || stat.innerText;
            const hasPercent = targetText.includes('%');
            const hasPlus = targetText.includes('+');
            const numericValue = parseInt(targetText.replace(/[^0-9]/g, ''));
            
            if (isNaN(numericValue)) return;

            let currentVal = 0;
            const duration = 1500; // ms
            const stepTime = 30;
            const steps = duration / stepTime;
            const increment = numericValue / steps;

            const timer = setInterval(() => {
              currentVal += increment;
              if (currentVal >= numericValue) {
                currentVal = numericValue;
                clearInterval(timer);
              }
              stat.innerText = Math.floor(currentVal) + (hasPercent ? '%' : '') + (hasPlus ? '+' : '');
            }, stepTime);
          });
        }
      });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
  }
});
