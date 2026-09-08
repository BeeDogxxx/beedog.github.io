/* Pure timing rules, shared by the browser and deterministic tests. */
(function (root) {
  'use strict';
  class OneMoreEngine {
    constructor(random = Math.random) {
      this.random = random;
      this.duration = 45000;
      this.travel = 1800;
      this.window = 190;
      this.perfectWindow = 90;
      this.state = 'ready';
      this.reset();
    }
    reset() {
      this.elapsed = 0; this.score = 0; this.shield = 5;
      this.combo = 0; this.maxCombo = 0; this.charge = 0;
      this.perfects = 0; this.goods = 0; this.misses = 0;
      this.notes = []; this.lastTap = [-Infinity, -Infinity, -Infinity];
    }
    start() {
      this.reset(); this.state = 'playing';
      let time = 2200, index = 0, previous = -1;
      while (time < this.duration - 500) {
        let lane = Math.floor(this.random() * 3);
        if (lane === previous && index % 3 === 0) lane = (lane + 1) % 3;
        const trap = index > 4 && index % 8 === 6;
        this.notes.push({ id: this.notes.length, lane, time, trap, done: false });
        if (time > 28000 && index % 9 === 0 && !trap) {
          this.notes.push({ id: this.notes.length, lane: (lane + 1) % 3, time, trap: false, done: false });
        }
        previous = lane; index++;
        time += (time < 14000 ? 870 : time < 28000 ? 700 : 560) + this.random() * 100;
      }
    }
    get multiplier() { return Math.min(4, 1 + Math.floor(this.combo / 8)); }
    pause() { if (this.state === 'playing') this.state = 'paused'; }
    resume() { if (this.state === 'paused') this.state = 'playing'; }
    damage(reason) {
      this.shield = Math.max(0, this.shield - 1); this.combo = 0; this.misses++;
      if (!this.shield) this.state = 'over';
      return { type: 'miss', reason };
    }
    advance(ms) {
      if (this.state !== 'playing' || !Number.isFinite(ms) || ms < 0) return [];
      this.elapsed = Math.min(this.duration, this.elapsed + ms);
      const events = [];
      for (const note of this.notes) {
        if (!note.done && this.elapsed > note.time + this.window) {
          note.done = true;
          if (!note.trap) events.push({ ...this.damage('late'), lane: note.lane });
          if (this.state === 'over') break;
        }
      }
      if (this.elapsed >= this.duration) this.state = 'over';
      return events;
    }
    hit(lane) {
      if (this.state !== 'playing' || !Number.isInteger(lane) || lane < 0 || lane > 2) return null;
      if (this.elapsed - this.lastTap[lane] < 120) return null;
      this.lastTap[lane] = this.elapsed;
      const note = this.notes.filter(n => !n.done && n.lane === lane && Math.abs(n.time - this.elapsed) <= this.window)
        .sort((a, b) => Math.abs(a.time - this.elapsed) - Math.abs(b.time - this.elapsed))[0];
      if (!note) return { ...this.damage('empty'), lane };
      note.done = true;
      if (note.trap) return { ...this.damage('trap'), lane };
      const perfect = Math.abs(note.time - this.elapsed) <= this.perfectWindow;
      const gain = (perfect ? 100 : 60) * this.multiplier;
      this.score += gain; this.combo++; this.maxCombo = Math.max(this.maxCombo, this.combo);
      if (perfect) { this.perfects++; this.charge = Math.min(6, this.charge + 1); }
      else this.goods++;
      return { type: perfect ? 'perfect' : 'good', gain, lane };
    }
    burst() {
      if (this.state !== 'playing' || this.charge < 6) return null;
      this.charge = 0;
      let count = 0;
      for (const note of this.notes) {
        if (!note.done && note.time - this.elapsed <= this.travel && note.time >= this.elapsed - this.window) {
          note.done = true;
          if (!note.trap) { this.score += 80 * this.multiplier; this.combo++; count++; }
        }
      }
      this.maxCombo = Math.max(this.maxCombo, this.combo);
      return { type: 'burst', count };
    }
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = OneMoreEngine;
  else root.OneMoreEngine = OneMoreEngine;
})(globalThis);
