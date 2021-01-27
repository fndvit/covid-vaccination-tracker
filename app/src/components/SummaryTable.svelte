<script>
    import {dateDiff, approxDate, sNumber} from '../dateDiff'

    export let data;

    const ontime = data.filter(d => d.dateComplete < new Date('2021-03-23'))
        .map(d => d.ccaa);

    const late = data.filter(d => d.dateComplete >= new Date('2021-03-23') && d.dateComplete < new Date('2021-04-06'))
        .map(d => d.ccaa);

    const verylate = data.filter(d => d.dateComplete >= new Date('2021-04-06'))
        .map(d => d.ccaa);

    const toList = (arr) => {
        const last = arr.pop();
        return arr.join(', ') + ' y ' + last;
    }
</script>

<div class="summary">
    <img class="icon" src="img/ontime.svg" role="img" aria-roledescription="Comunidades dentro del plazo" alt="Icono de un temporizador mostrando el retraso en la administración de vacunas" />
    <p class='text list'><strong>Dentro del plazo previsto:</strong> {toList(ontime)}</p>

    <img class="icon" src="img/late.svg" role="img" aria-roledescription="Comunidades retrasadas en el plazo" alt="Icono de un temporizador mostrando el retraso en la administración de vacunas" />
    <p class='text list'><strong>Con retraso respecto al plazo previsto:</strong> {toList(late)}</p>

    <img class="icon" src="img/verylate.svg" role="img" aria-roledescription="Comunidades muy retrasadas en el plazo" alt="Icono de un temporizador mostrando el retraso en la administración de vacunas" />
    <p class='text list'><strong>Con mucho retraso:</strong> {toList(verylate)}</p>
</div>

<style>
    .summary {
        display: grid;
        grid-template-columns: 10% auto;
        grid-gap:1rem;
        margin: 1rem 0;
        margin-bottom:3rem;
        padding: 1rem 0;
        border-top:1px solid #DCDCDC;
        border-bottom:1px solid #DCDCDC;
    } 

    .list {
        font-size: 1rem;
        color:#000;
    }

    .icon {
        width:100%;
        margin:0;
    } 
    @media screen and (min-width: 640px) {
        .icon {
            width:80%;
            margin:0;
        } 
    } 
</style>