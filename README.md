# Frieren: The Journey North

An unofficial, non-commercial fan game. A Game Boy style RPG that walks through all 28 episodes of season 1 of *Frieren: Beyond Journey's End* in 23 chapters, from the royal capital to the end of the First Class Mage Exam.

*Frieren: Beyond Journey's End* is created by Kanehito Yamada and Tsukasa Abe. This project is not affiliated with or endorsed by the rights holders. All code, pixel art, dialogue and the built in chiptune music here are original.

## Play

Open `index.html` in Chrome. No build step and no server needed.

- Arrows or WASD: move
- Z or Enter: talk and confirm
- X or Esc: pause menu (shows your current goal, chapter select)
- M: music on and off

Progress saves automatically in the browser. Add `?unlock=1` to the address to open every chapter.

## Music

The game plays its own chiptune music by default. If a file named `audio/music.mp3` exists, the game plays that instead, starting on your first key press. That file is ignored by git on purpose, so a copyrighted soundtrack does not get published with the game.

## Check

`node tools/check.js` validates every map, proves each chapter can be finished, and simulates every boss fight.
