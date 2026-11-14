(function () {
  'use strict';
  const cvs = document.getElementById('c'), ctx = cvs.getContext('2d');
  const buf = document.createElement('canvas');
  buf.width = 160; buf.height = 144;
  const b = buf.getContext('2d');
  let S = 4;
  const coarse = matchMedia('(pointer: coarse)').matches;
  function resize() {
    S = Math.max(2, Math.floor(Math.min(innerWidth / 160, (innerHeight - (coarse ? 200 : 60)) / 144)));
    cvs.width = 160 * S; cvs.height = 144 * S;
  }
  addEventListener('resize', resize);
  resize();
  ART.init();

  const INK = '#20202c', PAPER = '#f8f8ee', FONT = '"Press Start 2P",ui-monospace,Menlo,monospace';
  const DV = { u: [0, -1], d: [0, 1], l: [-1, 0], r: [1, 0] }, OPP = { u: 'd', d: 'u', l: 'r', r: 'l' };
  const MV = 9, SAVE = 'frierenJourneyNorthS1';
  const ENDING = [
    { card: 'The journey north continues.' },
    '*Frieren, Fern and Stark leave the magic city behind and walk on toward Ende, the land where souls rest.',
    '*Somewhere far ahead, an old friend is waiting to be told: I got to know people a little better.',
    { card: 'Thank you for playing!\n\nSeason 1 complete' },
    { card: 'Unofficial fan game\n\nFrieren: Beyond Journey\'s End\nis created by Kanehito Yamada\nand Tsukasa Abe' },
  ];

  const TRACKS = {
    title: { ms: 260, root: 262, m: [0, null, 7, null, 12, null, 11, 7, 9, null, 5, null, 7, null, null, null, 0, null, 7, null, 12, null, 14, 12, 11, null, 7, null, 9, null, null, null], bs: [0, 0, 5, 7, 0, 0, 7, 5] },
    field: { ms: 200, root: 294, m: [0, null, 4, 7, 12, null, 7, 4, 5, null, 9, 12, 9, null, 7, null, 0, null, 4, 7, 11, null, 7, 4, 2, null, 5, 9, 7, null, null, null], bs: [0, 0, 5, 5, 0, 0, 7, 7] },
    town: { ms: 230, root: 330, m: [7, null, 4, null, 0, 4, 7, null, 9, null, 5, null, 0, 5, 9, null, 7, null, 2, null, -1, 2, 7, null, 5, 4, 2, null, 0, null, null, null], bs: [0, 0, 5, 5, 7, 7, 0, 0] },
    snow: { ms: 300, root: 247, m: [0, null, null, 3, 7, null, null, 3, 5, null, null, 8, 7, null, null, null, 0, null, null, 3, 10, null, null, 7, 8, null, 7, null, 3, null, null, null], bs: [0, 0, -4, -4, 5, 5, 0, 0] },
    cave: { ms: 280, root: 196, m: [0, null, 3, null, 6, null, 3, null, 0, null, 3, null, 7, null, 6, null, 0, null, 3, null, 6, null, 10, null, 9, null, 6, null, 3, null, null, null], bs: [0, 0, 0, 0, -2, -2, -2, -2] },
    battle: { ms: 130, root: 220, m: [0, 0, 3, 0, 7, 0, 3, 5, -2, -2, 2, -2, 5, -2, 2, 3, 0, 0, 3, 0, 7, 0, 10, 12, 8, 7, 5, 3, 2, null, 3, null], bs: [0, 0, -2, -2, 0, 0, -4, -5] },
    boss: { ms: 115, root: 196, m: [0, null, 0, 3, null, 0, 6, 7, 0, null, 0, 3, null, 10, 8, 7, 0, null, 0, 3, null, 0, 6, 7, 12, 10, 8, 7, 6, 3, 2, null], bs: [0, 0, 0, 0, -4, -4, -2, -2] },
  };

  const AU = {
    ac: null, mute: false, cur: null, want: 'title', timer: null, step: 0, file: null, fileOK: false, started: false,
    init() {
      if (this.started) return;
      this.started = true;
      try { this.ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (err) { this.ac = null; }
      try {
        const a = new Audio('audio/music.mp3');
        a.loop = true; a.volume = 0.5;
        a.addEventListener('error', () => { this.fileOK = false; this.file = null; });
        a.play().then(() => { this.fileOK = true; clearInterval(this.timer); this.timer = null; }).catch(() => { this.fileOK = false; });
        this.file = a;
      } catch (err) { this.file = null; }
      this.cur = null;
      this.play(this.want);
    },
    tone(f, d, v, type) {
      if (!this.ac || this.mute) return;
      const o = this.ac.createOscillator(), g = this.ac.createGain(), t = this.ac.currentTime;
      o.type = type || 'square'; o.frequency.value = f;
      g.gain.setValueAtTime(v || 0.04, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(g); g.connect(this.ac.destination); o.start(t); o.stop(t + d);
    },
    sfx(n) {
      const s = { blip: [[880, 0.04]], ok: [[660, 0.05], [990, 0.08]], bump: [[110, 0.08]], hit: [[170, 0.12], [120, 0.1]], heal: [[523, 0.08], [784, 0.14]], win: [[523, 0.1], [659, 0.1], [784, 0.1], [1047, 0.3]] }[n] || [];
      s.forEach(([f, d], i) => setTimeout(() => this.tone(f, d, 0.05), i * 90));
    },
    play(name) {
      this.want = name;
      if (!this.started || this.cur === name) return;
      this.cur = name; clearInterval(this.timer); this.timer = null; this.step = 0;
      const tr = TRACKS[name];
      if (!tr || !this.ac) return;
      this.timer = setInterval(() => {
        if (this.fileOK) return;
        const n = tr.m[this.step % tr.m.length];
        if (n !== null) this.tone(tr.root * Math.pow(2, n / 12), 0.2, 0.028);
        if (this.step % 4 === 0) this.tone(tr.root / 2 * Math.pow(2, tr.bs[(this.step / 4 | 0) % tr.bs.length] / 12), 0.34, 0.04, 'triangle');
        this.step++;
      }, tr.ms);
    },
    toggle() {
      this.mute = !this.mute;
      if (this.file) { if (this.mute) this.file.pause(); else this.file.play().catch(() => {}); }
    },
  };

  const G = { t: 0, mode: 'title', sel: 0, lv: 1, xp: 0, herbs: 2, unlocked: 0, cur: 0, flags: {}, party: ['frieren'], extra: [], fol: [], dlg: null, bat: null, fx: null, map: null, p: null, back: 'title' };
  function save() { try { localStorage.setItem(SAVE, JSON.stringify({ lv: G.lv, xp: G.xp, herbs: G.herbs, unlocked: G.unlocked, cur: G.cur })); } catch (err) { return; } }
  let hasSave = false;
  try { const d = JSON.parse(localStorage.getItem(SAVE)); if (d) { Object.assign(G, d); hasSave = true; } } catch (err) { hasSave = false; }
  if (/unlock/.test(location.search)) G.unlocked = LEVELS.length - 1;

  const F = (k) => Boolean(G.flags[k]);
  const has = (n) => !n || (Array.isArray(n) ? n.every(F) : F(n));
  const vis = (e) => has(e.show) && !(e.hide && F(e.hide));
  function objective() {
    const D = LEVELS[G.cur];
    for (const [k, t] of D.steps || []) if (!F(k)) return t;
    return D.exitHint || 'Follow the road onward';
  }

  function font(sz) { ctx.font = `${Math.round(sz * S)}px ${FONT}`; ctx.textBaseline = 'top'; }
  function text(t, x, y, col, sz, align) { font(sz || 5); ctx.fillStyle = col || INK; ctx.textAlign = align || 'left'; ctx.fillText(t, x * S, y * S); }
  function box(x, y, w, h, fill) {
    ctx.fillStyle = INK; ctx.fillRect(x * S, y * S, w * S, h * S);
    ctx.fillStyle = fill || PAPER; ctx.fillRect((x + 1) * S, (y + 1) * S, (w - 2) * S, (h - 2) * S);
    ctx.strokeStyle = INK; ctx.lineWidth = Math.max(1, S / 2);
    ctx.strokeRect((x + 2.25) * S, (y + 2.25) * S, (w - 4.5) * S, (h - 4.5) * S);
  }
  function wrap(t, sz, w) {
    font(sz);
    const out = [];
    for (const para of String(t).split('\n')) {
      let line = '';
      for (const word of para.split(' ')) {
        const trial = line ? line + ' ' + word : word;
        if (ctx.measureText(trial).width > w * S && line) { out.push(line); line = word; } else line = trial;
      }
      out.push(line);
    }
    return out;
  }
  function typed(lines, n, x, y, col, sz, lh) {
    let left = Math.floor(n);
    lines.forEach((l, i) => { if (left <= 0) return; text(l.slice(0, left), x, y + i * lh, col, sz); left -= l.length; });
  }

  function say(items, then) {
    if (!items || !items.length) { if (then) then(); return; }
    G.dlg = { items: items.slice(), i: -1, then };
    nextItem();
  }
  function nextItem() {
    const d = G.dlg;
    d.i++;
    while (d.i < d.items.length && d.items[d.i].fx !== undefined) { G.fx = d.items[d.i].fx; d.i++; }
    if (d.i >= d.items.length) { G.dlg = null; G.fx = null; if (d.then) d.then(); return; }
    const it = d.items[d.i];
    if (it.card) { d.card = it.card; return; }
    d.card = null;
    let name = '', txt = it;
    const m = /^([A-Z][^:]{0,17}): ([\s\S]*)$/.exec(it);
    if (it[0] === '*') txt = it.slice(1); else if (m) { name = m[1]; txt = m[2]; }
    d.name = name; d.narr = it[0] === '*';
    const ls = wrap(txt, 5, 144);
    d.pages = [];
    for (let k = 0; k < ls.length; k += 4) d.pages.push(ls.slice(k, k + 4));
    d.pg = 0; d.ch = 0;
  }
  function dlgNext() {
    const d = G.dlg;
    AU.sfx('blip');
    if (d.card) { nextItem(); return; }
    const len = d.pages[d.pg].join('').length;
    if (d.ch < len) d.ch = len;
    else if (d.pg < d.pages.length - 1) { d.pg++; d.ch = 0; } else nextItem();
  }

  function rebuildFollowers() {
    const ids = G.party.slice(1).concat(G.extra), old = G.fol, p = G.p;
    G.fol = ids.map((id) => old.find((f) => f.id === id) || { id, x: p.x, y: p.y, dir: p.dir });
  }

  function loadLevel(i) {
    const D = LEVELS[i];
    G.cur = i; G.lv = Math.max(G.lv, i + 1); G.flags = {}; G.party = D.party.slice(); G.extra = (D.followers || []).slice();
    const w = Math.max(...D.map.map((r) => r.length)), h = D.map.length, grid = [], ents = [];
    let sx = 1, sy = 1;
    for (let y = 0; y < h; y++) {
      grid.push([]);
      for (let x = 0; x < w; x++) {
        let ch = D.map[y][x] || D.pad || D.map[0][0];
        if (ch === '@') { sx = x; sy = y; ch = D.base; } else if (D.ents[ch]) { const e = Object.assign({}, D.ents[ch], { x, y, k: ch }); ents.push(e); ch = e.on || D.base; }
        grid[y].push(ch);
      }
    }
    G.map = { w, h, grid, ents, D };
    G.p = { x: sx, y: sy, dir: D.face || 'd', mv: null };
    G.fol = []; rebuildFollowers();
    G.mode = 'map'; G.fx = null; G.bat = null;
    save();
    AU.play(D.music || 'field');
    say([{ card: `Chapter ${i + 1}\n\n${D.title}\n\n${D.ep}` }].concat(D.intro || []));
  }

  function finishLevel() {
    const D = LEVELS[G.cur];
    say(D.outro || [], () => {
      const n = G.cur + 1;
      if (n >= LEVELS.length) {
        G.unlocked = LEVELS.length - 1; save();
        say(ENDING, () => { G.mode = 'title'; G.sel = 0; AU.play('title'); });
        return;
      }
      G.unlocked = Math.max(G.unlocked, n);
      loadLevel(n);
    });
  }

  function trigger(e) {
    if (e.exit) {
      const D = LEVELS[G.cur];
      if (!D.goal || F(D.goal)) finishLevel(); else say(['*Not yet. ' + objective() + '.']);
      return;
    }
    if (e.need && !has(e.need)) { if (e.pre) say(e.pre); else if (!e.step) say(['...']); return; }
    if (e.set && F(e.set)) { if (e.next) trigger(e.next); else if (e.after) say(e.after); return; }
    const fin = () => {
      if (e.set) G.flags[e.set] = true;
      if (e.herb) G.herbs += e.herb;
      if (e.join) e.join.forEach((id) => { if (!G.party.includes(id)) G.party.push(id); });
      if (e.leave) G.party = G.party.filter((id) => !e.leave.includes(id));
      if (e.fol) G.extra = e.fol.slice();
      if (e.tp) { const t = G.map.ents.find((o) => o.k === e.tp); if (t) { G.p.x = t.x; G.p.y = t.y; G.p.mv = null; G.fol = []; } }
      rebuildFollowers();
      AU.sfx('ok');
    };
    const afterSay = () => {
      if (e.battle) startBattle(e.battle, e.bparty || G.party, () => say(e.win || [], fin), false);
      else fin();
    };
    say(e.say || [], afterSay);
  }

  function solidAt(x, y) {
    const M = G.map;
    if (x < 0 || y < 0 || x >= M.w || y >= M.h) return true;
    if (SOLID.includes(M.grid[y][x])) return true;
    return M.ents.some((e) => e.x === x && e.y === y && !e.step && !e.spot && vis(e));
  }

  function tryMove(dir) {
    const p = G.p;
    p.dir = dir;
    const nx = p.x + DV[dir][0], ny = p.y + DV[dir][1];
    if (solidAt(nx, ny)) return;
    let px = p.x, py = p.y;
    for (const f of G.fol) {
      const ox = f.x, oy = f.y;
      f.fx = ox; f.fy = oy;
      if (px !== ox || py !== oy) f.dir = px > ox ? 'r' : px < ox ? 'l' : py > oy ? 'd' : 'u';
      f.x = px; f.y = py; px = ox; py = oy;
    }
    p.fx = p.x; p.fy = p.y; p.x = nx; p.y = ny; p.mv = 0;
  }

  function arrive() {
    const M = G.map, p = G.p;
    const e = M.ents.find((o) => o.x === p.x && o.y === p.y && o.step && vis(o));
    if (e) { trigger(e); if (G.dlg || G.bat) return; }
    const D = M.D;
    if (M.grid[p.y][p.x] === ':' && D.wild && Math.random() < (D.rate || 0.13)) {
      startBattle(D.wild[Math.floor(Math.random() * D.wild.length)], G.party, null, true);
    }
  }

  function interact() {
    const p = G.p, x = p.x + DV[p.dir][0], y = p.y + DV[p.dir][1];
    const e = G.map.ents.find((o) => o.x === x && o.y === y && !o.step && !o.spot && vis(o));
    if (!e) return;
    e.dir = OPP[p.dir];
    AU.sfx('blip');
    trigger(e);
  }

  function startBattle(eid, party, cb, wild) {
    const st = mkBattle(eid, party, G.lv, G.herbs);
    G.bat = { st, eid, party, cb, wild, q: [], hi: -1, sel: 0, phase: 'msg', shake: 0, flash: 0, fade: 1, cur: null, end: null, menu: [] };
    G.bat.q.push({ t: st.e.intro || `${st.e.name} appears!` });
    if (st.e.tip) G.bat.q.push({ t: st.e.tip });
    AU.play(wild ? 'battle' : 'boss');
    advMsg();
  }
  function advMsg() {
    const B = G.bat;
    if (!B.q.length) { B.cur = null; afterMsgs(); return; }
    B.cur = Object.assign({ ch: 0, wait: 0 }, B.q.shift());
    if (B.cur.fx === 'e') { B.shake = 18; AU.sfx('hit'); }
    if (B.cur.fx === 'h') { B.flash = 18; AU.sfx('hit'); }
    if (B.cur.fx === 'heal') AU.sfx('heal');
  }
  function endBattle(won) {
    const B = G.bat;
    G.herbs = B.st.herbs; G.bat = null;
    AU.play(LEVELS[G.cur].music || 'field');
    save();
    if (won && B.cb) B.cb();
  }
  function afterMsgs() {
    const B = G.bat, st = B.st;
    if (B.end === 'win') { endBattle(true); return; }
    if (B.end === 'run') { endBattle(false); return; }
    if (B.end === 'lose') { startBattle(B.eid, B.party, B.cb, B.wild); return; }
    const o = outcome(st);
    if (o === 'win') {
      B.end = 'win'; AU.sfx('win');
      B.q.push({ t: st.e.resist === 0 || st.e.unlock ? 'It is settled!' : `${st.e.name} is defeated!` });
      G.xp += st.e.xp;
      while (G.xp >= xpNeed(G.lv) && G.lv < 40) {
        G.xp -= xpNeed(G.lv); G.lv++;
        B.q.push({ t: `The party grew to level ${G.lv}!` });
        G.party.forEach((id) => HEROES[id].learn.forEach(([lv, mv]) => { if (lv === G.lv) B.q.push({ t: `${HEROES[id].name} learned ${MOVES[mv].name}!` }); }));
      }
      advMsg(); return;
    }
    if (o === 'lose') {
      B.end = 'lose';
      B.q.push({ t: 'The party is overwhelmed...' }, { t: 'But the journey does not end here. Catch your breath and try again.' });
      advMsg(); return;
    }
    let n = B.hi + 1;
    while (n < st.hs.length && st.hs[n].hp <= 0) n++;
    if (n < st.hs.length) {
      B.hi = n; B.phase = 'choose'; B.sel = 0;
      B.menu = heroMoves(st, n).concat(B.wild ? ['run'] : []);
    } else {
      B.hi = -1; B.phase = 'msg';
      enemyAct(st).forEach((m) => B.q.push(m));
      advMsg();
    }
  }
  function batInput(a) {
    const B = G.bat;
    if (B.phase === 'msg' || B.cur) {
      if (a !== 'ok' && a !== 'back') return;
      if (!B.cur) return;
      if (B.cur.ch < B.cur.t.length) B.cur.ch = B.cur.t.length; else advMsg();
      return;
    }
    const n = B.menu.length;
    if (a === 'up' && B.sel >= 2) B.sel -= 2;
    else if (a === 'down' && B.sel + 2 < n) B.sel += 2;
    else if (a === 'left' && B.sel % 2 === 1) B.sel--;
    else if (a === 'right' && B.sel % 2 === 0 && B.sel + 1 < n) B.sel++;
    else if (a === 'ok') {
      const mid = B.menu[B.sel], h = B.st.hs[B.hi];
      if (mid === 'run') { B.end = 'run'; B.phase = 'msg'; B.q.push({ t: 'The party slips away safely.' }); advMsg(); return; }
      if (MOVES[mid].mp > h.mp) { AU.sfx('bump'); return; }
      AU.sfx('ok');
      B.phase = 'msg';
      heroAct(B.st, B.hi, mid).forEach((m) => B.q.push(m));
      advMsg();
      return;
    } else return;
    AU.sfx('blip');
  }

  const TITLE_OPTS = ['New Game', 'Continue', 'Chapters'], PAUSE_OPTS = ['Resume', 'Chapters', 'Title Screen'];
  function handle(a) {
    if (G.dlg) { if (a === 'ok' || a === 'back') dlgNext(); return; }
    if (G.bat) { batInput(a); return; }
    if (G.mode === 'title' || G.mode === 'pause') {
      const opts = G.mode === 'title' ? TITLE_OPTS : PAUSE_OPTS;
      if (a === 'up') { G.sel = (G.sel + opts.length - 1) % opts.length; AU.sfx('blip'); }
      if (a === 'down') { G.sel = (G.sel + 1) % opts.length; AU.sfx('blip'); }
      if (a === 'back' && G.mode === 'pause') G.mode = 'map';
      if (a !== 'ok') return;
      AU.sfx('ok');
      const pick = opts[G.sel];
      if (pick === 'New Game') { G.lv = 1; G.xp = 0; G.herbs = 2; loadLevel(0); }
      else if (pick === 'Continue') loadLevel(hasSave ? Math.min(G.cur, LEVELS.length - 1) : 0);
      else if (pick === 'Chapters') { G.back = G.mode; G.mode = 'chapters'; G.sel = Math.min(G.cur, G.unlocked); }
      else if (pick === 'Resume') G.mode = 'map';
      else if (pick === 'Title Screen') { G.mode = 'title'; G.sel = 0; hasSave = true; AU.play('title'); }
      return;
    }
    if (G.mode === 'chapters') {
      if (a === 'up' && G.sel > 0) { G.sel--; AU.sfx('blip'); }
      if (a === 'down' && G.sel < LEVELS.length - 1) { G.sel++; AU.sfx('blip'); }
      if (a === 'back') { G.mode = G.back; G.sel = 0; }
      if (a === 'ok') { if (G.sel <= G.unlocked) { AU.sfx('ok'); loadLevel(G.sel); } else AU.sfx('bump'); }
      return;
    }
    if (G.mode === 'map') {
      if (a === 'back') { G.mode = 'pause'; G.sel = 0; AU.sfx('blip'); }
      if (a === 'ok' && G.p.mv === null) interact();
    }
  }

  function update() {
    if (G.dlg) { if (!G.dlg.card) G.dlg.ch += 0.9; return; }
    const B = G.bat;
    if (B) {
      if (B.shake > 0) B.shake--;
      if (B.flash > 0) B.flash--;
      if (B.st.e.hp <= 0 && B.fade > 0) B.fade -= 0.04;
      if (B.cur) {
        if (B.cur.ch < B.cur.t.length) B.cur.ch += 1.1;
        else if (++B.cur.wait > 100) advMsg();
      }
      return;
    }
    if (G.mode !== 'map') return;
    const p = G.p;
    if (p.mv !== null) {
      p.mv++;
      if (p.mv >= MV) { p.mv = null; G.fol.forEach((f) => { f.fx = f.x; f.fy = f.y; }); arrive(); }
      return;
    }
    const dir = held.up ? 'u' : held.down ? 'd' : held.left ? 'l' : held.right ? 'r' : null;
    if (dir) tryMove(dir);
  }

  function spriteOf(id) { return ART.spr[id] || null; }
  function drawActors(list, y) {
    const x0 = 80 - list.length * 10;
    list.forEach((id, i) => { const s = spriteOf(id); if (s) b.drawImage(s.u, x0 + i * 20, y); });
  }
  function drawScene(kind) {
    const cast = [G.party[0]].concat(G.fol.map((f) => f.id));
    if (kind === 'meteor') {
      b.fillStyle = '#0c1030'; b.fillRect(0, 0, 160, 144);
      for (let i = 0; i < 46; i++) { b.fillStyle = (i + (G.t >> 4)) % 5 ? '#c8d0f0' : '#ffffff'; b.fillRect(i * 37 % 160, i * 53 % 96, 1, 1); }
      for (let i = 0; i < 8; i++) {
        const k = (G.t * 2.4 + i * 61) % 260, x = 210 - k - (i * 23) % 60, y = -30 + k * 0.5 + (i * 17) % 40;
        for (let j = 0; j < 12; j++) { b.globalAlpha = 1 - j / 12; b.fillStyle = '#e8f0ff'; b.fillRect(x + j, y - j * 0.5, 1, 1); }
        b.globalAlpha = 1;
      }
      b.fillStyle = '#14301c'; b.beginPath(); b.ellipse(80, 140, 130, 54, 0, 0, 7); b.fill();
      drawActors(cast, 74);
    } else if (kind === 'sunrise') {
      const bands = ['#f8a060', '#f8b870', '#f8d088', '#f8e4a8'];
      bands.forEach((c, i) => { b.fillStyle = c; b.fillRect(0, i * 14, 160, 14); });
      b.fillStyle = '#fff6c8'; b.beginPath(); b.arc(80, 56 - Math.min(24, G.dlg ? G.dlg.i * 4 : 0), 15, 0, 7); b.fill();
      b.fillStyle = '#3c6cb4'; b.fillRect(0, 56, 160, 30);
      for (let i = 0; i < 14; i++) { b.fillStyle = '#f8e4a8'; b.fillRect(66 + (i * 13 + (G.t >> 3)) % 28, 58 + i * 2, 6 - i % 3, 1); }
      b.fillStyle = '#e8d8a0'; b.fillRect(0, 86, 160, 58);
      drawActors(cast, 76);
    }
  }

  function drawMap() {
    const M = G.map, p = G.p, D = M.D;
    if (G.fx === 'meteor' || G.fx === 'sunrise') { drawScene(G.fx); return; }
    const t = p.mv === null ? 1 : p.mv / MV;
    const lerp = (a, c) => (a + (c - a) * t) * 16;
    const ppx = p.mv === null ? p.x * 16 : lerp(p.fx, p.x), ppy = p.mv === null ? p.y * 16 : lerp(p.fy, p.y);
    const mw = M.w * 16, mh = M.h * 16;
    const cx = mw <= 160 ? Math.floor((mw - 160) / 2) : Math.max(0, Math.min(mw - 160, Math.round(ppx + 8 - 80)));
    const cy = mh <= 144 ? Math.floor((mh - 144) / 2) : Math.max(0, Math.min(mh - 144, Math.round(ppy + 8 - 72)));
    b.fillStyle = '#14141c'; b.fillRect(0, 0, 160, 144);
    const fr = (G.t >> 5) & 1, base = ART.tiles[D.base];
    for (let y = Math.max(0, cy >> 4); y <= Math.min(M.h - 1, (cy + 143) >> 4); y++) {
      for (let x = Math.max(0, cx >> 4); x <= Math.min(M.w - 1, (cx + 159) >> 4); x++) {
        const ch = M.grid[y][x], tl = ART.tiles[ch] || base;
        if (ART.over[ch]) b.drawImage(base[fr], x * 16 - cx, y * 16 - cy);
        b.drawImage(tl[fr], x * 16 - cx, y * 16 - cy);
      }
    }
    const draws = [];
    M.ents.forEach((e) => {
      if (!vis(e)) return;
      if (e.exit) {
        const bob = (G.t >> 4) & 1, ax = e.x * 16 - cx + 4, ay = e.y * 16 - cy + 3 + bob;
        b.fillStyle = INK; b.fillRect(ax + 2, ay, 4, 1); b.fillRect(ax + 1, ay + 1, 6, 1); b.fillRect(ax, ay + 2, 8, 2); b.fillRect(ax + 2, ay + 4, 4, 5);
        b.fillStyle = '#f8e070'; b.fillRect(ax + 3, ay + 1, 2, 1); b.fillRect(ax + 2, ay + 2, 4, 1); b.fillRect(ax + 3, ay + 3, 2, 5);
        return;
      }
      const s = spriteOf(e.spr2 && e.set && F(e.set) ? e.spr2 : e.spr);
      if (s) draws.push({ y: e.y * 16, img: s[e.dir || 'd'], x: e.x * 16 });
    });
    const walking = p.mv !== null, bob = walking && (p.mv >> 2) & 1 ? 1 : 0;
    G.fol.slice().reverse().forEach((f) => {
      const s = spriteOf(f.id);
      if (!s) return;
      const fx = walking && f.fx !== undefined ? lerp(f.fx, f.x) : f.x * 16, fy = walking && f.fy !== undefined ? lerp(f.fy, f.y) : f.y * 16;
      if (!walking && f.x === p.x && f.y === p.y) return;
      draws.push({ y: fy - 0.1, img: s[f.dir || 'd'], x: fx, bob });
    });
    const ps = spriteOf(G.party[0]);
    if (ps) draws.push({ y: ppy, img: ps[p.dir], x: ppx, bob });
    draws.sort((a, c) => a.y - c.y);
    draws.forEach((d) => b.drawImage(d.img, Math.round(d.x - cx), Math.round(d.y - cy - 3 - (d.bob || 0))));
    if (D.weather === 'snow') { b.fillStyle = '#ffffff'; for (let i = 0; i < 44; i++) b.fillRect((i * 41 + G.t * 0.5 + Math.sin((G.t + i * 30) / 40) * 6 + 320) % 160, (i * 29 + G.t * (0.8 + (i % 3) * 0.4)) % 144, 1 + (i % 2), 1 + (i % 2)); }
    if (D.weather === 'mist') { b.fillStyle = 'rgba(232,236,246,0.36)'; b.fillRect(0, 0, 160, 144); }
    if (D.weather === 'dark') { b.fillStyle = 'rgba(0,0,16,0.3)'; b.fillRect(0, 0, 160, 144); }
    if (G.fx === 'flash') { b.fillStyle = 'rgba(130,96,40,0.4)'; b.fillRect(0, 0, 160, 144); b.fillStyle = '#101018'; b.fillRect(0, 0, 160, 10); b.fillRect(0, 134, 160, 10); }
    if (G.fx === 'night') { b.fillStyle = 'rgba(10,14,60,0.5)'; b.fillRect(0, 0, 160, 144); }
  }

  function drawBattle() {
    const B = G.bat, st = B.st, e = st.e, D = LEVELS[G.cur];
    b.fillStyle = D.bbg || '#dfeccf'; b.fillRect(0, 0, 160, 144);
    b.fillStyle = 'rgba(0,0,0,0.12)';
    b.beginPath(); b.ellipse(124, 66, 34, 8, 0, 0, 7); b.fill();
    b.beginPath(); b.ellipse(50, 90, 48, 7, 0, 0, 7); b.fill();
    const es = spriteOf(e.spr) || ART.spr.beast;
    b.imageSmoothingEnabled = false;
    b.globalAlpha = e.hp > 0 ? 1 : Math.max(0, B.fade);
    b.drawImage(es.d, 92 + (B.shake > 0 ? Math.sin(G.t * 1.7) * 3 : 0), 4, 64, 64);
    b.globalAlpha = 1;
    st.hs.forEach((h, i) => {
      const x = 4 + i * 23, act = B.phase === 'choose' && !B.cur && B.hi === i, s = spriteOf(h.id);
      if (!(B.flash > 0 && (G.t >> 2) & 1) && s) { b.globalAlpha = h.hp > 0 ? 1 : 0.3; b.drawImage(s.u, x, 56 - (act && G.t % 30 < 15 ? 2 : 0), 32, 32); b.globalAlpha = 1; }
      b.fillStyle = INK; b.fillRect(x + 5, 89, 22, 4); b.fillRect(x + 5, 93, 22, 3);
      b.fillStyle = '#d8d8d0'; b.fillRect(x + 6, 90, 20, 2); b.fillRect(x + 6, 93, 20, 2);
      b.fillStyle = h.hp / h.max > 0.5 ? '#4cb450' : h.hp / h.max > 0.2 ? '#e8b430' : '#d84040'; b.fillRect(x + 6, 90, Math.ceil(20 * h.hp / h.max), 2);
      b.fillStyle = '#4c8ce8'; b.fillRect(x + 6, 93, Math.ceil(20 * h.mp / Math.max(1, h.maxmp)), 2);
    });
  }
  function drawBattleUI() {
    const B = G.bat, st = B.st, e = st.e;
    box(3, 4, 84, 20);
    text(e.name, 8, 8, INK, 5);
    ctx.fillStyle = INK; ctx.fillRect(8 * S, 16 * S, 74 * S, 4 * S);
    ctx.fillStyle = '#d8d8d0'; ctx.fillRect(9 * S, 17 * S, 72 * S, 2 * S);
    ctx.fillStyle = e.hp / e.max > 0.5 ? '#4cb450' : e.hp / e.max > 0.2 ? '#e8b430' : '#d84040'; ctx.fillRect(9 * S, 17 * S, Math.ceil(72 * e.hp / e.max) * S, 2 * S);
    box(2, 98, 156, 44);
    if (B.cur) { typed(wrap(B.cur.t, 5, 144), B.cur.ch, 8, 104, INK, 5, 9); return; }
    if (B.phase !== 'choose') return;
    const h = st.hs[B.hi], sel = B.menu[B.sel];
    text(`${h.name.toUpperCase()} HP ${h.hp}/${h.max} MP ${h.mp}/${h.maxmp}`, 8, 103, '#3a4a7a', 4.2);
    if (sel !== 'run' && MOVES[sel].mp) text(`${MOVES[sel].mp}MP`, 152, 103, '#b43c3c', 4.2, 'right');
    B.menu.forEach((mid, i) => {
      const x = 8 + (i % 2) * 75, y = 111.5 + (i >> 1) * 7.4;
      const label = mid === 'run' ? 'Run' : mid === 'herb' ? `Herb x${st.herbs}` : MOVES[mid].name;
      const ok = mid === 'run' || MOVES[mid].mp <= h.mp;
      if (i === B.sel) text('>', x, y, '#b43c3c', 4.6);
      text(label, x + 6, y, ok ? INK : '#a0a0a0', 4.6);
    });
  }

  function drawTitle() {
    const bands = ['#78b8f0', '#8cc4f4', '#a8d4f8', '#c4e4fc'];
    bands.forEach((c, i) => { b.fillStyle = c; b.fillRect(0, i * 36, 160, 36); });
    b.fillStyle = '#5aa852'; b.beginPath(); b.ellipse(40, 150, 110, 60, 0, 0, 7); b.fill();
    b.fillStyle = '#7cc66c'; b.beginPath(); b.ellipse(120, 160, 110, 62, 0, 0, 7); b.fill();
    for (let i = 0; i < 60; i++) { const x = i * 47 % 160, y = 104 + i * 31 % 40; b.fillStyle = ['#f86a8a', '#fff8a0', '#ffffff', '#8cc4f4'][i % 4]; b.fillRect(x, y, 2, 2); b.fillStyle = '#f8d040'; b.fillRect(x, y, 1, 1); }
    b.imageSmoothingEnabled = false;
    b.drawImage(ART.spr.frieren.d, 20, 70 + ((G.t >> 5) & 1), 32, 32);
    b.drawImage(ART.spr.statue.d, 2, 62, 16, 16);
  }
  function drawTitleUI() {
    text('FRIEREN', 80, 14, '#20202c', 14, 'center');
    text('FRIEREN', 79, 13, '#f8f8f8', 14, 'center');
    text('The Journey North', 80, 34, '#20202c', 6, 'center');
    text('Season 1 fan adventure', 80, 45, '#3a4a7a', 4.4, 'center');
    box(64, 66, 90, 44);
    TITLE_OPTS.forEach((o, i) => { if (i === G.sel) text('>', 70, 73 + i * 11, '#b43c3c', 6); text(o, 80, 73 + i * 11, i === 1 && !hasSave ? '#a0a0a0' : INK, 6); });
    text('Z / Enter to choose', 80, 118, '#20202c', 4.4, 'center');
    text('Unofficial fan game. Not for sale.', 80, 133, '#2c4c2c', 3.8, 'center');
  }
  function drawChapters() {
    box(4, 4, 152, 136);
    text('CHAPTERS', 80, 9, '#3a4a7a', 6, 'center');
    const top = Math.max(0, Math.min(LEVELS.length - 12, G.sel - 5));
    for (let i = top; i < Math.min(LEVELS.length, top + 12); i++) {
      const y = 21 + (i - top) * 9.6, open = i <= G.unlocked;
      if (i === G.sel) text('>', 9, y, '#b43c3c', 4.4);
      text(`${String(i + 1).padStart(2, '0')} ${open ? LEVELS[i].title : '? ? ?'}`, 16, y, open ? INK : '#a0a0a0', 4.4);
    }
  }
  function drawPause() {
    box(14, 20, 132, 104);
    text('PAUSED', 80, 26, '#3a4a7a', 6, 'center');
    const D = LEVELS[G.cur];
    text(`Ch ${G.cur + 1}: ${D.title}`, 80, 38, INK, 4.2, 'center');
    wrap('Goal: ' + objective(), 4.4, 118).slice(0, 3).forEach((l, i) => text(l, 21, 49 + i * 7, '#2c4c2c', 4.4));
    text(`Party Lv ${G.lv}   XP ${G.xp}/${xpNeed(G.lv)}   Herbs ${G.herbs}`, 80, 73, '#3a4a7a', 4, 'center');
    PAUSE_OPTS.forEach((o, i) => { if (i === G.sel) text('>', 40, 86 + i * 11, '#b43c3c', 6); text(o, 50, 86 + i * 11, INK, 6); });
  }
  function drawDlg() {
    const d = G.dlg;
    if (d.card) {
      ctx.fillStyle = '#101018'; ctx.fillRect(0, 0, cvs.width, cvs.height);
      const ls = d.card.split('\n');
      ls.forEach((l, i) => text(l, 80, 72 - ls.length * 5 + i * 10, ls.length > 2 && i === 2 ? '#f8e8a0' : '#f0f0f0', l.length > 22 ? 5 : 6, 'center'));
      if (G.t % 60 < 40) text('v', 151, 133, '#f0f0f0', 5);
      return;
    }
    box(2, 98, 156, 44);
    if (d.name) {
      font(5);
      const w = ctx.measureText(d.name).width / S + 9;
      box(6, 88, w, 12, '#f8e8a0');
      text(d.name, 10.5, 91.8, INK, 5);
    }
    const page = d.pages[d.pg];
    typed(page, d.ch, 8, 104, d.narr ? '#3a4a7a' : INK, 5, 9);
    if (d.ch >= page.join('').length && G.t % 60 < 40) text('v', 150, 133, '#b43c3c', 5);
  }

  function render() {
    if (G.bat) drawBattle();
    else if (G.mode === 'title' || (G.mode === 'chapters' && G.back === 'title')) drawTitle();
    else drawMap();
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(buf, 0, 0, cvs.width, cvs.height);
    if (G.bat) drawBattleUI();
    else if (G.mode === 'title') drawTitleUI();
    else if (G.mode === 'map' && G.fx !== 'meteor' && G.fx !== 'sunrise') {
      ctx.fillStyle = 'rgba(16,16,24,0.8)'; ctx.fillRect(0, 0, cvs.width, 9 * S);
      text('> ' + objective(), 3, 2.4, '#f8f0c0', 4.2);
    }
    if (G.mode === 'chapters') drawChapters();
    if (G.mode === 'pause') drawPause();
    if (G.dlg) drawDlg();
  }

  const held = {}, queue = [];
  const KM = { ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down', ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', KeyZ: 'ok', Enter: 'ok', Space: 'ok', KeyX: 'back', Escape: 'back', Backspace: 'back', KeyM: 'm' };
  function press(k) { AU.init(); if (!held[k]) queue.push(k); held[k] = true; }
  addEventListener('keydown', (ev) => { const k = KM[ev.code]; if (!k) return; ev.preventDefault(); press(k); });
  addEventListener('keyup', (ev) => { const k = KM[ev.code]; if (k) held[k] = false; });
  addEventListener('blur', () => { for (const k in held) held[k] = false; });
  document.querySelectorAll('[data-k]').forEach((el) => {
    el.addEventListener('pointerdown', (ev) => { ev.preventDefault(); press(el.dataset.k); });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach((n) => el.addEventListener(n, () => { held[el.dataset.k] = false; }));
  });
  cvs.addEventListener('pointerdown', () => press('ok'));
  cvs.addEventListener('pointerup', () => { held.ok = false; });

  function tick() {
    G.t++;
    queue.splice(0).forEach((a) => { if (a === 'm') AU.toggle(); else handle(a); });
    update();
  }
  let lastTime = 0, owed = 0;
  function frame(now) {
    owed += Math.min(100, now - (lastTime || now));
    lastTime = now;
    for (let n = 0; owed >= 1000 / 60 && n < 6; n++) { tick(); owed -= 1000 / 60; }
    render();
    requestAnimationFrame(frame);
  }
  window.FQ = { G, AU, loadLevel, trigger, startBattle, say, objective, press, held, handle, step: (n) => { for (let i = 0; i < n; i++) tick(); render(); } };
  const ch = /[?&]ch=(\d+)/.exec(location.search);
  if (ch) { G.unlocked = LEVELS.length - 1; loadLevel(Math.min(LEVELS.length, Math.max(1, Number(ch[1]))) - 1); }
  if (document.fonts && document.fonts.load) document.fonts.load('10px "Press Start 2P"').catch(() => {});
  requestAnimationFrame(frame);
})();
