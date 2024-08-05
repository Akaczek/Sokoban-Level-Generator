import { createRandomPath } from './path';
import { templates } from './constants/templates';
import { putTemplates } from './putTemplates';
import { emptyMiddleInMatrix } from './emptyMiddleInMatrix';

const path = createRandomPath(15);

putTemplates(path, templates);

emptyMiddleInMatrix(path);

path.forEach(row => {
  console.log(row.join(' '));
});