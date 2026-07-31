// ============================================
// Fahad Ashraf — Portfolio
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loading Screen ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 700);
  });
  // Fallback in case 'load' fires very late
  setTimeout(() => loader && loader.classList.add('hidden'), 3000);

  /* ---------- Sticky Navbar ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 24) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    handleBackToTop();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile Nav Toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Smooth Scrolling ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const navHeight = navbar.offsetHeight;
          const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight + 1;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------- Typing Animation (Titles) ---------- */
  const roles = ['Web Developer', 'Graphic Designer'];
  const typedEl = document.getElementById('typedRole');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typedEl) {
    if (prefersReducedMotion) {
      typedEl.textContent = roles[0];
    } else {
      let roleIndex = 0;
      let charIndex = 0;
      let deleting = false;

      const type = () => {
        const current = roles[roleIndex];

        if (!deleting) {
          charIndex++;
          typedEl.textContent = current.slice(0, charIndex);
          if (charIndex === current.length) {
            deleting = true;
            setTimeout(type, 1600);
            return;
          }
        } else {
          charIndex--;
          typedEl.textContent = current.slice(0, charIndex);
          if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
          }
        }
        setTimeout(type, deleting ? 40 : 90);
      };
      type();
    }
  }

  /* ---------- Mouse Glow Effect ---------- */
  const mouseGlow = document.getElementById('mouseGlow');
  if (mouseGlow && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    let rafId = null;
    document.addEventListener('mousemove', (e) => {
      mouseGlow.style.opacity = '1';
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        mouseGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      });
    });
    document.addEventListener('mouseleave', () => { mouseGlow.style.opacity = '0'; });
  }

  /* ---------- Scroll Reveal Animations ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Animated Skill Bars ---------- */
  const skillItems = document.querySelectorAll('.skill-item');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const item = entry.target;
        const level = item.getAttribute('data-level') || '0';
        const fill = item.querySelector('.skill-fill');
        requestAnimationFrame(() => {
          fill.style.width = level + '%';
        });
        skillObserver.unobserve(item);
      }
    });
  }, { threshold: 0.3 });
  skillItems.forEach(item => skillObserver.observe(item));

  /* ---------- Back To Top ---------- */
  const backToTop = document.getElementById('backToTop');
  function handleBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Active Nav Link on Scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinkEls.forEach(l => l.style.color = '');
        link.style.color = 'var(--text)';
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(sec => sectionObserver.observe(sec));

});
window.addEventListener("load", function() {
  const loader = document.querySelector(".loader") || document.querySelector("#loader") || document.querySelector("#preloader");
  if (loader) {
    setTimeout(() => {
      loader.style.display = "none";
    }, 1500); // 1.5 seconds baad loader gaayab ho jayega
  }
});
// --- CURSOR GLOW MOVEMENT (script.js के अंत में) ---
const glow = document.getElementById('cursor-glow');

if (glow) {
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
    });
}
