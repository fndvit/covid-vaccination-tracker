const fs = require('fs');

const writeJSON = (data, filename, dest) => {
    let _data = JSON.stringify(data, null, 2);
    fs.writeFile(`${dest}${filename}.json`, _data, (err) => {
        if (err) throw err;
        console.log(`Yay!! You can find ${filename}.json in ${dest}`);
    });
  }

const writeCSV = (data, filename, dest) => {
  const items = Object.values(data).flat();
  const replacer = (key, value) => value === null ? '' : value;
  const header = Object.keys(items[0]);
  const csv = [
    header.join(','),
    ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
  ].join('\r\n')
  fs.writeFile(`${dest}${filename}.csv`, csv, (err) => {
      if (err) throw err;
      console.log(`Yay!! You can find ${filename}.csv in ${dest}`);
  });
}

module.exports = { writeJSON, writeCSV }