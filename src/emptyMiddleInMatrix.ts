export const emptyMiddleInMatrix = (matrix: number[][]) => {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const rowStart = Math.floor(rows / 2.5);
  const rowEnd = rows - rowStart;
  const colStart = Math.floor(cols / 2.5);
  const colEnd = cols - colStart;

  for (let i = rowStart; i < rowEnd; i++) {
    for (let j = colStart; j < colEnd; j++) {
      matrix[i][j] = 0;
    }
  }
};