import { JSONMapTemplate } from './constants/JSONMapTemplate';
import { fieldsToSetInMap, fieldsToSetInLayer } from './constants/constants';

export const generateJSONMap = (map: number[][], mapNumber: number) => {
  const size = map.length;

  const mapJSON = JSON.parse(JSON.stringify(JSONMapTemplate));

  fieldsToSetInMap.forEach(field => {
    mapJSON[field] = size;
  });

  mapJSON.layers.forEach((layer) => {
    fieldsToSetInLayer.forEach(field => {
      if (field === 'data') {
        layer[field] = map;
        return;
      }

      layer[field] = size;
    });
  });

  mapJSON.tilesets[1].name = `blocks${mapNumber}`;

  return mapJSON;
}