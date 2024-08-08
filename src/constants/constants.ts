export const fieldsToSetInMap = ['height', 'width'];

export const fieldsToSetInLayer = ['height', 'width', 'data'];

export const INDEX_FILE_TEMPLATE = `
import map from './map.json';
import tileset from './pzl.png';

export default {
  map,
  tileset
};`;
