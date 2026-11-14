var LEVELS = [];
const SOLID = '#~^OHRDWNFTCKGAXL';
const WALKABLE = '.,:=_%*I-B&P+';

const HEROES = {
  frieren: { name: 'Frieren', hp: 46, mp: 30, atk: 13, def: 7, learn: [[1, 'zolt'], [1, 'barrier'], [4, 'analyze'], [7, 'judra'], [13, 'vollz']] },
  fern: { name: 'Fern', hp: 40, mp: 24, atk: 11, def: 6, learn: [[1, 'zolt'], [2, 'rapid'], [3, 'barrier']] },
  stark: { name: 'Stark', hp: 64, mp: 12, atk: 12, def: 10, learn: [[1, 'axe'], [1, 'guard'], [8, 'blitz']] },
  sein: { name: 'Sein', hp: 48, mp: 30, atk: 8, def: 7, learn: [[1, 'heal'], [1, 'holy'], [16, 'bless']] },
};

const MOVES = {
  zolt: { name: 'Zoltraak', mp: 0, pow: 1, kind: 'atk', txt: 'fires Zoltraak!' },
  rapid: { name: 'Rapid Zoltraak', mp: 3, pow: 0.62, hits: 3, kind: 'atk', txt: 'unleashes a rapid barrage of Zoltraak!' },
  judra: { name: 'Judradjim', mp: 7, pow: 1.9, kind: 'atk', txt: 'calls down destructive lightning!' },
  vollz: { name: 'Vollzanbel', mp: 12, pow: 2.7, kind: 'atk', txt: 'conjures a storm of hellfire!' },
  barrier: { name: 'Defense Magic', mp: 4, kind: 'barrier' },
  analyze: { name: 'Analyze', mp: 3, kind: 'analyze' },
  axe: { name: 'Axe Swing', mp: 0, pow: 1.1, kind: 'atk', txt: 'swings his battle axe!' },
  blitz: { name: 'Thunder Strike', mp: 5, pow: 2.2, kind: 'atk', txt: 'brings his axe down like lightning!' },
  guard: { name: 'Stand Firm', mp: 0, kind: 'guard' },
  heal: { name: 'Healing Magic', mp: 5, kind: 'heal' },
  holy: { name: 'Goddess Spear', mp: 3, pow: 1.5, kind: 'atk', txt: 'casts a spear of holy light!' },
  bless: { name: 'Blessing', mp: 9, kind: 'healall' },
  herb: { name: 'Herb', mp: 0, kind: 'herb' },
  release: {
    name: 'Release Mana', mp: 0, kind: 'finish',
    txt: ['Frieren stops suppressing her mana. It pours out like an ocean.', 'The Scales of Obedience tip... toward Frieren.', 'Frieren: Aura. It is over. Your own magic binds you now.'],
  },
  catchb: {
    name: 'Catch Bird', mp: 0, kind: 'finish',
    txt: ['Frieren casts a folk spell for catching birds.', 'Its range is only half a meter. But the Stille has come down to drink.', 'Got it! The Stille is safely in the cage.'],
  },
  perceive: {
    name: 'Perceive Mana', mp: 0, kind: 'finish',
    txt: ['Fern looks past the crushing pressure and simply watches.', "Serie's mana is wavering. She is suppressing it, just like Frieren does.", 'Fern: ...Your mana is fluctuating.'],
  },
  spar: {
    name: 'Land a Clean Hit', mp: 0, kind: 'finish',
    txt: ['Stark finally reads the old dwarf\'s rhythm.', 'His axe stops a hair from Voll\'s beard.', 'Old Man Voll: Ha! Eisen taught you well, boy.'],
  },
};

const ENEMIES = {
  beast: { name: 'Forest Beast', spr: 'beast', hp: 30, atk: 10, def: 2, xp: 7, wild: true, pat: ['hit'], txt: { hit: 'The beast lunges with its fangs!' } },
  serpentw: { name: 'Marsh Snake', spr: 'serpent', hp: 26, atk: 11, def: 2, xp: 7, wild: true, pat: ['hit', 'hit', 'all'], txt: { hit: 'The snake strikes!', all: 'The snake spits venom everywhere!' } },
  snowbeast: { name: 'Snow Beast', spr: 'snowbeast', hp: 34, atk: 11, def: 3, xp: 8, wild: true, pat: ['hit', 'all'], txt: { hit: 'The snow beast bites down!', all: 'A freezing howl rattles everyone!' } },
  gargoyle: { name: 'Gargoyle', spr: 'golem', hp: 40, atk: 11, def: 4, xp: 9, wild: true, pat: ['hit', 'hit', 'charge', 'big'], txt: { hit: 'The gargoyle swings its stone claws!', big: 'The gargoyle dives from above!' } },
  soldier: { name: 'Headless Knight', spr: 'undead', hp: 30, atk: 10, def: 3, xp: 8, wild: true, pat: ['hit'], txt: { hit: 'The headless knight swings its sword!' } },

  rock: {
    name: 'The Rock', spr: 'rock', hp: 60, atk: 0, def: 4, xp: 12, pat: ['idle'],
    intro: 'A great rock sits far across the valley.', tip: 'Fern must hit it with magic to earn her place as a mage.',
    txt: { idle: 'The rock sits there. Far away. Unbothered.' },
  },
  qual: {
    name: 'Qual', spr: 'qual', hp: 250, atk: 21, def: 4, xp: 26, pat: ['hit', 'charge', 'big', 'hit', 'all'],
    intro: 'Qual, the Elder Sage of Corruption, awakens from his seal!',
    tip: 'When he gathers mana, raise Defense Magic before the blast lands.',
    txt: { hit: 'Qual fires his killing magic, Zoltraak!', charge: 'Qual gathers a dreadful amount of mana...', big: 'Qual unleashes a storm of Zoltraak!', all: 'Qual sweeps the field with dark bolts!' },
  },
  einsam: {
    name: 'Einsam', spr: 'phantom', hp: 330, atk: 25, def: 5, xp: 30, pat: ['hit', 'all', 'charge', 'big'],
    intro: 'The phantom drops its disguise. Einsam shows its true shape!',
    txt: { hit: 'Einsam lashes out with cold claws!', all: 'Whispering voices of the dead fill the mist!', charge: 'Einsam wears a beloved face again, waiting for you to hesitate...', big: 'Einsam devours the hesitation!' },
  },
  dragon: {
    name: 'Solar Dragon', spr: 'dragon', hp: 235, atk: 27, def: 8, xp: 34, pat: ['hit', 'hit', 'charge', 'big'],
    intro: 'The Solar Dragon spreads its wings over the canyon!', tip: 'Stark faces it alone. Stand Firm halves the damage he takes.',
    txt: { hit: 'The dragon rakes with its claws!', charge: 'The dragon rears back, fire glowing in its throat...', big: 'The dragon breathes a torrent of flame!' },
  },
  draht: {
    name: 'Draht', spr: 'draht', hp: 300, atk: 34, def: 6, xp: 36, pat: ['hit', 'hit', 'charge', 'big'],
    intro: 'Draht slips into the dungeon to silence Frieren!',
    txt: { hit: 'Draht whips razor wire of mana at Frieren!', charge: 'Draht loops a wire around Frieren\'s neck...', big: 'Draht pulls the wire tight!' },
  },
  linie: {
    name: 'Linie', spr: 'linie', hp: 300, atk: 35, def: 10, xp: 38, pat: ['hit', 'hit', 'all', 'charge', 'big'],
    intro: 'Linie conjures an axe. Her stance is a perfect copy of Eisen\'s!', tip: 'An imitation has the form but not the weight. Hold on and strike back.',
    txt: { hit: 'Linie swings a copied axe technique!', all: 'Linie spins through a flurry of copied strikes!', charge: 'Linie mirrors the Thunder Strike stance...', big: 'Linie brings down the imitation Thunder Strike!' },
  },
  lugner: {
    name: 'Lugner', spr: 'lugner', hp: 225, atk: 36, def: 7, xp: 38, pat: ['hit', 'all', 'charge', 'big'],
    intro: 'Lugner raises wings and spears of blood. Balterie!', tip: 'Fern is faster than he expects. Keep the barrage going.',
    txt: { hit: 'Lugner hurls a spear of blood!', all: 'Blood magic lashes out in every direction!', charge: 'Lugner draws his blood into a single giant lance...', big: 'Lugner launches the blood lance!' },
  },
  aura: {
    name: 'Aura', spr: 'aura', hp: 2400, atk: 26, def: 10, xp: 50, pat: ['hit', 'scales', 'wait', 'hit'], unlock: { move: 'release', turn: 2, who: 'frieren' },
    intro: 'Aura the Guillotine stands before her headless army!', tip: 'She trusts her scales completely. Survive until she uses them.',
    txt: { hit: 'Aura sends her headless knights charging in!', scales: 'Aura raises the Scales of Obedience. Auserlese! Both souls are placed on the scales.', wait: 'Aura smiles. She is certain her mana is the greater.' },
  },
  lord: {
    name: 'Lord of the Peak', spr: 'lord', hp: 1150, atk: 46, def: 10, xp: 44, pat: ['hit', 'all', 'hit', 'charge', 'big'],
    intro: 'The lord of the mountain monsters guards the sacred cave!',
    txt: { hit: 'The beast swipes with a huge paw!', all: 'The beast roars and the cave shakes!', charge: 'The beast gathers itself to pounce...', big: 'The beast crashes down on the party!' },
  },
  serpent: {
    name: 'Venom Serpent', spr: 'serpent', hp: 1250, atk: 48, def: 9, xp: 46, pat: ['hit', 'hit', 'all', 'charge', 'big'],
    intro: 'A huge serpent rises from the reeds!',
    txt: { hit: 'The serpent strikes with dripping fangs!', all: 'The serpent thrashes its coils!', charge: 'The serpent coils up tight...', big: 'The serpent lunges at full length!' },
  },
  skybird: {
    name: 'Giant Bird', spr: 'bird', hp: 1750, atk: 46, def: 9, xp: 46, pat: ['hit', 'all', 'hit', 'charge', 'big'],
    intro: 'The giant bird wheels around, wagon still in its claws!',
    txt: { hit: 'The bird rakes with its talons!', all: 'Its wings whip up a gale!', charge: 'The bird climbs high into the sky...', big: 'The bird dives at terrible speed!' },
  },
  bloom: {
    name: 'Chaos Flower', spr: 'plant', hp: 620, atk: 50, def: 9, xp: 50, pat: ['hit', 'all', 'charge', 'big'],
    intro: 'A Chaos Flower blooms in the ruins, breathing a sleeping curse!', tip: 'Only Sein resists the curse fully. Keep Frieren awake and standing.',
    txt: { hit: 'Thorned vines whip out!', all: 'Cursed pollen drifts over everyone!', charge: 'The flower opens wide, the curse thickening...', big: 'A wave of cursed sleep crashes over the party!' },
  },
  voll: {
    name: 'Old Man Voll', spr: 'voll', hp: 3000, atk: 44, def: 14, xp: 50, pat: ['hit', 'hit', 'wait', 'hit'], unlock: { move: 'spar', turn: 3, who: 'stark' },
    intro: 'Old Man Voll lifts his weapon. A friendly spar!', tip: 'He has guarded this village for centuries. Just endure and learn his rhythm.',
    txt: { hit: 'Voll sweeps Stark\'s legs out from under him!', wait: 'Voll yawns and waits for Stark to get up.' },
  },
  icebeast: {
    name: 'Cave Ice Beast', spr: 'snowbeast', hp: 1150, atk: 62, def: 12, xp: 52, pat: ['hit', 'all', 'hit', 'charge', 'big'],
    intro: 'Something large stirs in the frozen cave!',
    txt: { hit: 'The ice beast slams down a frozen claw!', all: 'A blast of freezing breath!', charge: 'The beast inhales the frozen air...', big: 'A blizzard roars out of its jaws!' },
  },
  stille: {
    name: 'Stille', spr: 'bird', hp: 500, atk: 10, def: 30, xp: 30, resist: 0, resistTxt: 'The Stille is far too fast. It is already somewhere else!', pat: ['flee', 'flee', 'drink'], unlock: { move: 'catchb', turn: 3, who: 'frieren' },
    intro: 'A Stille! A tiny bird that flies faster than sound.', tip: 'Brute force will not work. Wait for it to come down to the water.',
    txt: { flee: 'The Stille zips away in a blur!', drink: 'The Stille lands by the last unfrozen pool to drink...' },
  },
  ehre: {
    name: 'Ehre', spr: 'ehre', hp: 400, atk: 54, def: 10, xp: 50, pat: ['hit', 'all', 'charge', 'big'],
    intro: 'Ehre blocks the way: "Hand over the Stille."',
    txt: { hit: 'Ehre fires a volley of stone bullets! Doragate!', all: 'Stone shards rain down!', charge: 'Ehre gathers a mass of stones overhead...', big: 'Ehre hurls the whole barrage!' },
  },
  denken: {
    name: 'Denken', spr: 'denken', hp: 850, atk: 56, def: 12, xp: 56, pat: ['hit', 'all', 'hit', 'charge', 'big'],
    intro: 'Denken, the imperial mage, steps forward to take the Stille!',
    txt: { hit: 'Denken casts Varglade, a whirlwind of blades!', all: 'Denken sweeps the field with Daosdorg flames!', charge: 'Denken layers spell upon spell...', big: 'Denken unleashes everything at once!' },
  },
  mimic: {
    name: 'Mimic', spr: 'mimic', hp: 520, atk: 60, def: 8, xp: 40, pat: ['hit', 'hit', 'all'],
    intro: 'It was a mimic after all!',
    txt: { hit: 'The mimic chomps down!', all: 'The mimic rattles its lid furiously!' },
  },
  garg: {
    name: 'Tomb Gargoyle', spr: 'golem', hp: 880, atk: 66, def: 14, xp: 50, pat: ['hit', 'hit', 'charge', 'big'],
    intro: 'A stone gargoyle peels itself off the tomb wall!',
    txt: { hit: 'The gargoyle slashes with stone claws!', charge: 'The gargoyle climbs to the ceiling...', big: 'The gargoyle drops like a boulder!' },
  },
  replica: {
    name: 'Frieren Replica', spr: 'replica', hp: 2300, atk: 70, def: 14, xp: 70, weak: 2.2, pat: ['hit', 'all', 'charge', 'big', 'hit'],
    weakTxt: 'There! For an instant while casting, her mana detection drops. Strike in that gap!',
    intro: 'A perfect replica of Frieren guards the final door.', tip: 'Analyze her. Even Frieren has one fatal opening.',
    txt: { hit: 'The replica fires Zoltraak without a word!', all: 'The replica calls down Judradjim!', charge: 'The replica gathers hellfire. Vollzanbel is coming...', big: 'The replica unleashes Vollzanbel!' },
  },
  serie: {
    name: 'Serie', spr: 'serie', hp: 9999, atk: 30, def: 50, xp: 80, resist: 0, resistTxt: 'Serie does not even glance at it.', pat: ['press', 'press', 'press'], unlock: { move: 'perceive', turn: 2, who: 'fern' },
    intro: 'Serie, the great elf mage, looks down from her throne of flowers.', tip: 'This is not a fight you can win. Look closely instead.',
    txt: { press: 'Serie\'s presence alone presses down like a mountain.' },
  },
};

function xpNeed(lv) { return 14 + 7 * lv; }

function hstat(id, lv) {
  const h = HEROES[id], m = 1 + 0.14 * (lv - 1);
  return {
    id, name: h.name, max: Math.round(h.hp * m), maxmp: Math.round(h.mp * m), atk: h.atk * m, def: h.def * m,
    moves: h.learn.filter((l) => l[0] <= lv).map((l) => l[1]),
  };
}

function mkBattle(eid, party, lv, herbs) {
  const d = ENEMIES[eid], m = d.wild ? 1 + 0.14 * (lv - 1) : 1;
  const e = Object.assign({}, d, { hp: Math.round(d.hp * m), atk: d.atk * m, def: d.def * m });
  e.max = e.hp;
  const hs = party.map((id) => { const h = hstat(id, lv); h.hp = h.max; h.mp = h.maxmp; return h; });
  return { e, hs, turn: 0, pi: 0, barrier: false, guard: -1, analyzed: false, charged: false, herbs };
}

function heroMoves(st, hi) {
  const h = st.hs[hi], e = st.e, ms = h.moves.slice();
  if (e.unlock && e.unlock.who === h.id && st.turn >= e.unlock.turn) ms.unshift(e.unlock.move);
  if (st.herbs > 0) ms.push('herb');
  return ms;
}

function rollDamage() { return 0.9 + Math.random() * 0.2; }

function heroAct(st, hi, mid) {
  const h = st.hs[hi], m = MOVES[mid], e = st.e, L = [];
  h.mp -= m.mp;
  const weakest = () => st.hs.find((x) => x.hp <= 0) || st.hs.slice().sort((a, b) => a.hp / a.max - b.hp / b.max)[0];
  if (m.kind === 'atk') {
    L.push({ t: `${h.name} ${m.txt}` });
    if (e.resist === 0) { L.push({ t: e.resistTxt || `It has no effect on ${e.name}!` }); return L; }
    let total = 0;
    for (let i = 0; i < (m.hits || 1); i++) {
      total += Math.max(1, Math.round(h.atk * m.pow * (st.analyzed ? (e.weak || 1.4) : 1) * rollDamage() - e.def * 0.5));
    }
    e.hp = Math.max(0, e.hp - total);
    L.push({ t: `${e.name} takes ${total} damage!`, fx: 'e' });
  } else if (m.kind === 'barrier') {
    st.barrier = true;
    L.push({ t: `${h.name} raises defensive magic around the party!` });
  } else if (m.kind === 'guard') {
    st.guard = hi;
    L.push({ t: `${h.name} plants his feet and shields the others!` });
  } else if (m.kind === 'analyze') {
    st.analyzed = true;
    L.push({ t: `${h.name} studies the flow of mana...` }, { t: e.weakTxt || `A weak point! ${e.name} now takes more damage.` });
  } else if (m.kind === 'heal' || m.kind === 'herb') {
    if (m.kind === 'herb') st.herbs--;
    const target = weakest(), wasDown = target.hp <= 0;
    target.hp = Math.min(target.max, target.hp + Math.round(target.max * (m.kind === 'herb' ? 0.45 : 0.55)));
    L.push({ t: m.kind === 'herb' ? `${h.name} uses a herb. ${target.name} recovers!` : `${h.name} casts healing magic. ${target.name} recovers!`, fx: 'heal' });
    if (wasDown) L.push({ t: `${target.name} is back on their feet!` });
  } else if (m.kind === 'healall') {
    st.hs.forEach((x) => { if (x.hp > 0) x.hp = Math.min(x.max, x.hp + Math.round(x.max * 0.35)); });
    L.push({ t: `${h.name} prays to the Goddess. The whole party recovers!`, fx: 'heal' });
  } else if (m.kind === 'finish') {
    m.txt.forEach((t, i) => L.push({ t, fx: i === m.txt.length - 1 ? 'e' : undefined }));
    e.hp = 0;
  }
  return L;
}

function enemyAct(st) {
  const e = st.e, L = [], T = e.txt || {};
  const act = e.pat[st.pi % e.pat.length];
  st.pi++; st.turn++;
  const live = st.hs.filter((h) => h.hp > 0);
  const guard = st.guard >= 0 && st.hs[st.guard].hp > 0 ? st.hs[st.guard] : null;
  const hurt = (h, mult) => {
    let d = Math.max(1, Math.round(e.atk * mult * rollDamage() - h.def * 0.5));
    if (guard === h) d = Math.ceil(d * 0.5);
    h.hp = Math.max(0, h.hp - d);
    L.push({ t: `${h.name} takes ${d} damage!`, fx: 'h' });
    if (h.hp <= 0) L.push({ t: `${h.name} collapses!` });
  };
  if (act === 'charge') {
    st.charged = true;
    L.push({ t: T.charge || `${e.name} is gathering a huge amount of mana...` });
  } else if (act === 'hit' || act === 'all' || act === 'big') {
    L.push({ t: T[act] || `${e.name} attacks!` });
    if (st.barrier) {
      st.barrier = false;
      L.push({ t: 'The defensive magic blocks it completely!' });
    } else if (act === 'hit') {
      hurt(guard || live[Math.floor(Math.random() * live.length)], 1);
    } else if (guard && act === 'all') {
      hurt(guard, 1.1);
    } else {
      live.forEach((h) => hurt(h, act === 'big' ? 2.1 : 0.6));
    }
    if (act === 'big') st.charged = false;
  } else if (act === 'press') {
    L.push({ t: T.press });
    live.forEach((h) => { h.hp = Math.max(1, h.hp - Math.round(h.max * 0.12)); });
    L.push({ t: 'It is hard to even breathe.', fx: 'h' });
  } else {
    L.push({ t: T[act] || `${e.name} does nothing.` });
  }
  st.guard = -1;
  return L;
}

function outcome(st) {
  if (st.e.hp <= 0) return 'win';
  if (st.hs.every((h) => h.hp <= 0)) return 'lose';
  return null;
}

if (typeof module !== 'undefined') module.exports = {};
