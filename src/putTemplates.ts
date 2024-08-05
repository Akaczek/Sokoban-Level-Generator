export const insertMatrix = (
  larger: number[][],
  smaller: number[][],
  startX: number,
  startY: number
) => {
  let largerRows = larger.length;
  let largerCols = larger[0].length;
  let smallerRows = smaller.length;
  let smallerCols = smaller[0].length;

  // Insert the smaller matrix into the larger matrix
  for (let i = 0; i < smallerRows; i++) {
    for (let j = 0; j < smallerCols; j++) {
      let largerX = startX + i;
      let largerY = startY + j;

      // Check if the insertion point is within bounds of the larger matrix
      if (largerX < largerRows && largerY < largerCols && largerX >= 0 && largerY >= 0) {
        larger[largerX][largerY] = smaller[i][j];
      }
    }
  }
};

export const findZeros = (matrix: number[][]) => {
  const zeros = [];

  matrix.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 0) {
        zeros.push([y, x]);
      }
    });
  });

  return zeros;
}

export const putTemplates = (path: number[][], templates: number[][][]) => {
  const zerosCoords = findZeros(path);

  const steps = path.length - Math.floor(path.length / 3);

  for (let i = 0; i < steps; i++) {
    const randomZeroCoord = zerosCoords.splice(Math.floor(Math.random() * zerosCoords.length), 1)[0];
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];

    const randomShiftX = Math.floor(Math.random() * (randomTemplate[0].length - 1));
    const randomShiftY = Math.floor(Math.random() * (randomTemplate.length - 1));

    insertMatrix(path, randomTemplate, randomZeroCoord[0] - randomShiftY, randomZeroCoord[1] - randomShiftX);
  }
}
