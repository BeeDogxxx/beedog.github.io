const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const code = fs.readFileSync(require.resolve('../js/editorial-motion.js'), 'utf8');
function setup({ reduced = false, disabled = false, support = true } = {}) {
  const element = () => { const classes = new Set(); return { classes, style: { setProperty() {} }, classList: { contains: x => classes.has(x), add: x => classes.add(x), remove: x => classes.delete(x) }, listeners: {}, addEventListener(k, fn) { this.listeners[k] = fn; }, removeEventListener(k) { delete this.listeners[k]; } }; };
  const body = element(), items = [element(), element()];
  items.forEach(item => { item.parentElement = { children: items }; });
  if (disabled) body.classes.add('motion-off');
  let intersection, mutation, changes, observes = 0, disconnected = false;
  class IO { constructor(cb) { intersection = cb; } observe() { observes++; } unobserve() {} disconnect() { disconnected = true; } }
  class MO { constructor(cb) { mutation = cb; } observe() {} disconnect() {} }
  const preference = { matches: reduced, addEventListener(_, cb) { changes = cb; } };
  vm.runInNewContext(code, { window: { ...(support ? { IntersectionObserver: IO } : {}), addEventListener() {} }, document: { body, querySelectorAll: () => items }, matchMedia: () => preference, IntersectionObserver: IO, MutationObserver: MO });
  return { items, body, preference, enter: () => intersection(items.map(target => ({ target, isIntersecting: true }))), off: () => { body.classes.add('motion-off'); mutation(); }, reduce: () => { preference.matches = true; changes(); }, observes, disconnected: () => disconnected };
}
for (const config of [{ reduced: true }, { disabled: true }, { support: false }]) assert.equal(setup(config).observes, 0);
const test = setup(); assert.equal(test.observes, 2);
test.enter(); assert(test.items.every(x => x.classes.has('editorial-enter')));
for (const item of test.items) item.listeners.animationend({ target: item, animationName: 'editorial-enter' });
test.enter(); assert(test.items.every(x => !x.classes.has('editorial-enter')));
const off = setup(); off.enter(); off.off(); assert(off.disconnected()); assert(off.items.every(x => !x.classes.has('editorial-enter')));
const reduce = setup(); reduce.enter(); reduce.reduce(); assert(reduce.disconnected());
console.log('PASS: entrance only once, no-observer fallback, saved motion off, live toggle and reduced-motion cancellation.');
