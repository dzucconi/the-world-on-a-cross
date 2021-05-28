import { FrameInterval } from "frame-interval";
import { die } from "./lib/dice";
import { app } from "./templates/app";

const CONFIG = {
  fps: 12,
};

const ROOT = document.getElementById("root");

export type State = {
  world: number[][];
  frame: number;
  frames: string[];
  regenerate: boolean;
};

const STATE: State = {
  world: [],
  frame: 0,
  frames: [],
  regenerate: undefined,
};

const build = (faces: number[]) => die.roll(6, faces);

const isUniform = (faces: number[]) =>
  faces.every((face: number) => face === faces[0]);

const descend = (seed = [1, 2, 3, 4, 5, 6], cb: (faces: number[]) => void) => {
  const faces = build(seed);
  if (cb) cb(faces);
  return isUniform(faces) ? faces : descend(faces, cb);
};

const step = (curr: number, length: number) =>
  curr + 1 < length ? curr + 1 : 0;

const regenerate = (state: State) => {
  state.frame = 0;

  state.world = [[1, 2, 3, 4, 5, 6]];
  descend(state.world[0], (faces: number[]) => state.world.push(faces));

  state.frames = state.world.map((dice, i) => app(dice, i, state));

  return state;
};

// Build initial state
regenerate(STATE);

// Run
const fi = new FrameInterval(CONFIG.fps, () => {
  // Render the stage
  ROOT.innerHTML = STATE.frames[STATE.frame];

  // Update the state
  STATE.frame = step(STATE.frame, STATE.frames.length);

  // Regenerate the state
  if (STATE.regenerate) regenerate(STATE);

  // Mark regenerate for next loop
  STATE.regenerate = STATE.frame + 1 === STATE.frames.length;
});

fi.start();
