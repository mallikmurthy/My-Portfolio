/* ═══════════════════════════════════════════════════════════════════
   script.js — Mallikmurthy M Portfolio
   Exactly four responsibilities. No libraries. No external fetch.
═══════════════════════════════════════════════════════════════════ */

/* ── Configuration ──────────────────────────────────────────────────
   Set RESUME_AVAILABLE = true once assets/Mallikmurthy_M_Resume-v8.pdf
   is placed in the assets/ folder.

   Set ACHIEVEMENTS_AVAILABLE = true once you are ready to display the
   Achievements & Certifications section.
─────────────────────────────────────────────────────────────────── */
const RESUME_AVAILABLE       = false;
const ACHIEVEMENTS_AVAILABLE = true;   // 3 real achievements are present


/* ── 1. Conditional section gates ───────────────────────────────────
   Shows or hides the resume and achievements sections (and their
   matching nav items) based on the constants above.
─────────────────────────────────────────────────────────────────── */
(function applySectionGates() {
  function setSection(sectionId, navItemId, available) {
    const section = document.getElementById(sectionId);
    const navItem = document.getElementById(navItemId);
    if (!section || !navItem) return;

    if (available) {
      section.removeAttribute('hidden');
      navItem.removeAttribute('hidden');
    } else {
      section.setAttribute('hidden', '');
      navItem.setAttribute('hidden', '');
    }
  }

  setSection('resume',       'nav-resume',       RESUME_AVAILABLE);
  setSection('achievements', 'nav-achievements', ACHIEVEMENTS_AVAILABLE);
}());


/* ── 2. Footer year ─────────────────────────────────────────────────
   Writes the current year into the footer automatically.
─────────────────────────────────────────────────────────────────── */
(function setFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}());


/* ── 3. Mobile nav toggle ───────────────────────────────────────────
   Hamburger button: toggles .nav-open on <body> and syncs aria-expanded.
   Clicking any nav link closes the menu.
─────────────────────────────────────────────────────────────────── */
(function initMobileNav() {
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (!hamburger || !navLinks) return;

  function openNav() {
    document.body.classList.add('nav-open');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeNav() {
    document.body.classList.remove('nav-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  function toggleNav() {
    if (document.body.classList.contains('nav-open')) {
      closeNav();
    } else {
      openNav();
    }
  }

  hamburger.addEventListener('click', toggleNav);

  /* Close menu when any nav link is activated */
  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', closeNav);
  });

  /* Close menu when focus moves outside the nav (keyboard users) */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
      closeNav();
      hamburger.focus();
    }
  });
}());


/* ── 4. Scroll-spy ──────────────────────────────────────────────────
   Uses IntersectionObserver to track which section is in view and
   applies the .active class to the matching nav link.
   No polling. No scroll event listener.
─────────────────────────────────────────────────────────────────── */
(function initScrollSpy() {
  const sections  = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  if (!sections.length || !navAnchors.length) return;

  function setActive(id) {
    navAnchors.forEach(function(a) {
      if (a.getAttribute('href') === '#' + id) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }

  /* rootMargin pushes the trigger point down so the active link
     updates when the section heading is near the top of the viewport,
     accounting for the fixed 64px nav bar. */
  var observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      rootMargin: '-64px 0px -40% 0px',
      threshold: 0
    }
  );

  sections.forEach(function(section) {
    observer.observe(section);
  });
}());


/* ── Avatar graceful hide ───────────────────────────────────────────
   If assets/avatar.jpg cannot be loaded, hide the image element so
   the hero layout stays clean (no broken-image icon).
   The onerror is also set inline in HTML as a fallback.
─────────────────────────────────────────────────────────────────── */
(function handleAvatarError() {
  var avatar = document.querySelector('.hero-avatar');
  if (!avatar) return;

  function hideAvatar() {
    avatar.style.display = 'none';
    var wrap = avatar.closest('.hero-avatar-wrap');
    if (wrap) wrap.style.display = 'none';
  }

  avatar.addEventListener('error', hideAvatar);

  /* If the image is already broken by the time the script runs
     (e.g. cached failure), hide it immediately */
  if (avatar.complete && !avatar.naturalWidth) {
    hideAvatar();
  }
}());
