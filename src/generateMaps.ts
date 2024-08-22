import { generateJSONMap } from './generateMapJSON';
import { createRandomPath } from './path';
import { putTemplates } from './putTemplates';
import { emptyMiddleInMatrix } from './emptyMiddleInMatrix';
import { putOnesOnEdges } from './path';
import { templates } from './constants/templates';
import { INDEX_FILE_TEMPLATE } from './constants/constants';
import * as fs from 'fs';

export const generateMaps = (howMany: number, size: number) => {
  for (let i = 0; i < howMany; i++) {
    console.log(`Generating map ${i + 1}`);

    const path = createRandomPath(size);

    const originalPath = path.map((row) => row.slice());

    putTemplates(path, templates, originalPath);

    emptyMiddleInMatrix(path);

    putOnesOnEdges(path);

    const jsonMap = generateJSONMap(path, i + 1);

    const replacer = (key: string, value: any) => {
      if (key === 'data' && Array.isArray(value)) {
        return value.map((row) => JSON.stringify(row).replace(/,/g, ', '));
      }
      return value;
    };

    const jsonString = JSON.stringify(jsonMap, replacer, 2)
      .replace(/"\[/g, '[')
      .replace(/\]"/g, ']')
      .replace(/\\/g, '');

    fs.mkdirSync(`maps/puzzle${i + 1}`, { recursive: true });

    fs.writeFileSync(`maps/puzzle${i + 1}/map.json`, jsonString, 'utf8');

    fs.writeFileSync(
      `maps/puzzle${i + 1}/index.ts`,
      INDEX_FILE_TEMPLATE,
      'utf8'
    );
  }

  let indexFileContent = '';
  for (let i = 1; i <= howMany; i++) {
    indexFileContent += `import pzl${i} from './puzzle${i}';\n`;
  }
  indexFileContent += '\nexport default [\n';
  for (let i = 1; i <= howMany; i++) {
    indexFileContent += `  pzl${i},\n`;
  }
  indexFileContent += '];\n';

  fs.writeFileSync('maps/index.ts', indexFileContent, 'utf8');
};
