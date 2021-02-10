const fetch = require('node-fetch');
const xlsx = require('xlsx');
const dir = require('node-dir');
const https = require('https');
const d3time = require('d3-time-format');
const fs = require('fs');
const {writeCSV, writeJSON} = require('./utils/write');
const {listDates, find, download, dateDiff, approxDate, sNumber} = require('./utils/utils');
const groupby = require('lodash/groupBy');
const d2lIntl = require('d2l-intl');
const {extent} = require('d3-array');

//List of days since January 4, 2021, the first date with data
const days = listDates(new Date('2021-01-04'), new Date());

//Total vaccines Pfizer + Moderna
const totalVacc = 5190735;

//Target population for Phase 1
const target = 2447000;

//Base URL of the OpenDocument Spreadsheets
const baseUrl = 'https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov/documentos/Informe_Comunicacion_'

//BACKUP SPREADSHEETS
//Only if there's a spreadsheet on that day and check if it exists already in the folder
const outdir = './spreadsheets';
if (!fs.existsSync(outdir)) fs.mkdirSync(outdir);

days.reverse().forEach(date => {
  const filename = `${date.replace(/-/g,'')}.ods`
  if(fs.existsSync(`${outdir}/informe_${filename}`)) {
    console.log(`🛑 informe_${filename} already exists!`)
  } else {
    download(`${baseUrl}${filename}`, `${outdir}/informe_${filename}`, () => {
      console.log('✅ Done!')
    })
  }
})

//SANITIZE SPREADSHEETS
//Unfortunately different days have different numbers of columns (worksheet ranges)
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
    },
    {
      date: new Date('2021-02-09'),
      header: ['ccaa', 'pfizer', 'moderna', 'astrazeneca', 'entregadas', 'administradas', 'admin_entregadas', 'vacuna_completa', 'hasta']
  }
];

//Some regions' names have extra spaces, missing accents, hyphens ... We should write a better function :/
const sanitizeName = (ccaa) => {
  const original = ['Aragón','Murcia ','Castilla y Leon ','Canarias','Castilla La Mancha','Asturias ','Galicia','Andalucía','Ceuta','Melilla','Baleares','Extremadura','Madrid','Cantabria','C. Valenciana','Navarra','Cataluña','La Rioja','País Vasco', 'Totales']
  const sanitized = ['Aragón','Murcia','Castilla y León','Canarias','Castilla-La Mancha','Asturias','Galicia','Andalucía','Ceuta','Melilla','Baleares','Extremadura','Madrid','Cantabria','Com. Valenciana','Navarra','Cataluña','La Rioja','País Vasco','Totales']
  const i = original.findIndex(d => d === ccaa)
  return (sanitized[i] !== undefined) ? sanitized[i] : ccaa;
}

const sanitizeDate = (date, date2) => {
  if (date !== null) {
    const diff = Math.round(dateDiff(date, date2) / (365/12));
    if (Math.abs(diff) > 1) {
      date = new Date(date);
      date.setMonth(date.getMonth() + diff);
    }
    return date;
  }
  
}

//FETCH THE SPREADSHEETS
//Output folder in the Svelte app
const pathTo = '../app/public/'

//Number parser for Spanish numbers like -> 1.000,00
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
                    d.hasta = sanitizeDate(d.hasta, d.fecha);
                    d.ccaa = sanitizeName(d.ccaa);
                    return {...d}
                })

                return json;
            })
  )).then(json => transform(json));

const transform = (json) => {

  json.flat().forEach(d => {
      d.entregadas = parser.parse(d.entregadas);
      d.entregadas = (d.astrazeneca) ? d.entregadas - d.astrazeneca : d.entregadas;
      d.pfizer = (d.pfizer) ? parser.parse(d.pfizer) : '';
      d.moderna = (d.moderna) ? parser.parse(d.moderna) : '';
      d.administradas = parser.parse(d.administradas);
      d.administradas = (d.astrazeneca) ? d.administradas - d.astrazeneca : d.administradas;
      d.admin_entregadas = (d.admin_entregadas) ? parser.parse(d.admin_entregadas) : '';
      d.admin_entregadas = (d.astrazeneca) ? d.administradas/d.entregadas * 100 : d.admin_entregadas;
      d.vacuna_completa = (d.vacuna_completa) ? parser.parse(d.vacuna_completa) : '';
  });

  const range = extent(json.flat(), d => d.fecha);
  const dateRange = dateDiff(range[0], range[1]);
  const latestNumbers = Object.values(json)
		.flat()
		.sort((a, b) => b.fecha - a.fecha)
    .slice(0,20);
    
  const totalCurrent = latestNumbers.find(d => d.ccaa === 'Totales' ).entregadas;

  latestNumbers.map(d => {
			const share = d.entregadas / totalCurrent;
			d.poblacion_diana = Math.round(share * target);
			const daily = d.administradas / dateRange;
			const vaccinesLeft = d.poblacion_diana * 2 - d.administradas;
			d.fecha_completa  = new Date(d.fecha);
      d.fecha_completa.setDate(d.fecha.getDate() + 1 * (vaccinesLeft / daily ) )
      d.fecha_completa = approxDate(d.fecha_completa )
			return {...d}
	});

  const data = groupby(json.flat(), d => d.ccaa);
  writeJSON(latestNumbers, 'data_latest', pathTo);
  writeJSON(data, 'data', pathTo);
  writeCSV(data, 'data', pathTo);
}
