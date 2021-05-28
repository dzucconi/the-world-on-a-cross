export const cross = (dice: string[]) => `
  <div class='dice'>
    <div class='row'>${dice[4]}</div>
    <div class='row'>${dice[3]}${dice[0]}${dice[2]}</div>
    <div class='row'>${dice[1]}</div>
    <div class='row'>${dice[5]}</div>
  </div>
`;
