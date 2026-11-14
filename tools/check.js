const fs = require('fs'), vm = require('vm'), path = require('path');
const root = path.join(__dirname, '..');
['js/core.js', 'js/art.js', 'js/music.js', 'js/levels1.js', 'js/levels2.js', 'js/levels3.js'].forEach((f) => vm.runInThisContext(fs.readFileSync(path.join(root, f), 'utf8'), { filename: f }));

let problems = 0;
const bad = (msg) => { problems++; console.log('  PROBLEM: ' + msg); };
const sprites = new Set(Object.keys(HUMANS).concat(Object.keys(PIXELS)));
const stages = (e) => (e.next ? [e].concat(stages(e.next)) : [e]);

LEVELS.forEach((D, li) => {
  const tag = `Ch${li + 1} ${D.title}`;
  const w = Math.max(...D.map.map((r) => r.length));
  D.map.forEach((r, y) => { if (r.length !== w) bad(`${tag}: row ${y} has width ${r.length}, expected ${w}`); });
  if (D.title.length > 26) bad(`${tag}: title too long`);
  (D.steps || []).forEach(([, t]) => { if (t.length > 36) bad(`${tag}: objective too long: ${t}`); });
  const grid = [], ents = [];
  let start = null;
  D.map.forEach((row, y) => {
    grid.push([]);
    for (let x = 0; x < w; x++) {
      let ch = row[x] || D.pad || D.map[0][0];
      if (ch === '@') { start = { x, y }; ch = D.base; } else if (D.ents[ch]) { const e = Object.assign({}, D.ents[ch], { x, y, k: ch }); ents.push(e); ch = e.on || D.base; } else if (!(SOLID + WALKABLE).includes(ch)) bad(`${tag}: unknown tile '${ch}' at ${x},${y}`);
      grid[y].push(ch);
    }
  });
  if (!start) { bad(`${tag}: no start`); return; }
  Object.keys(D.ents).forEach((k) => { if (!ents.some((e) => e.k === k)) bad(`${tag}: ent '${k}' is not placed on the map`); });
  const produced = new Set();
  ents.forEach((e) => stages(e).forEach((s) => {
    if (s.set) produced.add(s.set);
    if (s.spr && !sprites.has(s.spr)) bad(`${tag}: unknown sprite ${s.spr}`);
    if (s.spr2 && !sprites.has(s.spr2)) bad(`${tag}: unknown sprite ${s.spr2}`);
    if (s.battle && !ENEMIES[s.battle]) bad(`${tag}: unknown enemy ${s.battle}`);
    (s.bparty || []).concat(s.join || [], s.leave || []).forEach((id) => { if (!HEROES[id]) bad(`${tag}: unknown hero ${id}`); });
    if (s.tp && !ents.some((o) => o.k === s.tp)) bad(`${tag}: tp target ${s.tp} missing`);
  }));
  (D.party || []).forEach((id) => { if (!HEROES[id]) bad(`${tag}: unknown hero ${id}`); });
  (D.followers || []).forEach((id) => { if (!sprites.has(id)) bad(`${tag}: unknown follower sprite ${id}`); });
  (D.wild || []).forEach((id) => { if (!ENEMIES[id] || !ENEMIES[id].wild) bad(`${tag}: bad wild enemy ${id}`); });
  const needs = [];
  ents.forEach((e) => { [e.show, e.hide].forEach((n) => n && needs.push(n)); stages(e).forEach((s) => [].concat(s.need || []).forEach((n) => needs.push(n))); });
  (D.steps || []).forEach(([k]) => needs.push(k));
  if (D.goal) needs.push(D.goal);
  needs.forEach((n) => { if (!produced.has(n)) bad(`${tag}: flag '${n}' is never set`); });

  const flags = {}, F = (k) => Boolean(flags[k]);
  const has = (n) => !n || (Array.isArray(n) ? n.every(F) : F(n));
  const vis = (e) => has(e.show) && !(e.hide && F(e.hide));
  let pos = start, done = false, party = D.party.slice();
  const order = [];
  for (let guard = 0; guard < 200 && !done; guard++) {
    const seen = new Set([pos.x + ',' + pos.y]), queue = [pos];
    while (queue.length) {
      const c = queue.shift();
      [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
        const x = c.x + dx, y = c.y + dy, key = x + ',' + y;
        if (x < 0 || y < 0 || x >= w || y >= grid.length || seen.has(key) || SOLID.includes(grid[y][x])) return;
        if (ents.some((e) => e.x === x && e.y === y && !e.step && !e.spot && vis(e))) return;
        seen.add(key); queue.push({ x, y });
      });
    }
    const reach = (e) => (e.step ? seen.has(e.x + ',' + e.y) : [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => seen.has((e.x + dx) + ',' + (e.y + dy))));
    let progressed = false;
    for (const e of ents) {
      if (!vis(e) || e.spot || !reach(e)) continue;
      if (e.exit) { if (!D.goal || F(D.goal)) { done = true; break; } continue; }
      let s = e;
      while (s && s.set && F(s.set)) s = s.next;
      if (!s || !s.set || !has(s.need)) continue;
      flags[s.set] = true; order.push(s.set); progressed = true;
      if (s.join) s.join.forEach((id) => { if (!party.includes(id)) party.push(id); });
      if (s.leave) party = party.filter((id) => !s.leave.includes(id));
      if (s.battle && !(s.bparty || party).length) bad(`${tag}: battle ${s.battle} with empty party`);
      if (s.tp) { const t = ents.find((o) => o.k === s.tp); pos = { x: t.x, y: t.y }; }
      break;
    }
    if (!progressed && !done) break;
  }
  if (!done) bad(`${tag}: cannot be completed. Flags reached: ${order.join(', ') || 'none'}`);
  const stepOrder = (D.steps || []).map((s) => s[0]);
  const reachedInOrder = order.filter((f) => stepOrder.includes(f));
  if (done && JSON.stringify(reachedInOrder.slice().sort()) !== JSON.stringify(stepOrder.slice().sort())) bad(`${tag}: steps not all reached: ${stepOrder.filter((s) => !order.includes(s))}`);
  console.log(`${done ? 'ok ' : 'BAD'} ${tag}  [${order.join(' > ')}]`);
});

function pick(st, hi) {
  const h = st.hs[hi], ms = heroMoves(st, hi), can = (m) => ms.includes(m) && MOVES[m].mp <= h.mp;
  const fin = ms.find((m) => MOVES[m].kind === 'finish');
  if (fin) return fin;
  const low = st.hs.some((x) => x.hp / x.max < 0.45);
  if (st.charged && !st.barrier && can('barrier')) return 'barrier';
  if (low && can('heal')) return 'heal';
  if (st.hs.filter((x) => x.hp > 0 && x.hp / x.max < 0.6).length >= 2 && can('bless')) return 'bless';
  if (st.hs.some((x) => x.hp / x.max < 0.3) && can('herb')) return 'herb';
  if (st.e.resist === 0) return can('barrier') && !st.barrier ? 'barrier' : ms[0];
  if (st.e.unlock) return st.hs.length === 1 && can('guard') ? 'guard' : can('barrier') && !st.barrier ? 'barrier' : ms[0];
  if (st.charged && st.hs.length === 1 && can('guard')) return 'guard';
  if (!st.analyzed && can('analyze') && st.e.hp > 200) return 'analyze';
  const atks = ms.filter((m) => MOVES[m].kind === 'atk' && MOVES[m].mp <= h.mp);
  return atks.sort((a, c) => MOVES[c].pow * (MOVES[c].hits || 1) - MOVES[a].pow * (MOVES[a].hits || 1))[0];
}
function simulate(eid, party, lv, herbs) {
  const st = mkBattle(eid, party, lv, herbs);
  for (let turn = 1; turn < 80; turn++) {
    for (let i = 0; i < st.hs.length; i++) {
      if (st.hs[i].hp <= 0) continue;
      heroAct(st, i, pick(st, i));
      if (outcome(st)) return { o: outcome(st), turn };
    }
    enemyAct(st);
    if (outcome(st)) return { o: outcome(st), turn };
  }
  return { o: 'timeout', turn: 80 };
}
console.log('\nMusic:');
LEVELS.forEach((D, li) => { if (!MUSIC.TRACKS[D.music || 'field']) bad(`Ch${li + 1}: unknown music ${D.music}`); });
Object.keys(MUSIC.TRACKS).forEach((name) => {
  try {
    const c = MUSIC.compile(name);
    let strong = 0, fit = 0, lo = 200, hi = 0, notes = 0;
    c.lead.forEach((ev, i) => {
      if (!ev) return;
      notes++; lo = Math.min(lo, ev.m); hi = Math.max(hi, ev.m);
      if (i % 4 !== 0) return;
      strong++;
      const ch = c.chords[Math.floor(i / MUSIC.STEPS_PER_BAR)];
      if (ch.tones.some((t) => (t - ev.m) % 12 === 0)) fit++;
    });
    const pct = Math.round(100 * fit / strong);
    if (lo < 55 || hi > 96) bad(`music ${name}: melody out of range ${lo}..${hi}`);
    if (pct < 60) bad(`music ${name}: only ${pct}% of strong beats fit the chord`);
    console.log(`  ${name.padEnd(7)} "${c.style.name}"  ${c.total / MUSIC.STEPS_PER_BAR} bars, ${notes} melody notes, ${(c.total * c.stepDur).toFixed(0)}s loop, ${pct}% of strong beats on chord tones`);
  } catch (err) { bad(`music ${name}: ${err.message}`); }
});
console.log('\nBattle balance (300 simulated fights each, party at the minimum level for that chapter, 2 herbs):');
LEVELS.forEach((D, li) => {
  let party = D.party.slice();
  const fights = [];
  D.map.join('').split('').forEach((ch) => {
    const e = D.ents[ch];
    if (!e || fights.some((f) => f.e === e)) return;
    fights.push({ e });
  });
  const flat = [];
  fights.forEach(({ e }) => stages(e).forEach((s) => flat.push(s)));
  const joined = new Set(party);
  flat.forEach((s) => { if (s.join && !s.battle) s.join.forEach((id) => joined.add(id)); });
  flat.filter((s) => s.battle).forEach((s) => {
    const p = s.bparty || (D.title === 'The Sleeping Village' ? ['frieren', 'sein'] : D.title === 'The Mirrored Lotus' ? ['frieren', 'stark', 'sein', 'fern'] : party);
    let wins = 0, turns = 0;
    for (let i = 0; i < 300; i++) { const r = simulate(s.battle, p, li + 1, 2); if (r.o === 'win') wins++; turns += r.turn; }
    const rate = Math.round(wins / 3);
    if (rate < 80) bad(`Ch${li + 1} ${s.battle}: win rate only ${rate}%`);
    console.log(`  Ch${String(li + 1).padStart(2)} lv${String(li + 1).padStart(2)} ${s.battle.padEnd(10)} party=${p.join('+').padEnd(26)} win ${String(rate).padStart(3)}%  avg turns ${(turns / 300).toFixed(1)}`);
  });
  (D.wild || []).forEach((id) => {
    let wins = 0, turns = 0;
    for (let i = 0; i < 300; i++) { const r = simulate(id, party, li + 1, 2); if (r.o === 'win') wins++; turns += r.turn; }
    console.log(`  Ch${String(li + 1).padStart(2)} lv${String(li + 1).padStart(2)} ${('wild ' + id).padEnd(10)} party=${party.join('+').padEnd(26)} win ${String(Math.round(wins / 3)).padStart(3)}%  avg turns ${(turns / 300).toFixed(1)}`);
  });
});
console.log(problems ? `\n${problems} problem(s) found` : '\nAll checks passed');
process.exit(problems ? 1 : 0);
