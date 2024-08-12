import fs from 'fs';
import path from 'path';

export const flattenMap = () => {
  const mapsDir = 'maps';

  fs.readdir(mapsDir, (err, subdirs) => {
    if (err) throw err;

    subdirs.forEach((subdir) => {
      const subdirPath = path.join(mapsDir, subdir);
      const mapFilePath = path.join(subdirPath, 'map.json');

      if (fs.statSync(subdirPath).isDirectory() && fs.existsSync(mapFilePath)) {
        fs.readFile(mapFilePath, 'utf8', (err, data) => {
          if (err) throw err;

          const lines = data.split('\n');
          const modifiedLines = lines.map((line) => {
            if (
              (line.includes('[') || line.includes(']')) &&
              line.includes('1')
            ) {
              return line.replace(/\[/g, '').replace(/\]/g, '');
            }
            return line;
          });

          fs.writeFile(mapFilePath, modifiedLines.join('\n'), 'utf8', (err) => {
            if (err) throw err;
            console.log(
              `The file ${mapFilePath} has been modified line by line.`
            );
          });
        });
      }
    });
  });
};
