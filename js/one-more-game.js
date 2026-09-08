(function () {
  'use strict';
  const game = new window.OneMoreEngine();
  const $ = id => document.getElementById('om-' + id);
  const stage = $('stage'), screen = $('screen'), notes = $('notes');
  const lanes = [...document.querySelectorAll('.rhythm-lane')];
  const noteElements = new Map();
  let frameId = 0, previousTime = 0, feedbackTimer = 0, best = 0;
  let stageWidth = 1, stageHeight = 1;
  try { const saved = Number(localStorage.getItem('beedog_one_more_best_v1')); best = Number.isFinite(saved) ? Math.max(0, Math.min(9999999, Math.floor(saved))) : 0; } catch (_) {}
  const reduced = () => document.documentElement.classList.contains('motion-off') || document.body.classList.contains('motion-off') || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const number = n => String(n).padStart(5, '0');
  const announce = text => { $('announcement').textContent = text; };
  function fit() { stageWidth = stage.clientWidth; stageHeight = stage.clientHeight; renderNotes(); }
  if (window.ResizeObserver) new ResizeObserver(fit).observe(stage);
  else window.addEventListener('resize', fit);
  function hud() {
    $('score').textContent = number(game.score); $('best').textContent = number(best);
    $('time').textContent = Math.ceil((game.duration - game.elapsed) / 1000) + 's';
    $('shield').textContent = '▰'.repeat(game.shield) + '▱'.repeat(5 - game.shield);
    $('shield').setAttribute('aria-label', `护盾 ${game.shield} / 5`);
    $('combo').textContent = `COMBO / ${String(game.combo).padStart(2, '0')} · ×${game.multiplier}`;
    $('phase').textContent = game.elapsed < 14000 ? '01 / FIND YOUR RHYTHM' : game.elapsed < 28000 ? '02 / LOCK IN' : '03 / ONE MORE';
    $('charge').textContent = `${game.charge} / 6`;
    [...$('cells').children].forEach((cell, i) => cell.classList.toggle('filled', i < game.charge));
    $('burst').disabled = game.charge < 6 || game.state !== 'playing';
    $('pause').disabled = game.state !== 'playing';
  }
  function renderNotes() {
    const visible = new Set();
    if (game.state === 'playing' || game.state === 'paused') {
      for (const note of game.notes) {
        if (note.done || note.time - game.elapsed > game.travel) continue;
        visible.add(note.id);
        let el = noteElements.get(note.id);
        if (!el) {
          el = document.createElement('div'); el.className = 'rhythm-note' + (note.trap ? ' trap' : '');
          const glyph = document.createElement('span'); glyph.className = 'note-glyph';
          if (note.trap) glyph.textContent = '×';
          el.append(glyph); notes.append(el); noteElements.set(note.id, el);
        }
        const y = 54 + (1 - (note.time - game.elapsed) / game.travel) * (stageHeight * .76 - 54);
        el.style.transform = `translate(${(note.lane + .5) * stageWidth / 3}px,${y}px)`;
      }
    }
    for (const [id, el] of noteElements) if (!visible.has(id)) { el.remove(); noteElements.delete(id); }
  }
  function feedback(event) {
    if (!event) return;
    const text = event.type === 'perfect' ? 'PERFECT!' : event.type === 'good' ? 'GOOD!' : event.type === 'burst' ? 'BREAK THROUGH!' : event.reason === 'trap' ? '诱饵！' : event.reason === 'empty' ? '等它到线！' : '漏接！';
    $('feedback').textContent = text; $('feedback').dataset.kind = event.type;
    clearTimeout(feedbackTimer); feedbackTimer = setTimeout(() => { $('feedback').textContent = ''; }, 480);
    if (event.type !== 'miss') {
      const ink = document.createElement('div'); ink.className = 'hit-ink' + (event.type === 'burst' ? ' slash' : '');
      ink.style.left = ((event.lane + .5) * 100 / 3) + '%'; ink.style.top = '76%'; $('impacts').append(ink);
      if (!reduced() && ink.animate) {
        ink.animate([{ opacity: 1, scale: '.65', rotate: '-12deg' }, { opacity: 0, scale: '1.4', rotate: '9deg' }], { duration: 340, easing: 'ease-out' });
      }
      setTimeout(() => ink.remove(), reduced() ? 130 : 350);
    }
    if (game.charge === 6 && event.type === 'perfect') announce('能量已满，可以按空格或点击释放冲击。');
  }
  function finish() {
    cancelAnimationFrame(frameId); renderNotes(); hud();
    const record = game.score > best;
    if (record) { best = game.score; try { localStorage.setItem('beedog_one_more_best_v1', String(best)); } catch (_) {} }
    $('best').textContent = number(best);
    screen.hidden = false; $('screen-rules').hidden = true; $('result').hidden = false;
    $('screen-label').textContent = record ? 'NEW PERSONAL BEST / 新纪录' : 'ONE MORE ROUND?';
    $('screen-title').textContent = game.elapsed >= game.duration ? '漂亮收场。' : '再来一局。';
    $('screen-copy').textContent = game.elapsed >= game.duration ? '45 秒，你守住了自己的节奏。' : '先稳住节奏，再追求连击。';
    $('result').replaceChildren();
    for (const [label, value] of [['得分', number(game.score)], ['最高连击', game.maxCombo], ['精准命中', game.perfects]]) {
      const item = document.createElement('div'), name = document.createElement('span'), amount = document.createElement('b');
      name.textContent = label; amount.textContent = value; item.append(name, amount); $('result').append(item);
    }
    $('start').textContent = '再来一次 ↗'; $('screen-hint').textContent = '护盾共 5 格 · 提前乱按也会扣除护盾';
    announce(`本局结束，得分 ${game.score}，最高连击 ${game.maxCombo}。`); $('start').focus({ preventScroll: true });
  }
  function frame(time) {
    if (game.state !== 'playing') return;
    const dt = previousTime ? Math.min(100, time - previousTime) : 0; previousTime = time;
    game.advance(dt).forEach(feedback); renderNotes(); hud();
    if (game.state === 'over') finish(); else frameId = requestAnimationFrame(frame);
  }
  function play() {
    cancelAnimationFrame(frameId); previousTime = 0;
    if (game.state === 'paused') game.resume(); else game.start();
    screen.hidden = true; clearTimeout(feedbackTimer); $('feedback').textContent = ''; $('impacts').replaceChildren();
    fit(); hud(); stage.focus({ preventScroll: true }); frameId = requestAnimationFrame(frame);
    announce('游戏开始。黄色目标到线时反击，放过红色诱饵。');
  }
  function pause() {
    if (game.state !== 'playing') return;
    game.pause(); cancelAnimationFrame(frameId); previousTime = 0; hud();
    screen.hidden = false; $('screen-rules').hidden = true; $('result').hidden = true;
    $('screen-label').textContent = 'TAKE A BREATH'; $('screen-title').textContent = '暂停一下。';
    $('screen-copy').textContent = '时间与目标已暂停。准备好后继续。';
    $('start').textContent = '继续反击 ↗'; $('screen-hint').textContent = '按 P 或点击按钮继续';
    announce('游戏已暂停。'); $('start').focus({ preventScroll: true });
  }
  function hit(lane) {
    if (game.state !== 'playing') return;
    const result = game.hit(lane); feedback(result); renderNotes(); hud();
    lanes[lane].classList.add('pressed'); setTimeout(() => lanes[lane].classList.remove('pressed'), 100);
    if (game.state === 'over') finish();
  }
  function burst() { feedback(game.burst()); renderNotes(); hud(); }
  lanes.forEach((lane, i) => {
    lane.addEventListener('pointerdown', event => { if (event.button !== 0) return; event.preventDefault(); hit(i); stage.focus({ preventScroll: true }); });
    lane.addEventListener('click', event => { if (event.detail === 0) hit(i); });
  });
  $('start').addEventListener('click', play); $('pause').addEventListener('click', pause); $('burst').addEventListener('click', burst);
  document.addEventListener('keydown', event => {
    if (event.repeat || event.ctrlKey || event.metaKey || event.altKey || !document.querySelector('.arcade').contains(document.activeElement)) return;
    const key = event.key.toLowerCase();
    if (key === 'p' || key === 'escape') {
      if (game.state === 'playing') { event.preventDefault(); pause(); }
      else if (game.state === 'paused' && key === 'p') { event.preventDefault(); play(); }
      return;
    }
    if (game.state !== 'playing') return;
    const mapping = { a: 0, s: 1, d: 2, arrowleft: 0, arrowdown: 1, arrowright: 2 };
    if (key in mapping) { event.preventDefault(); hit(mapping[key]); }
    if (key === ' ' && document.activeElement !== $('pause')) { event.preventDefault(); burst(); }
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  window.addEventListener('blur', pause);
  fit(); hud();
})();
