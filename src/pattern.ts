class Point {
  x: number;
  y: number;
  sizeOfMatrix: number;
  emptyDirections: string[] = ['up', 'down', 'left', 'right'];

  constructor(x: number, y: number, sizeOfMatrix: number) {
    this.x = x;
    this.y = y;
    this.sizeOfMatrix = sizeOfMatrix;
    if (x === 0) {
      this.emptyDirections = this.emptyDirections.filter(d => d !== 'left');
    }
    if (x === sizeOfMatrix - 1) {
      this.emptyDirections = this.emptyDirections.filter(d => d !== 'right');
    }
    if (y === 0) {
      this.emptyDirections = this.emptyDirections.filter(d => d !== 'up');
    }
    if (y === sizeOfMatrix - 1) {
      this.emptyDirections = this.emptyDirections.filter(d => d !== 'down');
    }
  }

  hasEmptyDirections() {
    return this.emptyDirections.length > 0;
  }

  deleteDirection(direction: string) {
    this.emptyDirections = this.emptyDirections.filter(d => d !== direction);
  }

  getDirection() {
    return this.emptyDirections[Math.floor(Math.random() * this.emptyDirections.length)];
  }
}

export const createRandomPattern = (size: number) => {
  const emptyMatrix = Array.from({ length: size }, () => Array(size).fill(1));
  const numberOfCells = size * size;

  const middle = Math.floor(size / 2);
  emptyMatrix[middle][middle] = 0;

  const startPoint = new Point(middle, middle, size);
  let growthPoints = [startPoint];

  for (let i = 0; i < numberOfCells; i++) {
    const growthPoint = growthPoints[Math.floor(Math.random() * growthPoints.length)];
    const direction = growthPoint.getDirection();

    switch (direction) {
      case 'up':
        emptyMatrix[growthPoint.x][growthPoint.y - 1] = 0;
        growthPoints.push(new Point(growthPoint.x, growthPoint.y - 1, size));
        growthPoint.deleteDirection('up');
        break;
      case 'down':
        emptyMatrix[growthPoint.x][growthPoint.y + 1] = 0;
        growthPoints.push(new Point(growthPoint.x, growthPoint.y + 1, size));
        growthPoint.deleteDirection('down');
        break;
      case 'left':
        emptyMatrix[growthPoint.x - 1][growthPoint.y] = 0;
        growthPoints.push(new Point(growthPoint.x - 1, growthPoint.y, size));
        growthPoint.deleteDirection('left');
        break;
      case 'right':
        emptyMatrix[growthPoint.x + 1][growthPoint.y] = 0;
        growthPoints.push(new Point(growthPoint.x + 1, growthPoint.y, size));
        growthPoint.deleteDirection('right');
        break;
    }

    if (!growthPoint.hasEmptyDirections()) {
      growthPoints = growthPoints.filter(p => p !== growthPoint);
    }
  }

  return emptyMatrix;
}