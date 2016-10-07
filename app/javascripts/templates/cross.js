export default dice => `
  <div class='dice'>
    <div class='row'>${dice[0]}</div>
    <div class='row'>${dice[1]}${dice[2]}${dice[3]}</div>
    <div class='row'>${dice[4]}</div>
    <div class='row'>${dice[5]}</div>
  </div>
`;
