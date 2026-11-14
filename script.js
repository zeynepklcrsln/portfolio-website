/**
 * PORTFOLIO JAVASCRIPT - ZEYNEP KILIÇARSLAN
 * Interactive features: Typewriter, Terminal simulator, Particle Canvas,
 * Mobile Menu, Scroll Spy, Scroll Reveal, Clipboard copy, and Mailto handler.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. MOBILE NAVIGATION & HAMBURGER MENU
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !navMenu.classList.contains('open');
      hamburgerBtn.classList.toggle('active', isOpen);
      navMenu.classList.toggle('open', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      
      // Prevent background scrolling when mobile menu is open
      if (window.innerWidth <= 768) {
        document.body.style.overflow = isOpen ? 'hidden' : '';
      }
    };

    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close mobile menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          toggleMenu(false);
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        toggleMenu(false);
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  // ==========================================================================
  // 2. NAVBAR SCROLL EFFECT & ACTIVE LINK SCROLL SPY
  // ==========================================================================
  const handleScroll = () => {
    // Header backdrop enhancement on scroll
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy: highlight current visible section
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const targetLink = document.querySelector(`.nav-menu a[href="#${id}"]`);

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (targetLink) {
          targetLink.classList.add('active');
        }
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // ==========================================================================
  // 3. TYPEWRITER EFFECT (HERO SUBTITLE)
  // ==========================================================================
  const typewriterElem = document.getElementById('typewriter');
  if (typewriterElem) {
    const phrases = [
      'Yazılım Geliştirme & Siber Güvenlik',
      'C & Python Programlama',
      'Arduino & Gömülü Sistemler',
      'Problem Çözme & Algoritmalar'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    const typeLoop = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        charIndex--;
        typewriterElem.textContent = currentPhrase.substring(0, charIndex);
        typeSpeed = 40;
      } else {
        charIndex++;
        typewriterElem.textContent = currentPhrase.substring(0, charIndex);
        typeSpeed = 90;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at the end of phrase
        typeSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
      }

      setTimeout(typeLoop, typeSpeed);
    };

    setTimeout(typeLoop, 800);
  }

  // ==========================================================================
  // 4. SCROLL REVEAL OBSERVER
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // ==========================================================================
  // 5. COPY EMAIL BUTTON & TOAST NOTIFICATION
  // ==========================================================================
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyBtnText = document.getElementById('copy-btn-text');
  const toastNotify = document.getElementById('toast-notify');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  const showToast = (message) => {
    if (!toastNotify) return;
    if (toastMessage) toastMessage.textContent = message;
    
    toastNotify.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotify.classList.remove('show');
    }, 3200);
  };

  if (copyEmailBtn) {
    const emailToCopy = 'kilicarslanzeynep82@gmail.com';

    copyEmailBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(emailToCopy);
        } else {
          // Fallback using temporary textarea
          const textArea = document.createElement('textarea');
          textArea.value = emailToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }

        if (copyBtnText) copyBtnText.textContent = 'Kopyalandı!';
        copyEmailBtn.style.borderColor = 'var(--accent-blue)';
        showToast('E-posta adresi panoya kopyalandı!');

        setTimeout(() => {
          if (copyBtnText) copyBtnText.textContent = 'Adresi Kopyala';
          copyEmailBtn.style.borderColor = '';
        }, 2500);
      } catch (err) {
        showToast('Kopyalama başarısız oldu, lütfen manuel seçiniz.');
      }
    });
  }

  // ==========================================================================
  // 6. QUICK CONTACT MESSAGE FORM (DIRECT MAILTO HANDLER)
  // ==========================================================================
  const quickEmailForm = document.getElementById('quick-email-form');
  if (quickEmailForm) {
    quickEmailForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const subjectInput = document.getElementById('contact-subject');
      const bodyInput = document.getElementById('contact-body');

      const subject = subjectInput ? subjectInput.value.trim() : '';
      const body = bodyInput ? bodyInput.value.trim() : '';

      if (!subject || !body) {
        showToast('Lütfen konu ve mesaj alanlarını doldurunuz.');
        return;
      }

      const recipient = 'kilicarslanzeynep82@gmail.com';
      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Open email client
      window.location.href = mailtoUrl;
      showToast('E-posta uygulamanız açılıyor...');
    });
  }

  // ==========================================================================
  // 7. AMBIENT PARTICLES / GRID CANVAS (DARK TECH THEME)
  // ==========================================================================
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      const ctx = canvas.getContext('2d');
      let width = (canvas.width = window.innerWidth);
      let height = (canvas.height = window.innerHeight);

      // Particle parameters
      const particleCount = Math.min(Math.floor((width * height) / 18000), 65);
      const particles = [];
      const colors = ['#8B5CF6', '#38BDF8', '#6366F1', '#A78BFA'];

      class Particle {
        constructor() {
          this.reset(true);
        }

        reset(initial = false) {
          this.x = Math.random() * width;
          this.y = initial ? Math.random() * height : height + 10;
          this.radius = Math.random() * 1.8 + 0.6;
          this.color = colors[Math.floor(Math.random() * colors.length)];
          this.vx = (Math.random() - 0.5) * 0.45;
          this.vy = -(Math.random() * 0.55 + 0.15);
          this.alpha = Math.random() * 0.6 + 0.2;
        }

        update() {
          this.x += this.vx;
          this.y += this.vy;

          if (this.y < -10 || this.x < -10 || this.x > width + 10) {
            this.reset(false);
          }
        }

        draw() {
          ctx.save();
          ctx.globalAlpha = this.alpha;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = this.color;
          ctx.fill();
          ctx.restore();
        }
      }

      // Initialize particles
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }

      // Connect near particles with faint line
      const drawLines = () => {
        const maxDist = 110;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * 0.12;
              ctx.save();
              ctx.strokeStyle = '#8B5CF6';
              ctx.globalAlpha = alpha;
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
              ctx.restore();
            }
          }
        }
      };

      let animationFrameId;
      const animate = () => {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();
        }

        drawLines();
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      // Window resize handling with debouncing
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          width = canvas.width = window.innerWidth;
          height = canvas.height = window.innerHeight;
        }, 200);
      }, { passive: true });
    }
  }

});
