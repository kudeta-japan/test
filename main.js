document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if(href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth'});
      }
    });
  });
  // Tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab, .tab-panel').forEach(el => el.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.target).classList.add('active');
    });
  });
  // Footer data
  const body = document.body;
  document.getElementById('footer-address').textContent = body.dataset.address;
  document.getElementById('footer-hours').textContent = body.dataset.hours;
  document.getElementById('footer-phone').textContent = body.dataset.phone;
});
// Simple validation
const form = document.getElementById('reserve-form');
form.addEventListener('submit', e => {
  if(!form.checkValidity()) {
    e.preventDefault();
    alert('入力内容を確認してください');
  } else {
    e.preventDefault();
    alert('送信しました');
    form.reset();
  }
});
