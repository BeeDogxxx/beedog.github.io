const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const Engine = require('../js/one-more-engine.js');
const fixture = (trap = false) => {
  const game = new Engine(() => .4); game.start();
  game.notes = [{ id: 0, lane: 1, time: 1000, trap, done: false }];
  return game;
};
for (const offset of [-90, 0, 90]) {
  const game = fixture(); game.advance(1000 + offset);
  assert.equal(game.hit(1).type, 'perfect'); assert.equal(game.score, 100); assert.equal(game.charge, 1);
}
for (const offset of [-190, -91, 91, 190]) {
  const game = fixture(); game.advance(1000 + offset); assert.equal(game.hit(1).type, 'good');
}
{
  const game = fixture(); game.advance(809); assert.equal(game.hit(1).reason, 'empty');
  assert.equal(game.shield, 4); assert.equal(game.notes[0].done, false);
  assert.equal(game.hit(1), null); assert.equal(game.shield, 4); // Key spam cannot create extra hits.
  game.advance(382); assert.equal(game.shield, 3); assert.equal(game.notes[0].done, true);
}
{
  const game = fixture(true); game.advance(1000); assert.equal(game.hit(1).reason, 'trap');
  const safe = fixture(true); safe.advance(1500); assert.equal(safe.shield, 5);
}
{
  const game = fixture(); game.advance(850); game.pause(); game.advance(5000);
  assert.equal(game.elapsed, 850); assert.equal(game.hit(1), null);
  game.resume(); game.advance(150); assert.equal(game.hit(1).type, 'perfect');
  game.start(); assert.equal(game.elapsed, 0); assert.equal(game.score, 0); assert.equal(game.combo, 0);
}
{
  const game = fixture(); game.charge = 6;
  game.notes.push({ id: 1, lane: 2, time: 1500, trap: true, done: false }, { id: 2, lane: 0, time: 5000, trap: false, done: false });
  assert.equal(game.burst().count, 1); assert.equal(game.notes[1].done, true); assert.equal(game.notes[2].done, false);
  assert.equal(game.score, 80); assert.equal(game.charge, 0); assert.equal(game.burst(), null);
}
// Entire generated rounds can be completed perfectly: no conflicting traps or impossible same-lane chords.
for (let seed = 1; seed <= 100; seed++) {
  let state = seed;
  const game = new Engine(() => ((state = (state * 1664525 + 1013904223) >>> 0) / 4294967296));
  game.start();
  for (const note of game.notes) {
    game.advance(note.time - game.elapsed);
    if (!note.trap) assert.equal(game.hit(note.lane).type, 'perfect');
  }
  game.advance(game.duration - game.elapsed);
  assert.equal(game.state, 'over'); assert.equal(game.shield, 5); assert.equal(game.charge, 6);
  assert.equal(game.multiplier, 4); assert.equal(game.misses, 0);
}
// Minimal DOM harness tests actual controller events without a browser or screenshot automation.
class Element {
  constructor(id = '') { this.id = id; this.children = []; this.listeners = {}; this.style = {}; this.dataset = {}; this.hidden = false; this.textContent = ''; this.clientWidth = 720; this.clientHeight = 440;
    const set = new Set(); this.classList = { contains: x => set.has(x), add: x => set.add(x), remove: x => set.delete(x), toggle: (x, yes) => yes ? set.add(x) : set.delete(x) }; }
  addEventListener(type, fn) { this.listeners[type] = fn; }
  setAttribute(name, value) { this[name] = value; }
  append(...items) { items.forEach(item => { this.children.push(item); item.parent = this; }); }
  replaceChildren(...items) { this.children = []; this.append(...items); }
  remove() { if (this.parent) this.parent.children = this.parent.children.filter(x => x !== this); }
  focus() { document.activeElement = this; }
}
const elements = Object.fromEntries([...fs.readFileSync(require.resolve('../game.html'), 'utf8').matchAll(/id="(om-[^"]+)"/g)].map(m => [m[1], new Element(m[1])]));
elements['om-cells'].children = Array.from({ length: 6 }, () => new Element());
const lanes = Array.from({ length: 3 }, () => new Element());
const document = { activeElement: null, hidden: false, listeners: {}, documentElement: new Element(), body: new Element(),
  getElementById: id => elements[id], querySelectorAll: () => lanes, querySelector: () => ({ contains: el => el && el.id !== 'outside' }),
  createElement: () => new Element(), addEventListener(type, fn) { this.listeners[type] = fn; } };
let controlled;
const window = { OneMoreEngine: class extends Engine { constructor() { super(() => .4); controlled = this; } }, listeners: {},
  matchMedia: () => ({ matches: true }), addEventListener(type, fn) { this.listeners[type] = fn; } };
let nextFrame = 0; const frames = new Map();
vm.runInNewContext(fs.readFileSync(require.resolve('../js/one-more-game.js'), 'utf8'), { window, document, console,
  localStorage: { getItem() { throw Error('blocked'); }, setItem() { throw Error('blocked'); } },
  requestAnimationFrame(fn) { frames.set(++nextFrame, fn); return nextFrame; }, cancelAnimationFrame(id) { frames.delete(id); }, setTimeout: () => 1, clearTimeout() {} });
const click = id => elements['om-' + id].listeners.click({});
const key = (key, extra = {}) => document.listeners.keydown({ key, preventDefault() {}, ...extra });
click('start'); assert.equal(controlled.state, 'playing'); assert.equal(elements['om-screen'].hidden, true);
controlled.advance(controlled.notes[0].time); key('s'); assert.equal(controlled.score, 100);
key('s', { repeat: true }); assert.equal(controlled.shield, 5);
click('pause'); assert.equal(controlled.state, 'paused'); assert.equal(document.activeElement, elements['om-start']);
key('p'); assert.equal(controlled.state, 'playing'); assert.equal(elements['om-screen'].hidden, true);
window.listeners.blur(); assert.equal(controlled.state, 'paused'); click('start');
document.hidden = true; document.listeners.visibilitychange(); assert.equal(controlled.state, 'paused'); document.hidden = false; click('start');
document.activeElement = new Element('outside'); key('a'); assert.equal(controlled.shield, 5);
elements['om-stage'].focus(); controlled.charge = 6; key(' '); assert.equal(controlled.charge, 0);
controlled.shield = 1; controlled.advance(200); lanes[0].listeners.pointerdown({ button: 0, preventDefault() {} });
assert.equal(controlled.state, 'over'); assert.equal(elements['om-screen'].hidden, false); assert.equal(elements['om-result'].children.length, 3);
click('start'); assert.equal(controlled.state, 'playing'); assert.equal(controlled.score, 0); assert.equal(controlled.shield, 5);
assert.equal(frames.size, 1); // Repeated start/resume does not leave extra animation loops.
console.log('PASS: timing boundaries, traps, spam guard, burst range, pause/reset, 100 complete rounds, keyboard/touch, focus, blocked storage, one animation loop.');
