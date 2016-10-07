import die from './lib/dice';
import draw from './lib/draw';
import app from './templates/app';

const CONFIG = {
  fps: 12,
};

const DOM = {
  app: document.getElementById('app'),
};

const STATE = {
  world: [],
  frame: 0,
  frames: [],
};

const build = faces =>
  die.roll(6, faces);

const isUniform = faces =>
  faces.every(face => face === faces[0]);

const descend = (seed = [1, 2, 3, 4, 5, 6], cb) => {
  const faces = build(seed);
  if (cb) cb(faces);
  return isUniform(faces) ? faces : descend(faces, cb);
};

const step = (curr, length) =>
  curr + 1 < length ? curr + 1 : 0;

const regenerate = state => {
  state.frame = 0;

  state.world = [[1, 2, 3, 4, 5, 6]];
  descend(state.world[0], faces =>
    state.world.push(faces));

  state.frames = state.world.map((dice, i) =>
    app(dice, i, state));

  return state;
};

export default () => {
  // Build initial state
  regenerate(STATE);

  // Run
  draw(CONFIG.fps, () => {
    // Render the stage
    DOM.app.innerHTML = STATE.frames[STATE.frame];

    // Update the state
    STATE.frame = step(STATE.frame, STATE.frames.length);

    // Regenerate the state
    if (STATE.regenerate) regenerate(STATE);

    // Mark regenerate for next loop
    STATE.regenerate = (STATE.frame + 1 === STATE.frames.length);
  })();
};
