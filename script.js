/* ============================================
   D' Street Coffe — script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- NAVBAR SCROLL ---------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', scrollY > 40);
  });

  /* ---------- HAMBURGER MENU ---------- */
  const ham  = document.getElementById('hamburger');
  const nav  = document.getElementById('navLinks');
  ham.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('open'))
  );

  /* ---------- MENU TABS ---------- */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const t = btn.dataset.tab;
      ['coffee', 'noncoffee', 'thaican'].forEach(id => {
        document.getElementById('tab-' + id).classList.toggle('hidden', id !== t);
      });
    });
  });

  /* ---------- SCROLL REVEAL (Intersection Observer) ---------- */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity    = '1';
        e.target.style.transform  = 'translateY(0)';
      }
    });
  }, { threshold: .1 });

  document.querySelectorAll('.sig-card, .lokasi-card, .nilai-row, .menu-col').forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    obs.observe(el);
  });

  /* ---------- GALERI — Upload & Preview Foto ---------- */
  document.querySelectorAll('.galeri-slot').forEach(slot => {
    const input       = slot.querySelector('input[type="file"]');
    const placeholder = slot.querySelector('.slot-placeholder');
    const overlay     = slot.querySelector('.slot-overlay');

    if (!input) return;

    input.addEventListener('change', function () {
      const file = this.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (e) {
        // Hapus placeholder
        if (placeholder) placeholder.style.display = 'none';

        // Cek apakah sudah ada img
        let img = slot.querySelector('img');
        if (!img) {
          img = document.createElement('img');
          img.alt = 'Foto D\' Street Coffe';
          slot.insertBefore(img, overlay || null);
        }
        img.src = e.target.result;

        // Tampilkan overlay ganti foto
        if (overlay) overlay.style.display = 'flex';
      };
      reader.readAsDataURL(file);
    });
  });

  /* ---------- GALERI — Lightbox sederhana ---------- */
  document.querySelectorAll('.galeri-slot img').forEach(img => {
    img.addEventListener('click', function (e) {
      e.stopPropagation();
      openLightbox(this.src, this.alt);
    });
  });

  // Delegasi event untuk gambar yang dimuat dinamis
  document.getElementById('galeri-wrapper')?.addEventListener('click', function (e) {
    if (e.target.tagName === 'IMG') {
      openLightbox(e.target.src, e.target.alt);
    }
  });

  function openLightbox(src, alt) {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    const lbImg = lb.querySelector('.lb-img');
    lbImg.src = src;
    lbImg.alt = alt || '';
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Tutup lightbox
  const lb = document.getElementById('lightbox');
  if (lb) {
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.classList.contains('lb-close')) {
        lb.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        lb.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

});
