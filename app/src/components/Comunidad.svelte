<script>
    import BarsWithBg from './charts/BarsWithBg.svelte'
    import locale from '@reuters-graphics/d3-locale';
    import {dateDiff, approxDate, sNumber} from '../dateDiff'

    export let data;
    export let height;

    let width;
    let margin = {bottom:20, top:20, left:0, right:0};
    let loc = new locale('es');

    const f = {
		x: loc.formatTime('%b %e'),
        y: loc.format(',.1d'),
        pct: loc.format(',.1f')
    }

    const diff = dateDiff(new Date('2021-03-15'), data.latest.dateComplete);

    const sentenceTarget = `Según las cifras de reparto de vacunas, ${data.latest.ccaa} vacunaría en la primera fase a unas <b>${loc.format(`,.2r`)(data.latest.sharePeople)}</b> personas.`;
    
    const sentenceDiff = (diff <= -7)
        ? `Al ritmo de vacunación actual ${data.latest.ccaa} completará la primera fase <b>${approxDate(data.latest.dateComplete)}</b>, <b>antes de la previsión de mediados de marzo</b> del Ministerio de Sanidad.`
        : ( diff <= 7 && diff > -7)
        ? 'Si continúa con el ritmo actual de vacunación, la completará <b>dentro del plazo previsto</b> por el Ministerio de Sanidad — <b>mediados de marzo</b>.'
        : ( diff > 7 && diff <= 21)
        ? `Al ritmo de vacunación actual, ${data.latest.ccaa} no la completará hasta <b>${approxDate(data.latest.dateComplete)}</b>; <b>${sNumber(Math.floor(diff / 7))} semanas más tarde</b> de lo previsto por el Ministerio de Sanidad.`
        : `Acumula <b>${sNumber(Math.floor(diff / 7))} semanas de retraso</b> respecto a la previsión del Ministerio de Sanidad y no completará esta primera fase hasta <b>${approxDate(data.latest.dateComplete)}</b>.`

    const sentence = `${sentenceTarget} ${sentenceDiff}`;

    const tardy = ( diff <= 7)
        ? 'ontime'
        : ( diff > 7 && diff <= 21)
        ? 'late'
        : 'verylate';

</script>

<li class="ccaa">
    <div class='numbers'>
        <h2>{data[0].ccaa}</h2>
        <p class='number'>{f.y(data[0].entregadas)}</p>
        <p class='number bold'>{f.y(data[0].administradas)}</p>
        <p class='number bold'>{f.pct(data[0].admin_entregadas)}%</p>
        <p class='number'>{f.y(data[0].vacuna_completa)}</p>
    </div>
    <div class='chart' style='height:{height + margin.top + margin.bottom}' bind:clientWidth={width}> 
        <BarsWithBg {data} {width} height={height + margin.top + margin.bottom} key={{x: 'fecha', y: 'administradas', bg: 'entregadas' }} format={f} {margin} />
    </div>
    <div class='estimates'>
        <h3>Nuestros cálculos</h3>
        <p class='text'>{@html sentence}</p>
        <img class="icon" src="img/{tardy}.svg" role="img" aria-roledescription={approxDate(data.latest.dateComplete)} alt="Icono de un temporizador mostrando el retraso en la administración de vacunas en ${data.latest.ccaa} " />
    </div>
</li>

<style>
    h2, h3, .number {
        margin:0;
        padding:0;
    }
    h2, .number { font-size: 1.15rem;}
    h3 { 
        font-size: 1rem;
        color: #505050;
    }
    h2, h3 { font-weight: 600;}
    .icon { width: 50%;}
    .numbers {
        padding:.5rem 0;
        border-top: 1px solid #dcdcdc;
        position:sticky;
        top:0;
        background-color: #f2f2f2;
        z-index:10;
    }
    .number {
        text-align: right;
        font-variant-numeric: tabular-nums;
    }
    .numbers {
        display: grid;
        grid-template-columns: 20% auto auto auto auto;
    }
    .estimates {
        display: grid;
        gap: 1rem;
        grid-template-columns: 10% 70% auto;
    }
    .chart {
        width:100%;
    }
    @media screen and (min-width: 640px) {
		.numbers {
            display: grid;
            grid-template-columns: 20% auto auto auto auto;
        }
	}
</style>