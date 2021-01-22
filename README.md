# Tracking COVID-19 vaccination in Spain
The project has two folders, `app` and `data`.

To do:
* Transform data (to visualize it)
* Combine it with population data by age groups
* Visualize it —obviously
* Export data in multiple reusable formats

*(We'll add a more detailed 'to do' later ...)*

## Data
To generate the data simply install and run the node app.
```
npm install
node index.js
```
It will output a fresh `JSON` file to `app/public/`.

The data comes from the `.ods` files that the [Health Alert and Emergency Coordination Centre (CCAES in Spanish)](https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov/vacunaCovid19.htm) has published daily since January 4.

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

