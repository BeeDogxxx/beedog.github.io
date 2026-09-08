/* One entrance per section. Content remains visible if JS or observers fail. */
(() => {
  'use strict';
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const off = () => preference.matches || document.body.classList.contains('motion-off');
  if (off() || !('IntersectionObserver' in window)) return;
  const selector = '.cover-copy,.cover-footnote,.chapter-heading,.destination,.page-header .container,.portfolio-heading,.resume-project .project-header,.blog-card,.education-card,.now-card,.inv-slot,.map-stage,.contact-info-item,.quick-link-item,.gb-console,.blog-header';
  const sections = [...document.querySelectorAll(selector)];
  const seen = new WeakSet();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting || seen.has(entry.target)) continue;
      seen.add(entry.target);
      observer.unobserve(entry.target);
      if (off()) continue;
      const siblings = [...entry.target.parentElement.children];
      const index = Math.max(0, siblings.indexOf(entry.target));
      const chapter = entry.target.classList.contains('destination');
      const card = ['destination','blog-card','now-card','inv-slot','contact-info-item','quick-link-item'].some(name => entry.target.classList.contains(name));
      if (card) {
        const direction = chapter ? ['left','pop','pop','right'][index % 4] : index % 2 ? 'right' : 'left';
        entry.target.classList.add('editorial-card');
        entry.target.classList.add(`editorial-${direction}`);
      }
      const delay = chapter ? index * 85 : entry.target.classList.contains('inv-slot') ? (index % 4) * 55 : 0;
      entry.target.style.setProperty('--entry-delay', `${Math.min(delay, 255)}ms`);
      entry.target.classList.add('editorial-enter');
      const complete = event => {
        if (event.target !== entry.target || event.animationName !== 'editorial-enter') return;
        entry.target.classList.remove('editorial-enter');
        entry.target.removeEventListener('animationend', complete);
      };
      entry.target.addEventListener('animationend', complete);
    }
  }, { threshold: .12, rootMargin: '0px 0px -48px 0px' });
  sections.forEach(section => observer.observe(section));
  function stop() {
    observer.disconnect();
    sections.forEach(section => section.classList.remove('editorial-enter'));
  }
  const stateObserver = new MutationObserver(() => { if (off()) stop(); });
  stateObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  preference.addEventListener('change', () => { if (off()) stop(); });
  window.addEventListener('pagehide', () => { stop(); stateObserver.disconnect(); }, { once: true });
})();
