/* ====================================================================
   BeeDog · main.js
   核心交互：导航汉堡、SCORE HUD、EXP +1、蜜蜂光标、Konami 彩蛋、Toast
   所有页面都加载这个脚本
   ==================================================================== */
(function () {
  'use strict';

  // ---------- 工具 ----------
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const lsGet = (k, d) => {
    try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); }
    catch { return d; }
  };
  const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

  // ---------- 汉堡菜单 ----------
  const hamburger = $('#hamburger');
  const navMenu = $('#navMenu') || $('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
  }

  // ---------- SCORE HUD ----------
  const scoreEl = $('#scoreValue');
  let score = lsGet('beedog_score', 0);
  const renderScore = () => {
    if (scoreEl) scoreEl.textContent = String(score).padStart(4, '0');
  };
  renderScore();

  const toast = $('#toast');
  const showToast = (msg, ms = 2000) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('show'), ms);
  };
  window.BeeDogToast = showToast;

  const popExp = (x, y, text = '+1 EXP') => {
    const el = document.createElement('div');
    el.className = 'exp-pop';
    el.textContent = text;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 900);
  };

  const addScore = (n = 1, e) => {
    score += n;
    lsSet('beedog_score', score);
    renderScore();
    if (e) popExp(e.clientX, e.clientY, (n > 0 ? '+' : '') + n + ' EXP');
    // 百分关
    if (score > 0 && score % 100 === 0) {
      showToast('🎉 LV UP! SCORE ' + score);
      rainBees(30);
    }
  };
  window.BeeDogAddScore = addScore;

  document.addEventListener('click', (e) => {
    const t = e.target.closest('.js-clickable, .btn, .project-card, .skill-item, .stat-item, .nav-menu a, .project-link');
    if (!t) return;
    addScore(1, e);
  });

  // ---------- 蜜蜂光标 ----------
  const bee = null;
  if (bee) {
    let bx = 0, by = 0, tx = 0, ty = 0;
    document.addEventListener('mousemove', (e) => { tx = e.clientX + 12; ty = e.clientY + 12; });
    const loop = () => {
      bx += (tx - bx) * 0.18;
      by += (ty - by) * 0.18;
      bee.style.transform = `translate(${bx}px, ${by}px)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener('mouseleave', () => bee.classList.add('hidden'));
    document.addEventListener('mouseenter', () => bee.classList.remove('hidden'));
  }

  // ---------- Konami Code ----------
  const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let ki = 0;
  document.addEventListener('keydown', (e) => {
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (k === konami[ki]) {
      ki++;
      if (ki === konami.length) {
        ki = 0;
        showToast('★ KONAMI ACTIVATED ★');
        rainBees(80);
        addScore(30);
      }
    } else { ki = k === konami[0] ? 1 : 0; }
  });

  function rainBees(n = 30) {
    for (let i = 0; i < n; i++) {
      const d = document.createElement('div');
      d.className = 'bee-rain-drop';
      d.textContent = ['🐝','⭐','✦','🍯'][Math.floor(Math.random()*4)];
      d.style.left = Math.random() * 100 + 'vw';
      d.style.animationDuration = (2 + Math.random() * 3) + 's';
      d.style.animationDelay = (Math.random() * 0.8) + 's';
      d.style.fontSize = (14 + Math.random() * 18) + 'px';
      document.body.appendChild(d);
      setTimeout(() => d.remove(), 6000);
    }
  }
  window.BeeDogRain = rainBees;

  // ---------- 神秘星星 ----------
  const star = $('#secretStar');
  if (star) {
    star.addEventListener('click', () => {
      showToast('你找到隐藏的星星了!+10 EXP');
      rainBees(20);
      addScore(10);
    });
  }

  // ---------- 双击项目卡翻转 ----------
  document.addEventListener('dblclick', (e) => {
    const card = e.target.closest('.project-card');
    if (!card) return;
    card.classList.remove('flipped');
    void card.offsetWidth;
    card.classList.add('flipped');
  });

  // ---------- 访问页面数统计（成就系统） ----------
  const visited = new Set(lsGet('beedog_visited', []));
  visited.add(location.pathname.split('/').pop() || 'index.html');
  lsSet('beedog_visited', [...visited]);
  if (visited.size >= 5 && !lsGet('beedog_ach_explorer', false)) {
    lsSet('beedog_ach_explorer', true);
    setTimeout(() => { showToast('🏆 成就解锁：探险家 +20 EXP'); addScore(20); }, 1200);
  }
})();
