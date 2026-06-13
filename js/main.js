const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

document.querySelectorAll('.nav__mobile a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

// Floating logo — flip to white when over dark sections
const floatingLogo = document.getElementById('floatingLogo');
if (floatingLogo) {
  const darkSections = document.querySelectorAll('.hero, .cta-banner');

  function updateFloatingLogo() {
    const rect = floatingLogo.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    let onDark = false;
    darkSections.forEach(section => {
      const sr = section.getBoundingClientRect();
      if (cx >= sr.left && cx <= sr.right && cy >= sr.top && cy <= sr.bottom) {
        onDark = true;
      }
    });
    floatingLogo.classList.toggle('on-dark', onDark);
  }

  window.addEventListener('scroll', updateFloatingLogo, { passive: true });
  updateFloatingLogo();
}

const orderForm = document.getElementById('orderForm');
if (orderForm) {
  orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const success = document.getElementById('formSuccess');
    const error = document.getElementById('formError');

    btn.textContent = 'Sending...';
    btn.disabled = true;
    success.style.display = 'none';
    error.style.display = 'none';

    try {
      const res = await fetch(orderForm.action, {
        method: 'POST',
        body: new FormData(orderForm),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        success.style.display = 'block';
        orderForm.reset();
        btn.textContent = 'Sent!';
      } else {
        throw new Error();
      }
    } catch {
      error.style.display = 'block';
      btn.textContent = 'Send My Order Request';
      btn.disabled = false;
    }
  });
}
