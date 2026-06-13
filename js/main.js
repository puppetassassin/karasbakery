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

// Floating logo — smart color switching based on background luminance
const floatingLogo = document.getElementById('floatingLogo');
if (floatingLogo) {
    function getLuminance(r, g, b) {
          const toLinear = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
          return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
    }
  
    function getBgColorAt(x, y) {
          floatingLogo.style.display = 'none';
          const els = document.elementsFromPoint(x, y);
          floatingLogo.style.display = '';
          for (const el of els) {
                  const bg = window.getComputedStyle(el).backgroundColor;
                  const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                  if (m) {
                            const a = bg.match(/rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/);
                            if (!a || parseFloat(a[1]) > 0.1) {
                                        return { r: +m[1], g: +m[2], b: +m[3] };
                            }
                  }
          }
          return { r: 255, g: 255, b: 255 };
    }
  
    function updateFloatingLogo() {
          const rect = floatingLogo.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const color = getBgColorAt(cx, cy);
          const lum = getLuminance(color.r, color.g, color.b);
          floatingLogo.classList.toggle('on-dark', lum < 0.35);
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
