# Portfolio versions

The approved portfolio lives in the main Personal Portfolio folder. Its exact
starting point is the local Git tag `portfolio-v1`. This is the light/mocha
portfolio with dark mode, animated links, magnetic skills and Charminar.

The experimental design lives in `.experiments/design-experiment`, a separate
Git worktree on branch `codex/design-experiment`. Make experimental edits there,
not in the main folder. It starts with the same approved source.

Before editing in a future chat, read this note and check `git status` and
`git branch --show-current`. Do not treat experimental edits as approved until
the user explicitly selects them.

Approved preview: build in the main folder, then run
`node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4176`.

Experiment preview: run `npm ci` in `.experiments/design-experiment`, then
`node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 4177`.

The main folder stays available throughout experimentation. To abandon an
experiment, continue editing the main folder. To restore its initial tracked
files, first preserve any later work and review the `portfolio-v1` tag.

These branches and tags are local. GitHub Pages continues deploying the remote
`main` branch; do not publish experiments without the user's instruction.
