import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';

export const processCSV = (filePath: string): Promise<any[]> => {
  const data: any[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(path.resolve(filePath))
      .pipe(csvParser())
      .on('data', (row) => {
        data.push(row);
      })
      .on('end', () => {
        resolve(data);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};
