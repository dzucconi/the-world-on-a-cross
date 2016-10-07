import numerals from 'roman-numerals';
import die from '../lib/dice';
import cross from './cross';

const sum = (memo, n) => memo + n;

export default (dice, i, state) => `
  <div class='frame'>
    ${cross(dice.map(die.represent))}

    <div class='worlds'>
      ${state.world.map(instance => `
        <div class='world ${state.world.indexOf(instance) === i ? 'world--active' : ''}'>
          ${instance.map(die.represent)}
        </div>
      `).join('')}
    </div>

    <div class='sum'>
      ${numerals.toRoman(dice.reduce(sum))}
    </div>
  </div>
`;
