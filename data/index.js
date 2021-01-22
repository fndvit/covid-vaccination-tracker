const fetch = require('node-fetch');
const xlsx = require('xlsx');
const d3time = require('d3-time-format');
const fs = require('fs');
const aq = require('arquero');

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

Promise.all(
    days.map(date => 
        fetch(`${baseUrl}${date.replaceAll('-','')}.ods`)
            .then(res => res.buffer())
            .then(data => {
                const headers = find(schema, d => d.date <= new Date(date)).header;

                const workbook = xlsx.read(data, {type:'buffer'});
                const json = xlsx.utils.sheet_to_json(workbook.Sheets.Hoja3, {raw: false, range: 1, header:headers});
                json.map(d=> {
                    d.hasta = d3time.timeParse('%d/%m/%Y')(d.hasta)
                    d.fecha = d3time.timeParse('%Y-%m-%d')(date);
                    return {...d}
                })

                return json;
            })
  )).then(data => write(data, 'data'));


//   const transform = (data) => {

//   }

  const write = (json, filename) => {
    let data = JSON.stringify(json, null, 2);

    fs.writeFile(`${pathTo}${filename}.json`, data, (err) => {
        if (err) throw err;
        console.log(`Yay!! You can find ${filename}.json in ${pathTo}`);
    });
  }