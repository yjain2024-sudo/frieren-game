# Frieren: The Journey North

An unofficial, non-commercial fan game. A Game Boy style RPG that walks through all 28 episodes of season 1 of *Frieren: Beyond Journey's End* in 23 chapters, from the royal capital to the end of the First Class Mage Exam.

*Frieren: Beyond Journey's End* is created by Kanehito Yamada and Tsukasa Abe. This project is not affiliated with or endorsed by the rights holders. All code, pixel art, dialogue and the built in chiptune music here are original.

## Play

Open `index.html` in Chrome. No build step and no server needed.

- Arrows or WASD: move
- Z or Enter: talk and confirm
- X or Esc: pause menu (shows your current goal, chapter select)
- M: switch music

Progress saves automatically in the browser. Add `?unlock=1` to the address to open every chapter.

## Music

The game has its own original chiptune soundtrack, written for it and played live by a small synth in `js/music.js` (lead, harmony, bass, pads, echo and drums). There are eight themes, and the game switches between them by scene:

| Theme | Where it plays |
|---|---|
| The Journey North | Title screen and ending |
| Hearth and Market | Towns and cities |
| A Road With Friends | Travel on the road |
| Six Months of Winter | Snowy mountains |
| What the Mist Remembers | Caves, ruins and eerie places |
| Fifty Years Ago | Flashbacks and quiet scenes |
| Ordinary Offensive Magic | Wild battles |
| The Scales Tip | Boss battles |

If a file named `audio/music.mp3` exists next to the game, it plays that instead, and M switches between that file, the chiptune soundtrack and silence. That file is ignored by git on purpose, so a copyrighted soundtrack does not get published with the game. Add `?chip=1` to the address to always use the chiptune soundtrack.

## Check

`node tools/check.js` validates every map, proves each chapter can be finished, and simulates every boss fight.
