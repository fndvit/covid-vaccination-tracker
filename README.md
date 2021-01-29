![Generate data daily](https://img.shields.io/github/workflow/status/fndvit/covid-vaccination-tracker/Generate%20data%20daily?label=generate-data)
![Deploy to GitHub pages](https://img.shields.io/github/workflow/status/fndvit/covid-vaccination-tracker/Deploy%20to%20GitHub%20Pages?label=deploy)
![Updated](https://img.shields.io/github/last-commit/fndvit/covid-vaccination-tracker)
![License](https://img.shields.io/github/license/fndvit/covid-vaccination-tracker)

# Tracking COVID-19 vaccination in Spain
[**The project is live here!!**](https://vacunas.fndvit.org/)

## To do (prioritized):

- [x] Transform data (to visualize it)
- [x] Visualize it —obviously
- [x] Export data in multiple reusable formats
- [x] Calculate expected dates based on the current progress of the rollout (implemented in the app)
- [x] Correct Github Action to generate data daily (not working properly now)
- [x] Sanitize names of regions
- [x] Download `.ods` files to repo in case they take them offline —see `/spreadsheets`
- [ ] Add expected dates to data output instead of calculating in the browser
- [ ] Sanitize dates. Canarias and Baleares have wrong dates on a couple of places, and some regions have extra spaces.
- [ ] Separate latest data and historical data into two files —or maybe two objects in the same `JSON`
- [ ] Translate docs to Catalan and Spanish
- [ ] Combine it with population data by age groups

*(We'll continue to add a detailed 'to do')*

## App
It has its own separate [README.md](https://github.com/fndvit/covid-vaccination-tracker/tree/main/app)

## Data
To generate the data simply install and run the node app.
```
npm install
node index.js
```
It outputs two fresh [`JSON`](https://raw.githubusercontent.com/fndvit/covid-vaccination-tracker/main/app/public/data.json) and [`CSV`](https://raw.githubusercontent.com/fndvit/covid-vaccination-tracker/main/app/public/data.csv) files to `app/public/`. (It's good to know you have options.)

* `JSON` [raw](https://raw.githubusercontent.com/fndvit/covid-vaccination-tracker/main/app/public/data.json) and [preview](https://github.com/fndvit/covid-vaccination-tracker/blob/main/app/public/data.json)
* `CSV` [raw](https://raw.githubusercontent.com/fndvit/covid-vaccination-tracker/main/app/public/data.csv) and [preview](https://github.com/fndvit/covid-vaccination-tracker/blob/main/app/public/data.csv)

The data comes from the `.ods` files that the [Health Alert and Emergency Coordination Centre (CCAES in Spanish)](https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov/vacunaCovid19.htm) has published daily since January 4.

We are also backing up the `spreadsheets` in case they take them offline.

**Important!** A few dates in the `Fecha de la última vacuna registrada` column (renamed as `hasta` in our data) are wrong —for Baleares and Canarias. Until they fix it —or we write something to catch that— use `fecha` which is the date of the report.

We renamed the columns as:

 | | Dosis entregadas Pfizer (1) | Dosis entregadas Moderna (1) | Total Dosis entregadas (1) | Dosis administradas (2) | % sobre entregadas | Nº Personas vacunadas (pauta completada) | Fecha de la última vacuna registrada (2) 
:--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- 
 ccaa | pfizer | moderna | entregadas | administradas | admin_entregadas | vacuna_completa | hasta 
*String* | *Integer* | *Integer* | *Integer* | *Integer*  | *Integer*  | *Integer*  | *Date*

The columns have already changed three times. In the event they add new colums —for newly authorized vaccines, for example— we will add  a new schema to the set (in `index.js`):

```javascript
const schema = [
    {
        date: new Date('2021-01-04'),
        headers: ['ccaa', 'entregadas', 'administradas', 'admin_entregadas', 'hasta']
    },
    {
        date: new Date('2021-01-14'),
        headers: ['ccaa', 'pfizer', 'moderna', 'entregadas', 'administradas', 'admin_entregadas', 'hasta']
    },
    {
        date: new Date('2021-01-17'),
        headers: ['ccaa', 'pfizer', 'moderna', 'entregadas', 'administradas', 'admin_entregadas', 'vacuna_completa', 'hasta']
    }
];
```

# Additional sources
* [Actualización de la Estrategia de Vacunación](https://www.mscbs.gob.es/profesionales/saludPublica/prevPromocion/vacunaciones/covid19/docs/COVID-19_Actualizacion2_EstrategiaVacunacion.pdf)
* [Nota de prensa de Moncloa del 18 de enero](https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/sanidad14/Paginas/2021/180121-residentes_sanitarios.aspx)
* [Nota de prensa de Moncloa del 12 de enero](https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/sanidad14/Paginas/2021/120121-moderna.aspx)

