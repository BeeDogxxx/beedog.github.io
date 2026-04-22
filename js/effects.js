/* ====================================================================
   BeeDog · effects.js — 光标粒子 / 按钮星爆
   ==================================================================== */
(function () {
  'use strict';
  // 鼠标移动粒子
  let last = 0;
  document.addEventListener('mousemove', (e) => {
    const now = performance.now();
    if (now - last < 60) return;
    last = now;
    if (Math.random() > 0.4) return;
    const d = document.createElement('div');
    d.className = 'dust';
    d.style.left = (e.clientX - 3) + 'px';
    d.style.top = (e.clientY - 3) + 'px';
    d.style.setProperty('--dx', (Math.random() * 30 - 15) + 'px');
    d.style.setProperty('--dy', (10 + Math.random() * 20) + 'px');
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 600);
  });

  // 按钮按下星爆
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn, .project-link');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    for (let i = 0; i < 8; i++) {
      const s = document.createElement('div');
      s.className = 'spark';
      s.style.left = cx + 'px';
      s.style.top = cy + 'px';
      const ang = (i / 8) * Math.PI * 2;
      s.style.setProperty('--sx', Math.cos(ang) * 40 + 'px');
      s.style.setProperty('--sy', Math.sin(ang) * 40 + 'px');
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 600);
    }
  });

  // 按钮点击涟漪位置
  document.addEventListener('pointerdown', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    btn.style.setProperty('--ripple-x', (e.clientX - r.left) + 'px');
    btn.style.setProperty('--ripple-y', (e.clientY - r.top) + 'px');
  });
})();
