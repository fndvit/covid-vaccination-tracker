<script>
    import {dateDiff, approxDate, sNumber} from '../dateDiff'

    export let data;

    const ontime = data.filter(d => dateDiff(new Date('2021-03-16'), d.dateComplete) <= 7 )
        .map(d => `<a class='link' role='link' href='#${d.ccaa}' aria-label='Enlace al gráfico de ${d.ccaa}'>${d.ccaa}</a>`);

    const late = data.filter(d => dateDiff(new Date('2021-03-16'), d.dateComplete) > 7 && dateDiff(new Date('2021-03-16'), d.dateComplete) <= 21)
        .map(d => `<a class='link' role='link' href='#${d.ccaa}' aria-label='Enlace al gráfico de ${d.ccaa}'>${d.ccaa}</a>`);

    const verylate = data.filter(d => dateDiff(new Date('2021-03-16'), d.dateComplete) > 21)
        .map(d => `<a class='link' role='link' href='#${d.ccaa}' aria-label='Enlace al gráfico de ${d.ccaa}'>${d.ccaa}</a>`);

    
    const toList = (arr) => {
        const _arr = [...arr];
        const last = _arr.pop();
        return (arr.length > 1)
            ? _arr.join(', ') + ' y ' + last
            : (arr.length === 1)
            ? last
            : 'Ninguna';
    }
</script>

<div class="summary" role='navigation'>
    <img class="icon" src="img/ontime.svg" role="img" aria-roledescription="Comunidades dentro del plazo" aria-label="Icono de un temporizador mostrando que está dentro del plazo previsto" alt="Icono de un temporizador mostrando que está dentro del plazo previsto" />
    <p class='text list'><strong>Dentro del plazo previsto:</strong> {@html toList(ontime)}</p>

    <img class="icon" src="img/late.svg" role="img" aria-roledescription="Comunidades retrasadas en el plazo" aria-label="Icono de un temporizador mostrando retraso en la administración de vacunas"  alt="Icono de un temporizador mostrando retraso en la administración de vacunas" />
    <p class='text list'><strong>Con retraso respecto al plazo previsto:</strong> {@html toList(late)}</p>

    <img class="icon" src="img/verylate.svg" role="img" aria-roledescription="Comunidades muy retrasadas en el plazo" aria-label="Icono de un temporizador mostrando mucho retraso en la administración de vacunas"  alt="Icono de un temporizador mostrando mucho retraso en la administración de vacunas" />
    <p class='text list'><strong>Con mucho retraso:</strong> {@html toList(verylate)}</p>
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