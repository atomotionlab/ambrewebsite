/**
 * Ambre Physio Massage - Script principal
 * Animations et interactions pour le site
 */

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
  
  // --- MENU MOBILE ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav > ul');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('show');
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
    });
  }
  
  // --- ANIMATIONS AU DÉFILEMENT ---
  // Fonction pour vérifier si un élément est visible à l'écran
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }
  
  // Animation des sections au défilement
  function animateSectionsOnScroll() {
    const sections = document.querySelectorAll('.pink-section, .testimonials, .prestations-tarifs');
    
    sections.forEach(section => {
      if (isElementInViewport(section) && !section.classList.contains('animate')) {
        section.classList.add('animate');
      }
    });
  }
  
  // Lancer l'animation au chargement initial et au défilement
  animateSectionsOnScroll();
  window.addEventListener('scroll', animateSectionsOnScroll);
  
  // --- EFFET DE DÉFILEMENT FLUIDE ---
  // Navigation fluide pour les liens d'ancrage
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Tenir compte de la hauteur du header fixe
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // --- ANIMATIONS DES TÉMOIGNAGES ---
  // Animation des témoignages
  const testimonials = document.querySelectorAll('.retourtxt');
  let currentTestimonial = 0;
  
  function fadeInTestimonial(index) {
    testimonials.forEach((item, i) => {
      if (i === index) {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      } else {
        item.style.opacity = '0.7';
        item.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Initialiser l'animation si des témoignages sont présents
  if (testimonials.length > 1) {
    testimonials.forEach(item => {
      item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      item.style.opacity = '0.7';
    });
    
    fadeInTestimonial(currentTestimonial);
    
    // Changer de témoignage toutes les 5 secondes
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      fadeInTestimonial(currentTestimonial);
    }, 5000);
  }
  
  // --- EFFET DE PARALLAXE POUR LA BANNIÈRE ---
  const videoBg = document.querySelector('.video-background');
  
  if (videoBg) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      // Effet subtil de parallaxe - la vidéo se déplace légèrement plus lentement que le défilement
      if (scrollPosition < window.innerHeight) {
        videoBg.style.transform = `translate(-50%, ${-50 + (scrollPosition * 0.05)}%)`;
      }
    });
  }
  
  // --- COMPTEUR D'ANIMATION POUR LES TABLEAUX ---
  // Animation progressive des prix dans les tableaux
  const priceElements = document.querySelectorAll('td:nth-child(2), td:nth-child(3)');
  
  function animatePrices() {
    priceElements.forEach(element => {
      if (!element.classList.contains('comment') && isElementInViewport(element)) {
        const finalPrice = parseFloat(element.textContent);
        if (!isNaN(finalPrice) && !element.dataset.animated) {
          element.dataset.animated = true;
          
          // Animation du compteur
          let startPrice = 0;
          const duration = 1500; // ms
          const frameRate = 60;
          const increment = finalPrice / (duration / 1000 * frameRate);
          
          element.textContent = '0';
          
          const timer = setInterval(() => {
            startPrice += increment;
            if (startPrice >= finalPrice) {
              element.textContent = finalPrice;
              clearInterval(timer);
            } else {
              element.textContent = Math.floor(startPrice);
            }
          }, 1000 / frameRate);
        }
      }
    });
  }
  
  // Observer les tableaux pour déclencher l'animation
  const pricesSection = document.querySelector('.prestations-tarifs');
  if (pricesSection) {
    window.addEventListener('scroll', function() {
      if (isElementInViewport(pricesSection)) {
        animatePrices();
      }
    });
  }
});

// --- AJOUT DE CLASSES CSS POUR ANIMATIONS ---
// Ces styles doivent être ajoutés au CSS
/*
.pink-section, .testimonials, .prestations-tarifs {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.pink-section.animate, .testimonials.animate, .prestations-tarifs.animate {
  opacity: 1;
  transform: translateY(0);
}

.table-section {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.table-section:hover {
  transform: translateY(-5px);
}
*/