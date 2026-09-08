(() => {
  'use strict';
  const toggle = document.getElementById('site-menu-toggle');
  const nav = document.getElementById('site-navigation');
  const more = document.querySelector('.site-more');
  function closeNavigation(restoreFocus = false) {
    nav?.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', '打开导航');
    if (more) more.open = false;
    if (restoreFocus) toggle?.focus();
  }
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
  });
  nav?.addEventListener('click', e => { if (e.target.closest('a')) closeNavigation(); });
  document.addEventListener('click', e => { if (!e.target.closest('.site-header')) closeNavigation(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !document.querySelector('dialog[open]')) {
      if (nav?.classList.contains('is-open')) closeNavigation(true);
      else if (more?.open) { more.open = false; more.querySelector('summary').focus(); }
    }
  });
  matchMedia('(min-width: 1101px)').addEventListener('change', () => closeNavigation());
  // The world controller owns this control on the homepage.
  if (document.body.classList.contains('world-page')) return;
  const button = document.getElementById('motion-toggle');
  const label = document.getElementById('motion-label');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem('beedog_motion_off')); } catch {}
  let off = reduced.matches || saved === true;
  function render() {
    document.body.classList.toggle('motion-off', off);
    button?.setAttribute('aria-pressed', String(off));
    if (label) label.textContent = off ? '关闭' : '开启';
  }
  button?.addEventListener('click', () => {
    off = !off; saved = off;
    try { localStorage.setItem('beedog_motion_off', JSON.stringify(off)); } catch {}
    render();
  });
  reduced.addEventListener('change', () => { off = reduced.matches || saved === true; render(); });
  render();
})();
