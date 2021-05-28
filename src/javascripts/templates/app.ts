import numerals from "roman-numerals";
import { die } from "../lib/dice";
import { cross } from "./cross";
import { State } from "../index";

const sum = (memo: number, n: number) => memo + n;

export const app = (dice: number[], i: number, state: State) => `
  <div class='frame'>
    ${cross(dice.map(die.represent))}

    <div class='worlds'>
      ${state.world
        .map(
          (instance) => `
            <div class='world ${
              state.world.indexOf(instance) === i ? "world--active" : ""
            }'>
              ${instance.map(die.represent)}
            </div>
          `
        )
        .join("")}
    </div>

    <div class='sum'>
      ${numerals.toRoman(dice.reduce(sum))}
    </div>
  </div>
`;
