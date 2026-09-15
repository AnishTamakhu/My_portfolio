// Mobile nav toggle and small UI behaviors
document.addEventListener('DOMContentLoaded', function(){
  // Year in footer
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  if(navToggle && nav){
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      const expanded = nav.classList.contains('open');
      navToggle.setAttribute('aria-expanded', expanded);
    });
    // Close nav when clicking a link (mobile)
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=> nav.classList.remove('open')));
  }

  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Toggle hidden training details
  document.querySelectorAll('.toggle-points').forEach(button => {
    const targetId = button.getAttribute('aria-controls');
    const target = targetId ? document.getElementById(targetId) : null;
    if (!target) return;

    button.addEventListener('click', () => {
      const isHidden = target.classList.toggle('hidden');
      button.textContent = isHidden ? 'Show details' : 'Hide details';
      button.setAttribute('aria-expanded', String(!isHidden));
    });
  });

  // Simple reveal on scroll
  const revealElems = document.querySelectorAll('.card, .section h2, .hero');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('reveal');
      }
    });
  }, {threshold: 0.12});
  revealElems.forEach(e => io.observe(e));

  // Contact form submission
  (function(){
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');

    function openEmailFallback(name, email, message) {
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:anishtamakhu98@gmail.com?subject=${subject}&body=${body}`;
    }

    form.addEventListener('submit', function(e){
      e.preventDefault();

      const name = form.querySelector('input[name="name"]').value.trim();
      const email = form.querySelector('input[name="email"]').value.trim();
      const message = form.querySelector('textarea[name="message"]').value.trim();

      if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Opening email...';
      }

      openEmailFallback(name, email, message);
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send';
      }
    });
  })();

});