/* ================================================================
   DNA × APPLE — Animation Engine v2.0
   ================================================================
   JavaScript companion for dna-design-system-v2.css
   Powers all Apple-like scroll-triggered animations.
   
   Usage: Import this file at the bottom of any prototype.
   All animations are opt-in via CSS classes — no config needed.
   
   Patterns:
   1. Scroll Reveal (fade-up on viewport entry)
   2. Stagger Children (sequential reveal)
   3. Hero Cascade (page-load entrance sequence)
   4. Number Count-Up (stat counters)
   5. Parallax (subtle depth on scroll)
   6. Nav Glass Intensification (opacity on scroll)
   7. Image Clip Reveal (directional unveil)
   8. Section Color Transition (smooth bg blend)
   9. Sticky Scroll Section (pinned content swap)
   10. Card Tilt (3D micro-interaction on hover)
   
   Respects prefers-reduced-motion automatically.
   ================================================================ */

(function() {
  'use strict';

  // ── Check reduced motion preference ──
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Shared IntersectionObserver config ──
  const defaultThreshold = 0.15;
  const defaultRootMargin = '0px 0px -60px 0px';


  /* ═══════════════════════════════════════
     1. SCROLL REVEAL — .reveal
     The #1 Apple animation. Elements fade up
     when they enter the viewport.
     
     HTML: <div class="reveal">...</div>
     With delay: <div class="reveal reveal--delay-2">...</div>
     ═══════════════════════════════════════ */
  function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    if (prefersReducedMotion) {
      elements.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: defaultThreshold,
      rootMargin: defaultRootMargin
    });

    elements.forEach(el => observer.observe(el));
  }


  /* ═══════════════════════════════════════
     2. STAGGER CHILDREN — .stagger
     Parent container triggers all children
     to reveal with 80ms delay between each.
     
     HTML: 
     <div class="stagger">
       <div>Card 1</div>
       <div>Card 2</div>
       <div>Card 3</div>
     </div>
     ═══════════════════════════════════════ */
  function initStagger() {
    const containers = document.querySelectorAll('.stagger');
    if (!containers.length) return;

    if (prefersReducedMotion) {
      containers.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: defaultRootMargin
    });

    containers.forEach(el => observer.observe(el));
  }


  /* ═══════════════════════════════════════
     3. HERO CASCADE — .hero-cascade
     Page load entrance sequence:
     eyebrow (0ms) → title (150ms) → subtitle (300ms) 
     → actions (450ms) → media (600ms)
     
     HTML:
     <section class="hero-cascade">
       <span class="hero-cascade__eyebrow">...</span>
       <h1 class="hero-cascade__title">...</h1>
       <p class="hero-cascade__subtitle">...</p>
       <div class="hero-cascade__actions">...</div>
       <div class="hero-cascade__media">...</div>
     </section>
     ═══════════════════════════════════════ */
  function initHeroCascade() {
    const heroes = document.querySelectorAll('.hero-cascade');
    if (!heroes.length) return;

    if (prefersReducedMotion) {
      heroes.forEach(hero => {
        hero.querySelectorAll('[class*="hero-cascade__"]').forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      });
      return;
    }

    const sequence = [
      { selector: '.hero-cascade__eyebrow', delay: 0 },
      { selector: '.hero-cascade__title', delay: 150 },
      { selector: '.hero-cascade__subtitle', delay: 300 },
      { selector: '.hero-cascade__actions', delay: 450 },
      { selector: '.hero-cascade__media', delay: 600 }
    ];

    heroes.forEach(hero => {
      // Set initial state
      sequence.forEach(({ selector }) => {
        const el = hero.querySelector(selector);
        if (el) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(20px)';
          el.style.transition = 'none';
        }
      });

      // Trigger after a frame (allows initial state to paint)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          sequence.forEach(({ selector, delay }) => {
            const el = hero.querySelector(selector);
            if (el) {
              el.style.transition = `opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }
          });

          // Special: media element gets scale instead of translateY
          const media = hero.querySelector('.hero-cascade__media');
          if (media) {
            media.style.transform = 'scale(0.95)';
            media.style.transition = `opacity 1000ms cubic-bezier(0.16, 1, 0.3, 1) 600ms, transform 1000ms cubic-bezier(0.16, 1, 0.3, 1) 600ms`;
            requestAnimationFrame(() => {
              media.style.opacity = '1';
              media.style.transform = 'scale(1)';
            });
          }
        });
      });
    });
  }


  /* ═══════════════════════════════════════
     4. NUMBER COUNT-UP — .count-up
     Animates numbers from 0 to target value
     when they enter the viewport.
     
     HTML: <span class="count-up" data-target="12456">0</span>
     Options:
       data-target="12456"    — target number
       data-duration="1500"   — animation ms (default: 1500)
       data-prefix="£"       — prefix (e.g. currency)
       data-suffix="%"       — suffix
       data-separator=","    — thousands separator (default: ",")
     ═══════════════════════════════════════ */
  function initCountUp() {
    const counters = document.querySelectorAll('.count-up');
    if (!counters.length) return;

    if (prefersReducedMotion) {
      counters.forEach(el => {
        const target = parseInt(el.dataset.target, 10) || 0;
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const separator = el.dataset.separator !== undefined ? el.dataset.separator : ',';
        el.textContent = prefix + formatNumber(target, separator) + suffix;
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10) || 0;
    const duration = parseInt(el.dataset.duration, 10) || 1500;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const separator = el.dataset.separator !== undefined ? el.dataset.separator : ',';
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      el.textContent = prefix + formatNumber(current, separator) + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  function formatNumber(num, separator) {
    if (!separator) return num.toString();
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  }


  /* ═══════════════════════════════════════
     5. PARALLAX — .parallax
     Subtle depth: element moves slower than
     scroll speed. 10-15% offset by default.
     
     HTML: <div class="parallax" data-speed="0.12">...</div>
     data-speed: 0.05 (subtle) to 0.3 (dramatic)
     Default: 0.12
     ═══════════════════════════════════════ */
  function initParallax() {
    const elements = document.querySelectorAll('.parallax');
    if (!elements.length || prefersReducedMotion) return;

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          elements.forEach(el => {
            const speed = parseFloat(el.dataset.speed) || 0.12;
            const rect = el.getBoundingClientRect();
            const centerY = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const offset = (centerY - viewportCenter) * speed;
            el.style.transform = `translateY(${offset}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Initial position
  }


  /* ═══════════════════════════════════════
     6. NAV GLASS INTENSIFICATION — .nav
     Nav background becomes more opaque as
     user scrolls past the hero section.
     
     HTML: <nav class="nav">
             <div class="nav__inner">...</div>
           </nav>
     
     Adds .nav--scrolled class after scrolling
     past threshold (default: 100px).
     ═══════════════════════════════════════ */
  function initNavIntensification() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const threshold = parseInt(nav.dataset.scrollThreshold, 10) || 100;
    let lastState = false;

    function onScroll() {
      const scrolled = window.scrollY > threshold;
      if (scrolled !== lastState) {
        nav.classList.toggle('nav--scrolled', scrolled);
        lastState = scrolled;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Check initial state
  }


  /* ═══════════════════════════════════════
     7. IMAGE CLIP REVEAL — .clip-reveal
     Images unveil with a clip-path animation
     when they enter the viewport.
     
     HTML: <div class="clip-reveal" data-direction="up">
             <img src="..." />
           </div>
     
     Directions: up (default), down, left, right
     ═══════════════════════════════════════ */
  function initClipReveal() {
    const elements = document.querySelectorAll('.clip-reveal');
    if (!elements.length) return;

    if (prefersReducedMotion) {
      elements.forEach(el => {
        el.style.clipPath = 'inset(0)';
        el.style.opacity = '1';
      });
      return;
    }

    const clipStates = {
      up:    { from: 'inset(100% 0 0 0)', to: 'inset(0)' },
      down:  { from: 'inset(0 0 100% 0)', to: 'inset(0)' },
      left:  { from: 'inset(0 100% 0 0)', to: 'inset(0)' },
      right: { from: 'inset(0 0 0 100%)', to: 'inset(0)' }
    };

    elements.forEach(el => {
      const direction = el.dataset.direction || 'up';
      const clip = clipStates[direction] || clipStates.up;
      el.style.clipPath = clip.from;
      el.style.opacity = '0';
      el.style.transition = 'clip-path 1000ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const direction = el.dataset.direction || 'up';
          const clip = clipStates[direction] || clipStates.up;
          el.style.clipPath = clip.to;
          el.style.opacity = '1';
          observer.unobserve(el);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
  }


  /* ═══════════════════════════════════════
     8. SECTION COLOR TRANSITION — .section-blend
     Smooth background color transition between
     sections as user scrolls through overlap zone.
     
     HTML: <section class="section-blend" 
             data-bg-from="#FFFFFF" 
             data-bg-to="#161515"
             data-text-from="#030000"
             data-text-to="#F0EFEB">
           </section>
     ═══════════════════════════════════════ */
  function initSectionBlend() {
    const sections = document.querySelectorAll('.section-blend');
    if (!sections.length || prefersReducedMotion) return;

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          sections.forEach(el => {
            const rect = el.getBoundingClientRect();
            const viewH = window.innerHeight;
            // Progress: 0 when section enters bottom, 1 when fully in view
            const progress = Math.max(0, Math.min(1, 1 - (rect.top / viewH)));

            const bgFrom = el.dataset.bgFrom || '#FFFFFF';
            const bgTo = el.dataset.bgTo || '#161515';
            const textFrom = el.dataset.textFrom;
            const textTo = el.dataset.textTo;

            el.style.backgroundColor = interpolateColor(bgFrom, bgTo, progress);
            if (textFrom && textTo) {
              el.style.color = interpolateColor(textFrom, textTo, progress);
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function interpolateColor(color1, color2, factor) {
    const r1 = parseInt(color1.slice(1, 3), 16);
    const g1 = parseInt(color1.slice(3, 5), 16);
    const b1 = parseInt(color1.slice(5, 7), 16);
    const r2 = parseInt(color2.slice(1, 3), 16);
    const g2 = parseInt(color2.slice(3, 5), 16);
    const b2 = parseInt(color2.slice(5, 7), 16);
    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);
    return `rgb(${r}, ${g}, ${b})`;
  }


  /* ═══════════════════════════════════════
     9. STICKY SCROLL SECTION — .sticky-section
     A section pins to the viewport while inner
     content steps change on scroll progress.
     
     HTML:
     <div class="sticky-section" data-steps="3">
       <div class="sticky-section__pinned">
         <div class="sticky-section__step is-active" data-step="1">
           <h2>Step 1 content</h2>
         </div>
         <div class="sticky-section__step" data-step="2">
           <h2>Step 2 content</h2>
         </div>
         <div class="sticky-section__step" data-step="3">
           <h2>Step 3 content</h2>
         </div>
       </div>
     </div>
     ═══════════════════════════════════════ */
  function initStickyScroll() {
    const sections = document.querySelectorAll('.sticky-section');
    if (!sections.length || prefersReducedMotion) return;

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const totalSteps = parseInt(section.dataset.steps, 10) || 3;
            const sectionHeight = rect.height;
            const scrollProgress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - window.innerHeight)));
            const currentStep = Math.min(totalSteps, Math.floor(scrollProgress * totalSteps) + 1);

            section.querySelectorAll('.sticky-section__step').forEach(step => {
              const stepNum = parseInt(step.dataset.step, 10);
              step.classList.toggle('is-active', stepNum === currentStep);
            });
          });
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }


  /* ═══════════════════════════════════════
     10. CARD TILT — .card-tilt
     Subtle 3D tilt effect on mouse hover.
     Makes cards feel physical and tangible.
     
     HTML: <div class="card card-tilt">...</div>
     data-tilt-max="8" — max degrees (default: 8)
     ═══════════════════════════════════════ */
  function initCardTilt() {
    const cards = document.querySelectorAll('.card-tilt');
    if (!cards.length || prefersReducedMotion) return;

    cards.forEach(card => {
      const maxTilt = parseFloat(card.dataset.tiltMax) || 8;

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const tiltX = (0.5 - y) * maxTilt;
        const tiltY = (x - 0.5) * maxTilt;
        card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
        card.style.transition = 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)';
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 100ms ease-out';
      });
    });
  }


  /* ═══════════════════════════════════════
     BONUS: MAGNETIC BUTTON — .btn-magnetic
     Button subtly follows the cursor on hover
     like Apple's CTA buttons on product pages.
     
     HTML: <button class="btn btn--primary btn-magnetic">...</button>
     ═══════════════════════════════════════ */
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-magnetic');
    if (!buttons.length || prefersReducedMotion) return;

    buttons.forEach(btn => {
      const strength = 0.3; // How far the button moves (0-1)

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
        btn.style.transition = 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)';
      });

      btn.addEventListener('mouseenter', () => {
        btn.style.transition = 'transform 100ms ease-out';
      });
    });
  }


  /* ═══════════════════════════════════════
     BONUS: SMOOTH SCROLL PROGRESS — .scroll-progress
     A thin bar at the top of the page showing
     how far the user has scrolled.
     
     HTML: <div class="scroll-progress"></div>
     (place as first child of body)
     ═══════════════════════════════════════ */
  function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;

    // Style the bar
    Object.assign(bar.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      height: '3px',
      background: 'var(--color-accent-mint, #83C6A3)',
      zIndex: '9999',
      transition: 'width 100ms linear',
      borderRadius: '0 2px 2px 0'
    });

    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }


  /* ═══════════════════════════════════════
     INIT — Fire everything on DOMContentLoaded
     ═══════════════════════════════════════ */
  function init() {
    initScrollReveal();
    initStagger();
    initHeroCascade();
    initCountUp();
    initParallax();
    initNavIntensification();
    initClipReveal();
    initSectionBlend();
    initStickyScroll();
    initCardTilt();
    initMagneticButtons();
    initScrollProgress();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for React/SPA — can re-init after route changes
  window.DNAAnimations = {
    init,
    initScrollReveal,
    initStagger,
    initHeroCascade,
    initCountUp,
    initParallax,
    initNavIntensification,
    initClipReveal,
    initSectionBlend,
    initStickyScroll,
    initCardTilt,
    initMagneticButtons,
    initScrollProgress
  };

})();
