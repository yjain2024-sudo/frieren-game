const MUSIC = (function () {
  const NOTE = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const QUALITY = { '': [0, 4, 7], m: [0, 3, 7], 7: [0, 4, 7, 10], maj7: [0, 4, 7, 11], m7: [0, 3, 7, 10], sus4: [0, 5, 7], sus2: [0, 2, 7], dim: [0, 3, 6] };
  const STEPS_PER_BAR = 8;

  const TRACKS = {
    title: {
      name: 'The Journey North', bpm: 76, lead: 'square', vib: true, echo: true, arp: 'broken', bass: 'slow', pad: true, drums: 'none',
      chords: 'D A/C# Bm G D/F# G Em A D A/C# Bm G Em A D D',
      melody: [
        'F#4 - A4 - D5 - - -', 'E5 - C#5 - A4 - - -', 'D5 - B4 - F#4 - A4 -', 'G4 - - - B4 - D5 -',
        'F#5 - - E5 D5 - A4 -', 'B4 - - D5 G5 - F#5 -', 'E5 - - G5 F#5 - E5 -', 'E5 - C#5 - A4 - - .',
        'F#4 - A4 - D5 - - F#5', 'E5 - C#5 - E5 - A5 -', 'F#5 - D5 - B4 - D5 -', 'G5 - - F#5 E5 - D5 -',
        'E5 - G5 - B5 - A5 G5', 'A5 - - G5 E5 - C#5 -', 'D5 - - - - - A4 -', 'D5 - - - . . . .',
      ],
    },
    town: {
      name: 'Hearth and Market', bpm: 96, lead: 'square', vib: true, echo: false, arp: 'broken', bass: 'bounce', pad: false, drums: 'soft',
      chords: 'F C/E Dm Bb F/A Bb Gm C F C/E Dm Bb Gm C F F',
      melody: [
        'A4 C5 F5 - E5 F5 C5 -', 'G4 C5 E5 - D5 E5 C5 -', 'F4 A4 D5 - C5 D5 A4 -', 'D5 - F5 - D5 - Bb4 -',
        'C5 - A4 C5 F5 - A5 -', 'G5 - F5 D5 Bb4 - D5 -', 'Bb4 D5 G5 - F5 - D5 -', 'E5 - G5 - C5 - - .',
        'A4 C5 F5 - E5 F5 A5 -', 'G5 - E5 C5 G4 - C5 -', 'F5 - D5 A4 F4 - A4 -', 'Bb4 - D5 - F5 - G5 -',
        'A5 G5 F5 D5 Bb4 - D5 -', 'C5 - E5 - G5 - Bb5 -', 'A5 - - F5 C5 - A4 -', 'F4 - - - . . . .',
      ],
    },
    field: {
      name: 'A Road With Friends', bpm: 108, lead: 'square', vib: true, echo: false, arp: 'up', bass: 'bounce', pad: false, drums: 'soft',
      chords: 'G G C G Em C D D G G C G Em D G G',
      melody: [
        'D5 - B4 D5 G5 - D5 -', 'B4 - D5 - G4 - B4 -', 'C5 - E5 G5 E5 - C5 -', 'D5 - B4 - G4 - - .',
        'E5 - G5 - B5 - G5 E5', 'G5 - E5 - C5 - E5 -', 'F#5 - A5 - D5 - F#5 -', 'A5 - - F#5 D5 - - .',
        'D5 - B4 D5 G5 - B5 -', 'A5 - G5 - D5 - B4 -', 'C5 - E5 G5 C6 - B5 -', 'G5 - D5 - B4 - D5 -',
        'E5 - G5 B5 A5 - G5 -', 'F#5 - D5 - A4 - C5 -', 'B4 - D5 - G5 - - -', 'G5 - - - . . D5 .',
      ],
    },
    snow: {
      name: 'Six Months of Winter', bpm: 66, lead: 'triangle', vib: true, echo: true, arp: 'sparse', bass: 'slow', pad: true, drums: 'none',
      chords: 'Am Fmaj7 Dm E Am Fmaj7 Dm7 E',
      melody: [
        'E5 - - - C5 - - -', 'A4 - - - E5 - - -', 'F5 - - E5 D5 - - -', 'B4 - - - G#4 - - .',
        'A4 - C5 - E5 - - -', 'A5 - - G5 E5 - - -', 'F5 - D5 - C5 - A4 -', 'B4 - - - - - . .',
      ],
    },
    cave: {
      name: 'What the Mist Remembers', bpm: 72, lead: 'triangle', vib: true, echo: true, arp: 'sparse', bass: 'slow', pad: true, drums: 'none',
      chords: 'Dm Dm Bb A Dm Gm Bb A',
      melody: [
        'D4 - F4 - A4 - - -', '. . D5 - C5 - A4 -', 'Bb4 - - - D5 - F5 -', 'E5 - - C#5 A4 - - .',
        'D5 - - F5 E5 - D5 -', 'G4 - Bb4 - D5 - - -', 'F5 - - D5 Bb4 - - -', 'A4 - C#5 - E5 - - .',
      ],
    },
    memory: {
      name: 'Fifty Years Ago', bpm: 60, lead: 'triangle', vib: true, echo: true, arp: 'broken', arpWave: 'sine', bass: 'slow', pad: true, drums: 'none',
      chords: 'C G/B Am Fmaj7 C/E Fmaj7 Gsus4 G Am Em F C/E Dm7 G C C',
      melody: [
        'G4 - C5 - E5 - - -', 'D5 - - B4 G4 - - -', 'C5 - E5 - A5 - - G5', 'E5 - - - C5 - - -',
        'G5 - - E5 C5 - E5 -', 'A5 - - G5 F5 - E5 -', 'D5 - - - G5 - - -', 'D5 - - - B4 - - .',
        'C5 - E5 - A5 - - -', 'G5 - - E5 B4 - - -', 'A4 - C5 - F5 - - E5', 'E5 - - - G5 - - -',
        'F5 - - D5 A4 - C5 -', 'B4 - - D5 G5 - - -', 'E5 - - - - - C5 -', 'C5 - - - . . . .',
      ],
    },
    battle: {
      name: 'Ordinary Offensive Magic', bpm: 160, lead: 'square', vib: false, echo: false, arp: 'up', arpWave: 'square', bass: 'pulse', pad: false, drums: 'drive',
      chords: 'Em Em C D Em Em C B7 Am Am D G C Am B7 B7',
      melody: [
        'E5 . E5 G5 . B5 . G5', 'E5 . E5 G5 A5 . G5 .', 'C5 . E5 G5 . C6 . G5', 'D5 . F#5 A5 . D6 . A5',
        'E5 . E5 G5 . B5 . E6', 'D6 . B5 . G5 . E5 .', 'C5 E5 G5 C6 B5 G5 E5 C5', 'B4 D#5 F#5 A5 B5 - - .',
        'A5 . C6 . A5 E5 C5 E5', 'A5 . C6 . E6 - C6 -', 'F#5 . A5 . D6 A5 F#5 A5', 'G5 . B5 . D6 - B5 -',
        'E5 G5 C6 . E5 G5 C6 .', 'E5 A5 C6 . E6 . C6 A5', 'B5 - A5 - F#5 - D#5 -', 'B4 . B4 D#5 F#5 A5 B5 .',
      ],
    },
    boss: {
      name: 'The Scales Tip', bpm: 172, lead: 'sawtooth', vib: false, echo: false, arp: 'up', arpWave: 'square', bass: 'pulse', pad: false, drums: 'drive',
      chords: 'Cm Cm Ab G Cm Cm Fm G Ab Bb Cm Cm Fm Ab G G',
      melody: [
        'C5 . C5 Eb5 . C5 G5 .', 'C5 . C5 Eb5 . F5 Eb5 D5', 'Ab4 . C5 Eb5 . Ab5 . Eb5', 'G4 . B4 D5 . G5 - .',
        'C5 . C5 Eb5 . C5 G5 .', 'Bb5 . G5 . Eb5 . C5 .', 'F5 . Ab5 . C6 . Ab5 F5', 'G5 - - . D5 . B4 .',
        'Eb5 - C5 Eb5 Ab5 - Eb5 -', 'F5 - D5 F5 Bb5 - F5 -', 'G5 - Eb5 G5 C6 - - .', 'C6 . Bb5 . G5 . Eb5 .',
        'F5 . Ab5 C6 . F5 Ab5 .', 'Eb5 . Ab5 C6 . Eb6 . C6', 'D6 - B5 - G5 - D5 -', 'G5 . G5 . G5 G5 B5 D6',
      ],
    },
  };

  function pitchClass(letter, accidental) { return NOTE[letter] + (accidental === '#' ? 1 : accidental === 'b' ? -1 : 0); }
  function midi(token) {
    const m = /^([A-G])(#|b)?(\d)$/.exec(token);
    if (!m) throw new Error('bad note ' + token);
    return 12 * (Number(m[3]) + 1) + pitchClass(m[1], m[2]);
  }
  function parseChord(token) {
    const parts = token.split('/'), m = /^([A-G])(#|b)?(.*)$/.exec(parts[0]);
    if (!m || !QUALITY[m[3]]) throw new Error('bad chord ' + token);
    const root = pitchClass(m[1], m[2]);
    let bass = root;
    if (parts[1]) { const bm = /^([A-G])(#|b)?$/.exec(parts[1]); if (!bm) throw new Error('bad chord ' + token); bass = pitchClass(bm[1], bm[2]); }
    return { root, bass: (bass + 12) % 12, tones: QUALITY[m[3]].map((i) => root + i) };
  }
  const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);

  const cache = {};
  function compile(name) {
    if (cache[name]) return cache[name];
    const tr = TRACKS[name], chords = tr.chords.trim().split(/\s+/).map(parseChord), lead = [];
    if (chords.length !== tr.melody.length) throw new Error(`${name}: ${chords.length} chords for ${tr.melody.length} bars`);
    let last = null;
    tr.melody.forEach((bar, index) => {
      const tokens = bar.trim().split(/\s+/);
      if (tokens.length !== STEPS_PER_BAR) throw new Error(`${name}: bar ${index + 1} has ${tokens.length} steps`);
      tokens.forEach((token) => {
        if (token === '-') { if (last) last.len++; lead.push(null); } else if (token === '.') { last = null; lead.push(null); } else { last = { m: midi(token), len: 1 }; lead.push(last); }
      });
    });
    cache[name] = { name, stepDur: 60 / tr.bpm / 2, total: lead.length, lead, chords, style: tr };
    return cache[name];
  }

  class Synth {
    constructor(ac) {
      this.ac = ac;
      this.master = ac.createGain(); this.master.gain.value = 1.5;
      const soften = ac.createBiquadFilter(); soften.type = 'lowpass'; soften.frequency.value = 4200;
      this.master.connect(soften); soften.connect(ac.destination);
      this.music = ac.createGain(); this.music.connect(this.master);
      this.delay = ac.createDelay(1.5); this.delay.delayTime.value = 0.4;
      const feedback = ac.createGain(); feedback.gain.value = 0.32;
      const wet = ac.createGain(); wet.gain.value = 0.32;
      this.delay.connect(feedback); feedback.connect(this.delay); this.delay.connect(wet); wet.connect(this.music);
      const length = Math.floor(ac.sampleRate * 0.5);
      this.noise = ac.createBuffer(1, length, ac.sampleRate);
      const data = this.noise.getChannelData(0);
      for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
      this.cur = null; this.name = null; this.step = 0; this.next = 0;
    }
    play(name) {
      if (name === this.name) return;
      this.name = name;
      this.cur = name && TRACKS[name] ? compile(name) : null;
      this.step = 0; this.next = this.ac.currentTime + 0.08;
      if (this.cur) this.delay.delayTime.setValueAtTime(Math.min(1.4, this.cur.stepDur * 3), this.ac.currentTime);
    }
    pump(until) {
      const ac = this.ac;
      if (!this.cur) return;
      const horizon = until === undefined ? ac.currentTime + 0.18 : until;
      if (this.next < ac.currentTime - 0.3) this.next = ac.currentTime + 0.05;
      while (this.next < horizon) {
        this.stepAt(this.step, this.next);
        this.step = (this.step + 1) % this.cur.total;
        this.next += this.cur.stepDur;
      }
    }
    note(t, m, dur, o) {
      const ac = this.ac, osc = ac.createOscillator(), g = ac.createGain(), attack = o.attack || 0.008, release = o.release || 0.07;
      osc.type = o.type || 'square';
      osc.frequency.setValueAtTime(hz(m), t);
      if (o.vib && dur > 0.32) {
        const lfo = ac.createOscillator(), depth = ac.createGain();
        lfo.frequency.value = 5.4;
        depth.gain.setValueAtTime(0, t); depth.gain.setValueAtTime(0, t + 0.18); depth.gain.linearRampToValueAtTime(hz(m) * 0.007, t + 0.4);
        lfo.connect(depth); depth.connect(osc.frequency); lfo.start(t); lfo.stop(t + dur + release + 0.05);
      }
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(o.vol, t + attack);
      g.gain.linearRampToValueAtTime(o.vol * 0.72, t + Math.max(attack + 0.04, dur * 0.6));
      g.gain.linearRampToValueAtTime(0.0001, t + dur + release);
      osc.connect(g); g.connect(o.bus || this.music);
      if (o.echo) g.connect(this.delay);
      osc.start(t); osc.stop(t + dur + release + 0.05);
    }
    drum(t, kind, vol) {
      const ac = this.ac, g = ac.createGain();
      g.connect(this.music);
      if (kind === 'kick') {
        const osc = ac.createOscillator();
        osc.frequency.setValueAtTime(150, t); osc.frequency.exponentialRampToValueAtTime(48, t + 0.1);
        g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
        osc.connect(g); osc.start(t); osc.stop(t + 0.17);
        return;
      }
      const src = ac.createBufferSource(), filter = ac.createBiquadFilter(), len = kind === 'hat' ? 0.04 : 0.13;
      src.buffer = this.noise;
      filter.type = kind === 'hat' ? 'highpass' : 'bandpass'; filter.frequency.value = kind === 'hat' ? 7000 : 1900;
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + len);
      src.connect(filter); filter.connect(g); src.start(t); src.stop(t + len + 0.02);
    }
    stepAt(i, t) {
      const c = this.cur, st = c.style, d = c.stepDur, pos = i % STEPS_PER_BAR, ch = c.chords[Math.floor(i / STEPS_PER_BAR)];
      const ev = c.lead[i];
      if (ev) this.note(t, ev.m, ev.len * d * 0.94, { type: st.lead, vol: st.lead === 'triangle' ? 0.12 : st.lead === 'sawtooth' ? 0.06 : 0.07, vib: st.vib, echo: st.echo, attack: st.lead === 'triangle' ? 0.02 : 0.008 });
      const low = 36 + ch.bass, fifth = 36 + ((ch.tones[2] % 12) + 12) % 12;
      if (st.bass === 'slow') { if (pos === 0) this.note(t, low, d * 7.4, { type: 'triangle', vol: 0.13, attack: 0.02, release: 0.2 }); }
      else if (st.bass === 'bounce') {
        if (pos === 0 || pos === 3) this.note(t, low, d * (pos === 0 ? 2.5 : 0.8), { type: 'triangle', vol: 0.13 });
        if (pos === 4) this.note(t, fifth, d * 2.5, { type: 'triangle', vol: 0.12 });
        if (pos === 7) this.note(t, low + 12, d * 0.8, { type: 'triangle', vol: 0.1 });
      } else if (st.bass === 'pulse') this.note(t, low + (pos % 2 ? 12 : 0), d * 0.75, { type: 'triangle', vol: 0.14 });
      const place = (tone) => { const m = 48 + tone; return m < 55 ? m + 12 : m; };
      const ext = ch.tones.concat(ch.tones[0] + 12);
      if (st.arp === 'broken') this.note(t, place(ext[[0, 2, 1, 2, 3, 2, 1, 2][pos] % ext.length]), d * 0.9, { type: st.arpWave || 'triangle', vol: 0.045, echo: st.echo });
      else if (st.arp === 'up') this.note(t, place(ext[pos % ext.length]), d * 0.55, { type: st.arpWave || 'triangle', vol: st.arpWave === 'square' ? 0.02 : 0.045 });
      else if (st.arp === 'sparse' && (pos === 0 || pos === 3 || pos === 6)) this.note(t, place(ext[pos === 0 ? 0 : pos === 3 ? 2 : 3] % 96), d * 2.4, { type: 'sine', vol: 0.06, echo: true, attack: 0.02 });
      if (st.pad && pos === 0) ch.tones.forEach((tone) => this.note(t, 60 + tone > 71 ? 48 + tone : 60 + tone, d * 7.6, { type: 'sine', vol: 0.03, attack: 0.3, release: 0.5 }));
      if (st.drums === 'soft') { if (pos === 0 || pos === 4) this.drum(t, 'kick', 0.16); if (pos % 2 === 1) this.drum(t, 'hat', 0.02); }
      if (st.drums === 'drive') { if (pos === 0 || pos === 4 || pos === 3) this.drum(t, 'kick', 0.24); if (pos === 2 || pos === 6) this.drum(t, 'snare', 0.1); this.drum(t, 'hat', pos % 2 ? 0.018 : 0.03); }
    }
    sfx(name) {
      const now = this.ac.currentTime, bus = this.master;
      const tones = { blip: [[84, 0.04]], ok: [[76, 0.05], [83, 0.09]], bump: [[45, 0.09]], heal: [[72, 0.08], [76, 0.08], [79, 0.16]], win: [[72, 0.1], [76, 0.1], [79, 0.1], [84, 0.12], [79, 0.1], [84, 0.36]] }[name];
      if (name === 'hit') { this.drum(now, 'snare', 0.16); this.note(now, 40, 0.1, { type: 'square', vol: 0.06, bus }); return; }
      (tones || []).forEach(([m, dur], i) => this.note(now + i * 0.085, m, dur, { type: 'square', vol: 0.05, bus }));
    }
  }

  return { TRACKS, compile, Synth, STEPS_PER_BAR };
})();
