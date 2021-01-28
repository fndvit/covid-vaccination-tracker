const fetch = require('node-fetch');
const xlsx = require('xlsx');
const d3time = require('d3-time-format');
const fs = require('fs');
const groupby = require('lodash/groupBy');
const d2lIntl = require('d2l-intl');

//List of days since January 4, 2021, the first date with data
const listDates = (start, end) => {
    let arr;
    for (arr=[], dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(d3time.timeFormat('%Y-%m-%d')(new Date(dt)));
    }
    return arr;
};
const days = listDates(new Date('2021-01-04'), new Date());

//Unfortunately different days have different number of columns (worksheet ranges)
const schema = [
    {
        date: new Date('2021-01-04'),
        header: ['ccaa', 'entregadas', 'administradas', 'admin_entregadas', 'hasta']
    },
    {
        date: new Date('2021-01-14'),
        header: ['ccaa', 'pfizer', 'moderna', 'entregadas', 'administradas', 'admin_entregadas', 'hasta']
    },
    {
        date: new Date('2021-01-17'),
        header: ['ccaa', 'pfizer', 'moderna', 'entregadas', 'administradas', 'admin_entregadas', 'vacuna_completa', 'hasta']
    }
];

const find = (arr, fn) => {
    return arr.slice().reverse().find(fn)
}

//Base URL of the OpenDocument Spreadsheets
const baseUrl = 'https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov/documentos/Informe_Comunicacion_'

//Output folder in the Svelte app
const pathTo = '../app/public/'

const parser = new d2lIntl.NumberParse('es-ES');

Promise.all(
    days.reverse().map(date => 
        fetch(`${baseUrl}${date.replace(/-/g,'')}.ods`)
            .then(res => res.buffer())
            .then(data => {
                const headers = find(schema, d => d.date <= new Date(date)).header;

                const workbook = xlsx.read(data, {type:'buffer'});
                const json = xlsx.utils.sheet_to_json(workbook.Sheets.Hoja3, {raw: false, range: 1, header:headers});
                json.map(d=> {
                    d.fecha = d3time.timeParse('%Y-%m-%d')(date);
                    d.hasta = d3time.timeParse('%d/%m/%Y')(d.hasta);
                    d.ccaa = sanitizeName(d.ccaa);
                    return {...d}
                })

                return json;
            })
  )).then(json => transform(json));

  const transform = (json) => {
    json.flat().forEach(d => {
        d.entregadas = parser.parse(d.entregadas);
        d.pfizer = (d.pfizer) ? parser.parse(d.pfizer) : '';
        d.moderna = (d.moderna) ? parser.parse(d.moderna) : '';
        d.administradas = parser.parse(d.administradas);
        d.admin_entregadas = (d.admin_entregadas) ? parser.parse(d.admin_entregadas) : '';
        d.vacuna_completa = (d.vacuna_completa) ? parser.parse(d.vacuna_completa) : '';
    })

    const data = groupby(json.flat(), d => d.ccaa);
    writeJSON(data, 'data');
    writeCSV(data, 'data');
  }

  const writeJSON = (json, filename) => {
    let data = JSON.stringify(json, null, 2);

    fs.writeFile(`${pathTo}${filename}.json`, data, (err) => {
        if (err) throw err;
        console.log(`Yay!! You can find ${filename}.json in ${pathTo}`);
    });
  }

  const writeCSV = (json, filename) => {
    const items = Object.values(json).flat();
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(items[0]);
    const csv = [
      header.join(','),
      ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n')

    fs.writeFile(`${pathTo}${filename}.csv`, csv, (err) => {
        if (err) throw err;
        console.log(`Yay!! You can find ${filename}.csv in ${pathTo}`);
    });
  }

  const sanitizeName = (ccaa) => {
    const original = ['Aragón','Murcia ','Castilla y Leon ','Canarias','Castilla La Mancha',' Asturias ','Galicia','Andalucía','Ceuta','Melilla','Baleares','Extremadura',' Madrid','Cantabria','C. Valenciana','Navarra','Cataluña','La Rioja','País Vasco']
    const sanitized = ['Aragón','Murcia','Castilla y León','Canarias','Castilla-La Mancha',' Asturias ','Galicia','Andalucía','Ceuta','Melilla','Baleares','Extremadura',' Madrid','Cantabria','Com. Valenciana','Navarra','Cataluña','La Rioja','País Vasco']
    const i = original.findIndex(d => d === ccaa)
    return sanitized[i]
  }

//Download file to destination folder, we'll need this to backup all spreadsheets in case Ministerio de Sanidad takes them offline
  const download = (url, dest, cb) => {
    const file = fs.createWriteStream(dest);
    http.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(cb);
      });
    });
  }