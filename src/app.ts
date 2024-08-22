import { generateMaps } from './generateMaps';
import { flattenMap } from './utils/flattenMap';

if (process.argv.length < 4) {
  console.log('Usage: node dist/app.js <how-many> <size>');
  process.exit(1);
}

if (isNaN(parseInt(process.argv[2])) || isNaN(parseInt(process.argv[3]))) {
  console.log('Arguments must be integers');
  process.exit(1);
}

if (parseInt(process.argv[2]) < 1 || parseInt(process.argv[3]) < 1) {
  console.log('Arguments must be greater than 0');
  process.exit(1);
}

const start = performance.now();

const HOW_MANY = parseInt(process.argv[2]);
const SIZE = parseInt(process.argv[3]);

generateMaps(HOW_MANY, SIZE);

flattenMap();

const end = performance.now();

console.log(`Size of each map: ${SIZE}`);
console.log(`Execution time: ${end - start} ms`);