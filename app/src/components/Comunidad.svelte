<script>
    import BarsWithBg from './charts/BarsWithBg.svelte'
    import locale from '@reuters-graphics/d3-locale';
    import {dateDiff, approxDate, sNumber} from '../dateDiff'

    export let data;
    export let height;

    let width;
    let margin = {bottom:20, top:20, left:4, right:4};
    const loc = new locale('es');

    const f = {
		x: loc.formatTime('%b %e'),
        y: loc.format(',.1d'),
        pct: loc.format(',.1f')
    }

    const diff = dateDiff(new Date('2021-03-16'), data.latest.dateComplete);

    const sentenceTarget = `${data.latest.ccaa} vacunará a <strong>${loc.format(`,.2r`)(data.latest.shareTarget)}</strong> personas en esta primera fase, según el reparto de vacunas actual.`;
    const sentenceDiff = (diff <= -7)
        ? `Al ritmo de vacunación actual, ${data.latest.ccaa} completará la primera fase <strong>${approxDate(data.latest.dateComplete)}</strong>, <strong>antes de la previsión de mediados de marzo</strong> del Ministerio de Sanidad.`
        : ( diff <= 7 && diff > -7)
        ? 'Si continúa con el mismo ritmo de vacunación, completará la primera fase <strong>dentro del plazo previsto</strong> por el Ministerio de Sanidad de <strong>mediados de marzo</strong>.'
        : ( diff > 7 && diff <= 21)
        ? `No completará la primera fase hasta <strong>${approxDate(data.latest.dateComplete)}</strong>; <strong>${sNumber(Math.floor(diff / 7), 'f')} ${(Math.floor(diff / 7) === 1) ? 'semana' : 'semanas'} más tarde</strong> de lo previsto por el Ministerio de Sanidad.`
        : `Acumula <strong>${sNumber(Math.floor(diff / 7), 'f')} semanas de retraso</strong> respecto a la previsión del Ministerio de Sanidad y no completará esta primera fase hasta <strong>${approxDate(data.latest.dateComplete)}</strong>.`
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
        <p class='number'><strong>{f.y(data[0].administradas)}</strong></p>
        <p class='number'><strong>{f.pct(data[0].admin_entregadas)}%</strong></p>
        <p class='number'>{f.y(data[0].vacuna_completa)}</p>
    </div>
    <p class="date">Última vacuna registrada a {loc.formatTime('%e de %B')(data.latest.hasta)}</p>
    <div class='chart' style='height:{height + margin.top + margin.bottom}' bind:clientWidth={width}> 
        <BarsWithBg {data} {width} height={height + margin.top + margin.bottom} key={{x: 'fecha', y: 'administradas', bg: 'entregadas' }} format={f} {margin} />
    </div>
    <div class='estimates'>
        <p class='indent text'>{@html sentence}</p>
        <img class="icon" src="img/{tardy}.svg" role="img" aria-roledescription={approxDate(data.latest.dateComplete)} alt="Icono de un temporizador mostrando el retraso en la administración de vacunas en ${data.latest.ccaa} " />
    </div>
    {#if data[0].admin_entregadas > 100}
        <p class='indent text'>¿Cómo se pueden administrar más del 100% de las vacunas entregadas? Cada vial entregado computa como cinco dosis, pero con <a href='https://www.europarl.europa.eu/doceo/document/P-9-2021-000394_ES.html' target='_blank' rel="noopener">jeringuillas especiales</a> (de volumen muerto bajo) se pueden extraer seis dosis y <a href='https://www.ema.europa.eu/en/news/extra-dose-vials-comirnaty-covid-19-vaccine' target='_blank' rel="noopener">las autoridades europeas lo permiten</a>.</p>
    {/if}
</li>

<style>
    .ccaa {
        padding-bottom: 2rem;
    }
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
    .icon { 
        width: 80%;
        margin: 0 auto;
    }
    .date {
        color:#808080;
        font-size: .9rem;
        text-align: right;
        margin-top:.5rem;
        font-weight: 400;
    }
    .numbers {
        padding:.5rem 0;
        border-top: 1px solid #dcdcdc;
        border-bottom: 1px dashed #dcdcdc;
        position:sticky;
        top:4.5rem;
        background-color: #f2f2f2;
        z-index:10;
    }
    .number {
        text-align: right;
        font-variant-numeric: tabular-nums;
    }
    .estimates {
        display: grid;
        gap: 1rem;
        grid-template-columns: 80% auto;
    }
    .indent {
        margin-left: 0;
    }
    .chart {
        width:100%;
    }
    a {
        color:#333;
        text-decoration: none;
        border-bottom: 1px dashed #333;
        transition: all .3s;
    }
    a:hover {
        color:#505050;
        background-color:#FFF;
        text-decoration: none;
        border-bottom: 1px solid #333;
    }
    @media screen and (min-width: 640px) {
		.indent {
            margin-left: 8rem;
        }
        .icon { 
            width: 40%;
            margin: 0 auto;
        }
	}
</style>