// Mobile menu
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}));

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Counters
const fmt = n => n.toLocaleString('vi-VN');
const counterIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count, start = performance.now(), dur = 1400;
    const tick = t => {
      const p = Math.min((t - start) / dur, 1);
      el.textContent = fmt(Math.round(target * (1 - Math.pow(1 - p, 3)))) + (p === 1 ? '+' : '');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterIO.unobserve(el);
  });
});
document.querySelectorAll('[data-count]').forEach(el => counterIO.observe(el));

// Before / after slider
const range = document.getElementById('baRange');
const after = document.getElementById('baAfter');
const handle = document.getElementById('baHandle');
const updateBA = () => {
  after.style.clipPath = `inset(0 0 0 ${range.value}%)`;
  handle.style.left = range.value + '%';
};
range.addEventListener('input', updateBA);

// Booking form
const dateInput = document.getElementById('date');
dateInput.min = new Date().toISOString().split('T')[0];
const form = document.getElementById('bookingForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;
  ['name', 'phone'].forEach(id => {
    const input = document.getElementById(id);
    const ok = input.value.trim() && input.checkValidity();
    input.style.borderColor = ok ? '' : '#e5484d';
    if (!ok) valid = false;
  });
  if (!valid) return;
  // TODO: gửi dữ liệu về server / Google Sheet / CRM tại đây
  document.getElementById('successName').textContent = document.getElementById('name').value.trim();
  document.getElementById('formBody').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
});

document.getElementById('year').textContent = new Date().getFullYear();
