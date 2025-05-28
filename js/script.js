document.addEventListener('DOMContentLoaded', () => {
  // Cache DOM elements
  const navLinks = document.querySelectorAll('.nav-link');
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav-links');
  const themeToggle = document.querySelector('#theme-toggle');
  const body = document.body;
  const sections = document.querySelectorAll('.section');
  const projectCards = document.querySelectorAll('.project-card');
  const scrollToTopBtn = document.querySelector('#scroll-to-top');
  const contactFormBtn = document.querySelector('#open-contact-form');
  const contactModal = document.querySelector('#contact-modal');
  const projectModal = document.querySelector('#project-modal');
  const closeModals = document.querySelectorAll('.close-modal');
  const contactForm = document.querySelector('#contact-form');
  const scrollProgress = document.querySelector('#scroll-progress');
  const typingText = document.querySelector('#typing-text');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const greeting = document.querySelector('#greeting');
  const clock = document.querySelector('#clock');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const testimonials = document.querySelectorAll('.testimonial');
  const carouselPrev = document.querySelector('.carousel-prev');
  const carouselNext = document.querySelector('.carousel-next');
  const submissionCounter = document.querySelector('#submission-counter');

  // Initialize submission counter
  let submissionCount = localStorage.getItem('submissionCount') || 0;
  submissionCounter.textContent = `Messages sent: ${submissionCount}`;

  // Initialize EmailJS with provided public key, service, and template IDs
  emailjs.init('Cqi75vszAW5GlMmb-');

  // Particles.js configuration
  particlesJS('particles-js', {
    particles: {
      number: { value: 100, density: { enable: true, value_area: 800 } },
      color: { value: ['#FFD700', '#42A5F5'] },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true },
      size: { value: 2, random: true },
      line_linked: {
        enable: true,
        distance: 120,
        color: '#FFD700',
        opacity: 0.3,
        width: 1
      },
      move: {
        enable: true,
        speed: 3,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out'
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      }
    },
    retina_detect: true
  });

  // Real-time clock and greeting
  function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
    greeting.textContent = hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening';
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Typing animation
  const roles = ['Web Developer', 'Mobile App Developer', 'AI Enthusiast'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 1500;

  function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typingText.textContent = currentRole.substring(0, charIndex--);
      if (charIndex < 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 500);
      } else {
        setTimeout(type, deletingSpeed);
      }
    } else {
      typingText.textContent = currentRole.substring(0, charIndex++);
      if (charIndex > currentRole.length) {
        isDeleting = true;
        setTimeout(type, pauseTime);
      } else {
        setTimeout(type, typingSpeed);
      }
    }
  }
  type();

  // Skills radar chart
  const ctx = document.getElementById('skillsChart').getContext('2d');
  const skillsChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['C#', 'Flutter & Dart', 'React', 'HTML & CSS', 'JavaScript', 'Bootstrap', 'MySQL', 'Python', 'AI Video Creation'],
      datasets: [{
        label: 'Skill Proficiency',
        data: [60, 80, 30, 85, 30, 60, 70, 39, 85],
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
        borderColor: '#FFD700',
        pointBackgroundColor: '#42A5F5',
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        r: {
          angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          pointLabels: { font: { size: 12, family: 'Poppins' }, color: '#E0E0E0' },
          ticks: { display: false }
        }
      },
      plugins: { legend: { labels: { color: '#E0E0E0', font: { family: 'Poppins' } } } }
    }
  });

  // 3D tilt effect on project cards
  VanillaTilt.init(projectCards, {
    max: 10,
    speed: 400,
    glare: false
  });

  // Smooth scrolling for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        nav.classList.remove('active');
        hamburger?.classList.remove('active');
      }
    });
  });

  // Scroll handling: nav highlight, progress, visibility
  window.addEventListener('scroll', () => {
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === currentSection) {
        link.classList.add('active');
      }
    });

    // Scroll progress
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = `${scrollPercent}%`;

    // Scroll-to-top button
    scrollToTopBtn.style.display = scrollTop > 300 ? 'block' : 'none';

    // Section visibility
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < window.innerHeight * 0.8) {
        section.classList.add('visible');
      }
    });

    // Hide scroll indicator
    if (scrollTop > 100) {
      scrollIndicator.style.opacity = '0';
    } else {
      scrollIndicator.style.opacity = '1';
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Hamburger menu (mobile)
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !hamburger?.contains(e.target) && nav.classList.contains('active')) {
      nav.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });

  // Theme toggle
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeToggle.textContent = '🌙';
  } else {
    themeToggle.textContent = '☀️';
  }
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    themeToggle.textContent = body.classList.contains('light-mode') ? '🌙' : '☀️';
    localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
  });

  // Project filtering
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      projectCards.forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'flex' : 'none';
        if (card.style.display === 'flex') {
          card.classList.add('visible');
        }
      });
    });
  });

  // Project modal
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.dataset.title;
      const description = card.dataset.description;
      const tech = card.dataset.tech;
      const image = card.querySelector('img').src;
      document.querySelector('#project-title').textContent = title;
      document.querySelector('#project-description').textContent = description;
      document.querySelector('#project-tech').textContent = tech;
      document.querySelector('#project-image').src = image;
      projectModal.style.display = 'flex';
      setTimeout(() => document.querySelector('#project-modal .modal-content').classList.add('show'), 10);
    });
  });

  // Contact modal
  contactFormBtn.addEventListener('click', () => {
    contactModal.style.display = 'flex';
    setTimeout(() => document.querySelector('#contact-modal .modal-content').classList.add('show'), 10);
  });

  // Close modals
  closeModals.forEach(close => {
    close.addEventListener('click', () => {
      const modal = close.closest('.modal');
      modal.querySelector('.modal-content').classList.remove('show');
      setTimeout(() => {
        modal.style.display = 'none';
        if (modal.id === 'contact-modal') {
          contactForm.reset();
          clearErrors();
        }
      }, 300);
    });
  });

  // Close modal on outside click
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.querySelector('.modal-content').classList.remove('show');
        setTimeout(() => {
          modal.style.display = 'none';
          if (modal.id === 'contact-modal') {
            contactForm.reset();
            clearErrors();
          }
        }, 300);
      }
    });
  });

  // Form validation
  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      validateField(input);
    });
  });

  function validateField(input) {
    const errorElement = document.getElementById(`${input.id}-error`);
    if (!input.value.trim()) {
      errorElement.textContent = `${input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required.`;
      errorElement.style.display = 'block';
    } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      errorElement.textContent = 'Please enter a valid email.';
      errorElement.style.display = 'block';
    } else {
      errorElement.style.display = 'none';
    }
  }

  function clearErrors() {
    document.querySelectorAll('.error-message').forEach(error => {
      error.style.display = 'none';
      error.textContent = '';
    });
  }

  // Form submission with EmailJS
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const submitBtn = document.getElementById('form-submit');
    const spinner = document.getElementById('loading-spinner');

    let isValid = true;
    inputs.forEach(input => {
      validateField(input);
      if (document.getElementById(`${input.id}-error`).style.display === 'block') {
        isValid = false;
      }
    });

    if (isValid) {
      submitBtn.disabled = true;
      spinner.style.display = 'block';
      emailjs.send('service_q1ogxci', 'template_zsh1xgf', {
        from_name: name,
        from_email: email,
        message: message
      }).then(() => {
        submissionCount++;
        localStorage.setItem('submissionCount', submissionCount);
        submissionCounter.textContent = `Messages sent: ${submissionCount}`;
        const successMessage = document.createElement('p');
        successMessage.textContent = `Thank you, ${name}! Your message has been sent.`;
        successMessage.style.color = 'green';
        contactForm.prepend(successMessage);
        setTimeout(() => {
          document.querySelector('#contact-modal .modal-content').classList.remove('show');
          setTimeout(() => {
            contactModal.style.display = 'none';
            contactForm.reset();
            clearErrors();
            successMessage.remove();
            submitBtn.disabled = false;
            spinner.style.display = 'none';
          }, 300);
        }, 2000);
      }, (error) => {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Failed to send message. Please try again.';
        errorMessage.style.color = 'red';
        contactForm.prepend(errorMessage);
        setTimeout(() => {
          errorMessage.remove();
          submitBtn.disabled = false;
          spinner.style.display = 'none';
        }, 2000);
      });
    }
  });

  // Testimonial carousel
  let currentTestimonial = 0;
  function updateCarousel() {
    testimonials.forEach((testimonial, index) => {
      testimonial.style.transform = `translateX(${(index - currentTestimonial) * 100}%)`;
    });
  }

  carouselNext.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateCarousel();
  });

  carouselPrev.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    updateCarousel();
  });

  updateCarousel();
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateCarousel();
  }, 5000);

  // Scroll-to-top
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});