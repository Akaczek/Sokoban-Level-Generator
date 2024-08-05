import { createRandomPattern } from './pattern';

export const createRandomPath = (size: number) => {
  const emptyMatrix = Array.from({ length: size }, () => Array(size).fill(1));

  const randomPattern = createRandomPattern(size - 2);

  const directions = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: -1 },
    { x: -1, y: 1 },
    { x: 1, y: -1 },
    { x: 1, y: 1 }
  ];

  randomPattern.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 0) {
        directions.forEach((direction) => {
          const newX = x + direction.x;
          const newY = y + direction.y;

          if (newX < 0 || newY < 0 || newX >= size - 2 || newY >= size - 2) {
            emptyMatrix[newY + 1][newX + 1] = 0;
          } else {
            if (randomPattern[newY][newX] === 1) {
              emptyMatrix[newY + 1][newX + 1] = 0;
            }
          }
        });
      }
    });
  });

  return emptyMatrix;
};
