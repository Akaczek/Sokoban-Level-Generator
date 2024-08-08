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

    putTemplates(path, templates);

    emptyMiddleInMatrix(path);

    putOnesOnEdges(path);

    const jsonMap = generateJSONMap(path);

    const replacer = (key: string, value: any) => {
      if (key === 'data' && Array.isArray(value)) {
        return value.map(row => JSON.stringify(row).replace(/,/g, ', '));
      }
      return value;
    };

    const jsonString = JSON.stringify(jsonMap, replacer, 2)
      .replace(/"\[/g, '[')
      .replace(/\]"/g, ']')
      .replace(/\\/g, '');

    fs.mkdirSync(`generatedMaps/puzzle${i + 1}`, { recursive: true });

    fs.writeFileSync(
      `generatedMaps/puzzle${i + 1}/map.json`,
      jsonString,
      'utf8'
    );

    fs.writeFileSync(
      `generatedMaps/puzzle${i + 1}/index.ts`,
      INDEX_FILE_TEMPLATE,
      'utf8'
    );
  }
};
