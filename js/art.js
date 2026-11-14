const HUMAN_FRONT = [
  '................',
  '.....oooooo.....',
  '....ohhhhhho....',
  '...ohhhhhhhho...',
  '...ohhsssshho...',
  '...ohsessesho...',
  '...ohssssssho...',
  '....osssssso....',
  '....occcccco....',
  '...occcaaccco...',
  '...osccaaccso...',
  '...osccccccso...',
  '....occcccco....',
  '....occoocco....',
  '....obbo.obbo...',
  '....ooo..ooo....',
];

const SKIN = '#f6d2b0', PALE = '#d4d4e2';
const HUMANS = {
  frieren: { h: '#f2f2fa', c: '#e6eaf4', a: '#3c3c64', b: '#3c3c64', style: 'twin', ears: 1, robe: 1 },
  fern: { h: '#6c4c9c', c: '#3c3250', a: '#f0f0f0', b: '#2a2238', style: 'long', robe: 1 },
  stark: { h: '#c83c3c', c: '#8c2c2c', a: '#e8d8b0', b: '#3a2a2a' },
  sein: { h: '#b89c68', c: '#3c5c4c', a: '#e8e8d8', b: '#2a3a30', robe: 1 },
  himmel: { h: '#58a8e8', c: '#f0f0f8', a: '#3c6cc8', b: '#3c4c7c' },
  himmelold: { h: '#e4e4ec', c: '#f0f0f8', a: '#3c6cc8', b: '#3c4c7c', beard: 1 },
  heiter: { h: '#4c6c4c', c: '#2c3c2c', a: '#e8e8d8', b: '#1c2c1c', robe: 1, glasses: 1 },
  heiterold: { h: '#d8d8d0', c: '#2c3c2c', a: '#e8e8d8', b: '#1c2c1c', robe: 1, glasses: 1 },
  eisen: { h: '#b4a494', c: '#7c6c5c', a: '#a4acb4', b: '#4c3c2c', helm: 1, beard: 1 },
  villager: { h: '#7c5430', c: '#4c7cb4', a: '#e8e0c8', b: '#4c3c2c' },
  woman: { h: '#d8a850', c: '#5c9c5c', a: '#f0e8d0', b: '#4c3c2c', style: 'long' },
  elder: { h: '#c8c8c8', c: '#7c5c3c', a: '#e8e0c8', b: '#4c3c2c', beard: 1 },
  oldlady: { h: '#dcdcdc', c: '#7c5c7c', a: '#f0e8d0', b: '#4c3c4c', style: 'long' },
  kid: { h: '#e89c50', c: '#c8b450', a: '#f0f0e0', b: '#4c3c2c' },
  guard: { h: '#8c8c9c', c: '#5c6c8c', a: '#a4acbc', b: '#3c3c4c', helm: 1 },
  merchant: { h: '#3c3c3c', c: '#b46c3c', a: '#f0e0b0', b: '#4c3c2c' },
  priest: { h: '#8c7c5c', c: '#2c3c5c', a: '#e8e8d8', b: '#1c2c3c', robe: 1 },
  granat: { h: '#a4a4a4', c: '#3c4c7c', a: '#d8b450', b: '#2c2c3c' },
  qual: { h: '#3c3c4c', s: PALE, c: '#2c2c3c', a: '#7c4c9c', b: '#1c1c2c', horns: 1, robe: 1 },
  aura: { h: '#e890b0', s: PALE, c: '#5c2c4c', a: '#d8b450', b: '#3c1c2c', horns: 1, style: 'long' },
  lugner: { h: '#e8e8f0', s: PALE, c: '#2c2c4c', a: '#b43c3c', b: '#1c1c2c', horns: 1, style: 'long' },
  linie: { h: '#e8a0b8', s: PALE, c: '#3c2c3c', a: '#b43c3c', b: '#1c1c2c', horns: 1, style: 'twin' },
  draht: { h: '#3c3c3c', s: PALE, c: '#4c3c3c', a: '#7c7c7c', b: '#1c1c1c', horns: 1 },
  undead: { h: '#7c7c8c', s: '#7c7c8c', c: '#7c7c8c', a: '#5c5c6c', b: '#4c4c5c', headless: 1 },
  kraft: { h: '#d8c890', c: '#4c4c3c', a: '#e8e0c8', b: '#2c2c1c', ears: 1 },
  chief: { h: '#e8c860', c: '#c85c5c', a: '#f0e8d0', b: '#4c3c2c', style: 'long' },
  voll: { h: '#c8c0b0', c: '#6c5c4c', a: '#8c949c', b: '#3c2c1c', helm: 1, beard: 1 },
  orden: { h: '#8c3c2c', c: '#2c2c4c', a: '#d8b450', b: '#1c1c2c', beard: 1 },
  kanne: { h: '#7c9c5c', c: '#e8e0d0', a: '#5c7c4c', b: '#4c3c2c', style: 'twin' },
  lawine: { h: '#a0c8e8', c: '#3c4c6c', a: '#e8e8f0', b: '#2c2c3c', style: 'long' },
  denken: { h: '#c8c8c8', c: '#3c3c4c', a: '#d8b450', b: '#1c1c2c', beard: 1, robe: 1 },
  ubel: { h: '#4c8c5c', c: '#2c2c2c', a: '#5c5c5c', b: '#1c1c1c', style: 'long' },
  land: { h: '#3c3c4c', c: '#4c4c5c', a: '#e8e8e8', b: '#2c2c2c', glasses: 1 },
  wirbel: { h: '#3c3c3c', c: '#5c4c3c', a: '#8c7c5c', b: '#2c2c1c' },
  sense: { h: '#e8d890', c: '#f0f0f0', a: '#b4a45c', b: '#8c8c8c', style: 'long', robe: 1 },
  genau: { h: '#2c2c3c', c: '#3c3c3c', a: '#e8e8e8', b: '#1c1c1c', robe: 1 },
  serie: { h: '#e8d078', c: '#f0e8d8', a: '#c85c3c', b: '#8c6c4c', style: 'long', ears: 1, robe: 1 },
  ehre: { h: '#c87850', c: '#4c5c7c', a: '#e8e8e8', b: '#2c2c3c', style: 'long' },
  mage: { h: '#8c8c5c', c: '#3c4c3c', a: '#c8c8a0', b: '#2c2c1c', robe: 1 },
  mage2: { h: '#5c4c7c', c: '#5c3c3c', a: '#c8c8a0', b: '#2c2c1c', robe: 1, style: 'long' },
  lernen: { h: '#b4b4b4', c: '#3c3c5c', a: '#e8e8e8', b: '#1c1c2c', robe: 1 },
  statue: { h: '#a0a0ac', s: '#b8b8c4', e: '#80808c', c: '#a8a8b4', a: '#90909c', b: '#80808c' },
  mossstatue: { h: '#6c9c6c', s: '#a0b0a0', e: '#708070', c: '#7ca47c', a: '#5c8c5c', b: '#6c8c6c' },
  replica: { h: '#8c8c9c', s: '#9c9cac', e: '#101018', c: '#5c5c6c', a: '#2c2c3c', b: '#2c2c3c', style: 'twin', ears: 1, robe: 1 },
};

const PIXELS = {
  dragon: { pal: { k: '#20202c', g: '#d8a43c', w: '#ffffff', r: '#c83c3c', y: '#f0d070' }, rows: ['........', '..k.....', '..kk..kk', '.kgk.kgg', '.kggkgwg', '.kgggggg', '..kgggkk', '...kggrr', '..kkgggg', '.kyykggg', 'kyyyykgg', 'kyyyykgg', '.kyykggg', '..kkggk.', '...kggk.', '...kkk..'] },
  lord: { pal: { k: '#20202c', g: '#6c5c8c', w: '#f8f070', r: '#c83c3c', y: '#9c8cbc' }, rows: ['........', '..k.....', '..kk..kk', '.kgk.kgg', '.kggkgwg', '.kgggggg', '..kgggkk', '...kggrr', '..kkgggg', '.kyykggg', 'kyyyykgg', 'kyyyykgg', '.kyykggg', '..kkggk.', '...kggk.', '...kkk..'] },
  phantom: { pal: { k: '#3c2c5c', p: '#c8b8e8', w: '#ffffff' }, rows: ['........', '.....kkk', '...kkppp', '..kppppp', '.kpppwwp', '.kpppwkp', '.kpppppp', '.kppppkk', '.kpppppp', '.kpppppp', '.kpppppp', '.kpppppp', '.kpppppp', '.kpkppkp', '.kk.kk.k', '........'] },
  beast: { pal: { k: '#20202c', b: '#7c5c4c', w: '#f0f0e0' }, rows: ['........', '.kk.....', '.kbk....', '.kbbkkkk', '.kbbbbbb', '..kbwkbb', '..kbbbbb', '...kbbkk', '..kkbbbb', '.kbbbbbb', '.kbbbbbb', '.kbbbbbb', '..kbbkbb', '..kbbkbb', '..kwwkkw', '...kk..k'] },
  snowbeast: { pal: { k: '#2c3c5c', b: '#dce8f8', w: '#78b8f0' }, rows: ['........', '.kk.....', '.kbk....', '.kbbkkkk', '.kbbbbbb', '..kbwkbb', '..kbbbbb', '...kbbkk', '..kkbbbb', '.kbbbbbb', '.kbbbbbb', '.kbbbbbb', '..kbbkbb', '..kbbkbb', '..kwwkkw', '...kk..k'] },
  plant: { pal: { k: '#20202c', r: '#c84c8c', y: '#f8e070', g: '#3c8c4c' }, rows: ['........', '...kk...', '..krrk.k', '.krrrrkr', '.krrrrrr', '..krrryy', '...krryk', '....kkyy', '.kk..kgg', 'kggk.kgg', 'kgggkkgg', '.kggggkg', '..kkgggg', '....kggg', '...kgggg', '...kkkkk'] },
  mimic: { pal: { k: '#20202c', b: '#a86c3c', y: '#f0c850', w: '#ffffff', r: '#c83c3c' }, rows: ['........', '........', '..kkkkkk', '.kbbbbbb', 'kbbyybbb', 'kbbbbbbb', 'kkkkkkkk', 'kwkwkwkw', 'krrrrrrr', 'kwkwkwkw', 'kkkkkkkk', 'kbbbbbby', 'kbbbbbby', 'kbbbbbbb', 'kkkkkkkk', '........'] },
  chest: { pal: { k: '#20202c', b: '#a86c3c', y: '#f0c850' }, rows: ['........', '........', '........', '..kkkkkk', '.kbbbbbb', 'kbbbbbbb', 'kbbbbbbb', 'kkkkkkyy', 'kbbbbbyy', 'kbbbbbbb', 'kbbbbbbb', 'kbbbbbbb', 'kkkkkkkk', '........', '........', '........'] },
  bird: { pal: { k: '#20202c', y: '#f8d850', o: '#f08c3c' }, rows: ['........', '........', '........', '.....kkk', '....kyyy', '...kyyky', '...kyyyy', '.kkkyyyo', 'kyykyyyy', 'kyyyyyyy', '.kyyyyyy', '..kkyyyy', '....kkkk', '.....k.k', '....kk.k', '........'] },
  serpent: { pal: { k: '#20202c', g: '#5c9c4c', w: '#f8f070', r: '#c83c3c' }, rows: ['........', '.....kkk', '....kggg', '...kgwgg', '...kgkgg', '...kgggg', '....kggr', '..k..kgg', '.kgk.kgg', '.kggkkgg', '.kgggggg', '..kggggg', '...kkggg', '.....kgg', '....kggg', '....kkkk'] },
  golem: { pal: { k: '#20202c', s: '#9c9cac', r: '#f04c4c', w: '#d0d0dc' }, rows: ['........', '.k....kk', 'kskk.kss', 'kssskkss', '.ksssrss', '..ksssss', '...kssww', '..kkksss', '.kssksss', 'kssskssk', 'ksskksss', '.kk.ksss', '....kssk', '...kssk.', '...kssk.', '...kkkk.'] },
  rock: { pal: { k: '#20202c', s: '#a8a8b4', d: '#7c7c8c' }, rows: ['........', '........', '....kkkk', '..kksssd', '.kssssds', '.ksssdss', 'kssssdss', 'kssssssd', 'ksssssss', 'ksdsssss', 'kssdssss', '.ksssssd', '.kssssss', '..kkssss', '....kkkk', '........'] },
  flower: { pal: { k: '#2c3c7c', b: '#6c9cf8', y: '#f8f0a0', g: '#3c8c4c' }, rows: ['........', '........', '........', '....kk..', '...kbbkk', '...kbbbb', '....kbby', '...kkbbb', '...kbbkk', '....kk.g', '..gg...g', '...gg..g', '....gg.g', '.....ggg', '.......g', '........'] },
  debris: { pal: { k: '#20202c', b: '#8c6c4c', d: '#5c4c3c' }, rows: ['........', '........', '........', '........', '........', '...kk...', '..kbbkk.', '.kbbbbbk', 'kbbdbbbb', 'kbbbbdbb', '.kkbbbbb', '...kkkkk', '........', '........', '........', '........'] },
  sparkle: { pal: { y: '#f8e070', w: '#ffffff' }, rows: ['........', '.......y', '.......y', '........', '....y..y', '.....y.y', '......yw', '.yy.yyww', '......yw', '.....y.y', '....y..y', '........', '.......y', '.......y', '........', '........'] },
  book: { pal: { k: '#20202c', p: '#7c4c9c', y: '#f0c850', w: '#f0f0e0' }, rows: ['........', '........', '........', '..kkkkkk', '.kpppppp', '.kpppppp', '.kppppyy', '.kpppppp', '.kpppppp', '.kpppppp', '.kpppppp', '.kkkkkkk', '.kwwwwww', '..kkkkkk', '........', '........'] },
  sword: { pal: { k: '#20202c', w: '#e8f0f8', y: '#f0c850', b: '#7c5c3c', s: '#9c9cac', d: '#7c7c8c' }, rows: ['........', '.......w', '.......w', '.......w', '.......w', '.......w', '.......w', '.....yyy', '.......b', '.......b', '...kkkks', '..kssssw', '.kssssss', '.kssssss', 'kssssdss', 'kkkkkkkk'] },
  bigtree: { pal: { k: '#1c3c2c', g: '#3c8c4c', G: '#5cb46c', b: '#7c5430' }, rows: ['....kkkk', '..kkgggg', '.kgggggg', 'kggggggg', 'kgggGggg', 'kggggggg', 'kggGgggg', '.kgggggg', '..kkgggg', '....kkbb', '.....kbb', '.....kbb', '.....kbb', '....kbbb', '...kbbbb', '...kkkkk'] },
  sign: { pal: { k: '#20202c', b: '#c89858' }, rows: ['........', '........', '..kkkkkk', '.kbbbbbb', '.kbkkkkb', '.kbbbbbb', '.kbkkkbb', '.kbbbbbb', '..kkkkkk', '.......b', '.......b', '.......b', '.......b', '......kb', '........', '........'] },
  mushroom: { pal: { k: '#20202c', b: '#78c8f0', w: '#f0f8ff', s: '#e8e0d0' }, rows: ['........', '........', '........', '....kkkk', '..kkbbbb', '.kbbwbbb', '.kbbbbbw', 'kbbbbbbb', 'kbwbbbbb', '.kkkkkkk', '.....kss', '.....kss', '.....kss', '....kkss', '....kkkk', '........'] },
  ring: { pal: { y: '#f0c850', w: '#ffffff', k: '#8c6c1c' }, rows: ['........', '........', '........', '........', '.......w', '......kk', '....kkyy', '...kyy..', '...ky...', '...ky...', '...kyy..', '....kkyy', '......kk', '........', '........', '........'] },
};

const OVERLAY_TILES = 'OFGAX';

const ART = { tiles: {}, spr: {}, over: {} };

ART.init = function () {
  const canvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
  const seeded = (a) => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const speck = (p, r, col, n) => { for (let i = 0; i < n; i++) p(col, r() * 16 | 0, r() * 16 | 0); };
  const grass = (p, f, r) => { p('#7cc66c', 0, 0, 16, 16); for (let i = 0; i < 7; i++) { const x = r() * 14 | 0, y = r() * 14 | 0; p('#5aa852', x, y, 2, 1); p('#5aa852', x + 1, y + 1); } };
  const wall = (p) => { p('#f0e8d0', 0, 0, 16, 16); p('#d8ccac', 0, 0, 16, 1); p('#c8bca0', 0, 15, 16, 1); p('#e2d8ba', 0, 8, 16, 1); };
  const snow = (p, f, r) => { p('#f4f8ff', 0, 0, 16, 16); speck(p, r, '#d4e2f4', 9); };
  const bricks = (p, base, line, top) => { p(base, 0, 0, 16, 16); for (let row = 0; row < 4; row++) { p(line, 0, row * 4 + 3, 16, 1); for (let x = row % 2 ? 0 : 4; x < 16; x += 8) p(line, x, row * 4, 1, 3); } p(top, 0, 0, 16, 1); };
  const T = {
    '.': grass,
    ',': (p, f, r) => { grass(p, f, r); [['#f86a8a', 3, 4], ['#fff8a0', 11, 3], ['#ffffff', 6, 11], ['#f86a8a', 12, 11]].forEach(([c, x, y]) => { p(c, x, y - 1); p(c, x - 1, y); p(c, x + 1, y); p(c, x, y + 1); p('#f8d040', x, y); }); },
    ':': (p, f, r) => { p('#4f9a4a', 0, 0, 16, 16); for (let x = 0; x < 16; x += 2) for (let y = (x % 4 ? 0 : 2); y < 16; y += 6) { const h = 3 + (r() * 3 | 0); p('#2f7a3a', x, y, 1, h); p('#86d070', x + 1, y + f, 1, h - 1); } },
    '=': (p, f, r) => { p('#e2ca92', 0, 0, 16, 16); speck(p, r, '#c8ac72', 10); },
    '_': (p) => { p('#c4c4cc', 0, 0, 16, 16); p('#a4a4b0', 0, 7, 16, 1); p('#a4a4b0', 0, 15, 16, 1); p('#a4a4b0', 7, 0, 1, 7); p('#a4a4b0', 3, 8, 1, 7); p('#a4a4b0', 11, 8, 1, 7); },
    '#': (p, f, r) => { grass(p, f, r); p('#5a3a20', 6, 11, 4, 5); p('#7a5230', 7, 11, 2, 5); p('#1f5a2f', 3, 1, 10, 11); p('#1f5a2f', 1, 3, 14, 7); p('#2f7a3f', 3, 1, 10, 9); p('#2f7a3f', 1, 3, 14, 5); p('#3f9a4f', 4, 2, 6, 4); p('#3f9a4f', 2, 4, 5, 3); },
    '~': (p, f) => { p('#4a90d8', 0, 0, 16, 16); [3, 8, 13].forEach((y) => { p('#8cc4f4', (f * 4 + y) % 16, y, 4, 1); p('#8cc4f4', (f * 4 + y + 8) % 16, y, 3, 1); }); },
    '%': (p, f, r) => { p('#f0e2a8', 0, 0, 16, 16); speck(p, r, '#d8c888', 9); },
    '^': (p) => { p('#9a8a78', 0, 0, 16, 16); p('#b8a890', 0, 0, 16, 3); p('#7a6a5a', 0, 6, 16, 1); p('#7a6a5a', 0, 11, 16, 1); p('#6a5a4c', 4, 3, 1, 3); p('#6a5a4c', 11, 7, 1, 4); p('#6a5a4c', 7, 12, 1, 3); p('#5a4a3c', 0, 15, 16, 1); },
    'O': (p) => { p('#20202c', 3, 5, 10, 9); p('#20202c', 2, 7, 12, 6); p('#a8a8b4', 4, 6, 8, 7); p('#a8a8b4', 3, 8, 10, 4); p('#d0d0dc', 5, 7, 3, 2); p('#80808c', 9, 10, 3, 2); },
    'H': wall,
    'N': (p) => { wall(p); p('#5a4a3a', 4, 4, 8, 8); p('#8cc4f4', 5, 5, 6, 6); p('#5a4a3a', 7, 5, 1, 6); p('#5a4a3a', 5, 8, 6, 1); },
    'D': (p) => { wall(p); p('#5a3a20', 4, 3, 8, 13); p('#8a5a30', 5, 4, 6, 12); p('#f8d040', 9, 10); },
    'R': (p) => bricks(p, '#c8504a', '#a03a38', '#d86a60'),
    'W': (p) => bricks(p, '#8a8a98', '#6a6a78', '#a8a8b8'),
    'F': (p) => { p('#6a4a30', 2, 3, 3, 12); p('#6a4a30', 11, 3, 3, 12); p('#8a6a48', 0, 6, 16, 2); p('#8a6a48', 0, 11, 16, 2); },
    '*': snow,
    'T': (p, f, r) => { snow(p, f, r); p('#6a4a30', 7, 12, 2, 4); for (let i = 0; i < 5; i++) p('#2a6a4a', 7 - i, 2 + i * 2, 2 + i * 2, 2); p('#ffffff', 7, 2, 2, 1); p('#ffffff', 5, 6, 3, 1); p('#ffffff', 9, 8, 3, 1); p('#ffffff', 4, 10, 2, 1); },
    'I': (p) => { p('#bfe4f8', 0, 0, 16, 16); p('#e8f8ff', 2, 3, 5, 1); p('#e8f8ff', 9, 10, 4, 1); p('#9cd0ec', 11, 4, 3, 1); p('#9cd0ec', 3, 12, 3, 1); },
    '-': (p, f, r) => { p('#746a5e', 0, 0, 16, 16); speck(p, r, '#5e564c', 10); speck(p, r, '#8a8072', 4); },
    'C': (p) => { p('#2e2824', 0, 0, 16, 16); p('#4a423a', 0, 0, 16, 3); p('#3a332e', 2, 6, 4, 3); p('#3a332e', 9, 10, 5, 3); },
    'B': (p) => { p('#a87840', 0, 0, 16, 16); p('#8a5a30', 0, 0, 16, 2); p('#8a5a30', 0, 14, 16, 2); for (let x = 3; x < 16; x += 4) p('#8a6030', x, 2, 1, 12); },
    '&': (p, f, r) => { p('#5c6e4a', 0, 0, 16, 16); for (let i = 0; i < 5; i++) p('#4a5a3c', r() * 13 | 0, r() * 14 | 0, 3, 2); p('#8a9a70', f ? 5 : 10, f ? 4 : 11); },
    'P': (p) => { p('#c89858', 0, 0, 16, 16); [3, 7, 11, 15].forEach((y) => p('#a87840', 0, y, 16, 1)); p('#a87840', 5, 0, 1, 3); p('#a87840', 11, 8, 1, 3); },
    'K': (p) => { p('#6a4a30', 0, 0, 16, 16); const cols = ['#c83c3c', '#3c6cc8', '#3c8c4c', '#d8b450', '#7c4c9c', '#e8e0c8', '#c8703c']; [1, 6, 11].forEach((sy, k) => { p('#3a2a1c', 1, sy, 14, 4); for (let i = 0; i < 7; i++) p(cols[(i + k * 2) % 7], 1 + i * 2, sy, 2, 4); }); },
    'G': (p) => { p('#20202c', 4, 3, 8, 12); p('#b0b0bc', 5, 4, 6, 11); p('#80808c', 7, 6, 2, 5); p('#80808c', 6, 8, 4, 1); },
    'A': (p) => { p('#5a3a20', 1, 4, 14, 9); p('#b8844c', 2, 5, 12, 7); p('#5a3a20', 2, 13, 2, 3); p('#5a3a20', 12, 13, 2, 3); },
    '+': (p) => { p('#b03a48', 0, 0, 16, 16); p('#c85a60', 3, 3, 2, 2); p('#c85a60', 11, 3, 2, 2); p('#c85a60', 7, 7, 2, 2); p('#c85a60', 3, 11, 2, 2); p('#c85a60', 11, 11, 2, 2); },
    'L': (p) => { p('#14141c', 0, 0, 16, 16); },
    'X': (p) => { for (let x = 1; x < 16; x += 4) { p('#50505c', x, 0, 2, 16); p('#a0a0ac', x, 0, 1, 16); } p('#50505c', 0, 2, 16, 1); p('#50505c', 0, 13, 16, 1); },
  };
  let seed = 7;
  for (const ch in T) {
    seed += 13;
    ART.tiles[ch] = [0, 1].map((f) => {
      const c = canvas(16, 16), x = c.getContext('2d'), r = seeded(seed);
      T[ch]((col, a, b, w = 1, h = 1) => { x.fillStyle = col; x.fillRect(a, b, w, h); }, f, r);
      return c;
    });
    if (OVERLAY_TILES.includes(ch)) ART.over[ch] = true;
  }

  const paint = (rows, pal) => {
    const c = canvas(16, 16), x = c.getContext('2d');
    rows.forEach((row, y) => { for (let i = 0; i < 16; i++) { const col = pal[row[i]]; if (col) { x.fillStyle = col; x.fillRect(i, y, 1, 1); } } });
    return c;
  };

  for (const id in PIXELS) {
    const d = PIXELS[id];
    const rows = d.rows.map((row) => { const half = row.padEnd(8, '.').slice(0, 8); return half + half.split('').reverse().join(''); });
    const c = paint(rows, d.pal);
    ART.spr[id] = { d: c, u: c, l: c, r: c };
  }

  for (const id in HUMANS) {
    const o = HUMANS[id];
    const pal = { o: '#20202c', h: o.h, s: o.s || SKIN, e: o.e || '#20202c', c: o.c, a: o.a, b: o.b, x: '#f0e8c8', g: '#dfe8f0' };
    const out = {};
    for (const dir of ['d', 'u', 'l', 'r']) {
      const g = HUMAN_FRONT.map((row) => row.split(''));
      const set = (x, y, ch) => { if (g[y] && x >= 0 && x < 16) g[y][x] = ch; };
      const put = (y, row) => { g[y] = row.split(''); };
      if (dir === 'u') { put(4, '...ohhhhhhhho...'); put(5, '...ohhhhhhhho...'); put(6, '...ohhhhhhhho...'); }
      if (dir === 'l' || dir === 'r') { put(4, '...ohssshhhho...'); put(5, '...osesshhhho...'); put(6, '...ossssshhho...'); }
      if (o.robe) { put(13, '....occcccco....'); put(14, '....occcccco....'); put(15, '....oooooooo....'); }
      if (o.glasses && dir === 'd') { set(5, 5, 'g'); set(7, 5, 'g'); set(8, 5, 'g'); set(10, 5, 'g'); }
      if (o.helm) { for (let y = 2; y <= 3; y++) for (let x = 4; x <= 11; x++) if (g[y][x] === 'h') set(x, y, 'a'); if (dir !== 'u') { set(4, 4, 'a'); set(11, 4, 'a'); } }
      if (o.beard && dir !== 'u') { for (let x = 5; x <= 10; x++) set(x, 7, 'h'); for (let x = 6; x <= 9; x++) set(x, 8, 'h'); }
      if (o.style === 'long') {
        for (let y = 7; y <= 11; y++) { set(3, y, 'h'); set(12, y, 'h'); set(2, y, 'o'); set(13, y, 'o'); }
        if (dir === 'u') for (let y = 7; y <= 10; y++) for (let x = 4; x <= 11; x++) set(x, y, 'h');
      }
      if (o.style === 'twin') {
        for (let y = 6; y <= 11; y++) { set(2, y, 'h'); set(13, y, 'h'); set(1, y, 'o'); set(14, y, 'o'); }
        set(2, 12, 'o'); set(13, 12, 'o');
      }
      if (o.ears) { set(2, 5, 's'); set(13, 5, 's'); }
      if (o.horns) { set(4, 1, 'x'); set(11, 1, 'x'); set(3, 0, 'x'); set(12, 0, 'x'); }
      if (o.headless) { for (let y = 0; y <= 6; y++) for (let x = 0; x < 16; x++) set(x, y, '.'); for (let x = 4; x <= 11; x++) set(x, 7, 'o'); }
      const rows = g.map((row) => (dir === 'r' ? row.slice().reverse() : row).join(''));
      out[dir] = paint(rows, pal);
    }
    ART.spr[id] = out;
  }
};
