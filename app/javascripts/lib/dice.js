import template from '../templates/die';

const roll = faces =>
  faces[Math.floor((Math.random() * faces.length))];

export default {
  roll: (n = 2, faces = [1, 2, 3, 4, 5, 6]) => {
    const out = [];

    for (var i = n - 1; i >= 0; i--) {
      out.push(roll(faces));
    }

    return out;
  },

  represent: value => `
    <div class='face'>
      ${template[value]}
    </div>
  `,
};
