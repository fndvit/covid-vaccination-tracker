const https = require('https');
const fs = require('fs');
const d3time = require('d3-time-format');
const locale = require('@reuters-graphics/d3-locale')

const listDates = (start, end) => {
    let arr;
    for (arr=[], dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(d3time.timeFormat('%Y-%m-%d')(new Date(dt)));
    }
    return arr;
};

const find = (arr, fn) => {
    return arr.slice().reverse().find(fn)
}

const download = (url, dest, cb) => {
    https.get(url, res => {
      const s = res.statusCode;
      if(s !== 404) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close(cb);
        });
      }
    });
}

let loc = new locale('es');

const dateDiff = (start, end) => {
    const difference = end.getTime() - start.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24));
    return days;
}

const approxDate = (date) => {

    const day = (date.getDate() < 11)
    ? 'principios'
    : (date.getDate() >= 11 && date.getDate() <= 19)
    ? 'mediados'
    : 'finales'

    return `${day} de ${loc.formatTime('%B')(new Date(2021, date.getMonth(), 1))}`
}

const sNumber = (n, g) => {
    const spell = [(g === 'f') ? 'ninguna' : 'ningún', (g === 'f') ? 'una' : 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve']
    return (n < 10) ? spell[n] : n;
}

module.exports = { listDates, find, download, dateDiff, approxDate, sNumber }