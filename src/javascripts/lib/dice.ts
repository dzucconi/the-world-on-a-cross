import { die as template } from "../templates/die";

const roll = (faces: number[]) =>
  faces[Math.floor(Math.random() * faces.length)];

export const die = {
  roll: (n = 2, faces = [1, 2, 3, 4, 5, 6]) => {
    const out: number[] = [];

    for (var i = n - 1; i >= 0; i--) {
      out.push(roll(faces));
    }

    return out;
  },

  represent: (value: number) => `
    <div class='face'>
      ${template[value]}
    </div>
  `,
};
