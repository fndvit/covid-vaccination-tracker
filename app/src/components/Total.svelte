<script>
    import locale from '@reuters-graphics/d3-locale';
    import {dateDiff, approxDate, sNumber} from '../dateDiff'

    export let data;

    const loc = new locale('es');

    const f = {
		x: loc.formatTime('%e %B'),
        y: loc.format(',.1d'),
        pct: loc.format(',.1f')
    }

    const diff = dateDiff(new Date('2021-03-15'), data.dateComplete);

    const sentenceTarget = `Tal y como se están repartiendo las vacunas, ${data.ccaa} vacunará a <strong>${loc.format(`,.2r`)(data.shareTarget)}</strong> personas en esta primera fase.`;
    const sentenceDiff = (diff <= -7)
        ? `Al ritmo de vacunación actual, ${data.ccaa} completará la primera fase <strong>${approxDate(data.dateComplete)}</strong>, <strong>antes de la previsión de mediados de marzo</strong> del Ministerio de Sanidad.`
        : ( diff <= 7 && diff > -7)
        ? 'Si continúa con el mismo ritmo de vacunación, completará la primera fase <strong>dentro del plazo previsto</strong> por el Ministerio de Sanidad — <strong>mediados de marzo</strong>.'
        : ( diff > 7 && diff <= 21)
        ? `No completará la primera fase hasta <strong>${approxDate(data.dateComplete)}</strong>; <strong>${sNumber(Math.floor(diff / 7), 'f')} ${(Math.floor(diff / 7) === 1) ? 'semana' : 'semanas'} más tarde</strong> de lo previsto por el Ministerio de Sanidad.`
        : `Acumula <strong>${sNumber(Math.floor(diff / 7), 'f')} semanas de retraso</strong> respecto a la previsión del Ministerio de Sanidad y no completará esta primera fase hasta <strong>${approxDate(data.dateComplete)}</strong>.`
    const sentence = `${sentenceTarget} ${sentenceDiff}`;

    const tardy = ( diff <= 7)
        ? 'ontime'
        : ( diff > 7 && diff <= 21)
        ? 'late'
        : 'verylate';

</script>

<div class='numbers'>
    <div>
        <p class='number'>{f.y(data.entregadas)}</p>
        <p class='header'>Vacunas entregadas (Pfizer y Moderna)</p>
    </div>
    <div>
        <p class='number'><strong>{f.y(data.administradas)}</strong></p>
        <p class='header'><strong>Vacunas administradas</strong></p>
    </div>
    <div>
        <p class='number'><strong>{f.pct(data.admin_entregadas)}%</strong></p>
        <p class='header'><strong>de vacunas administradas</strong></p>
    </div>
    <div>
        <p class='number'>{f.y(data.vacuna_completa)}</p>
        <p class='header'>Personas con la pauta completa</p>
    </div>
</div>

<style>
    h2, h3, .number {
        margin:0;
        padding:0;
    }
    h2, .number { font-size: 1.5rem;}
    h3 { 
        font-size: 1rem;
        color: #505050;
    }
    h2, h3 { font-weight: 600;}
    .numbers {
        display: grid;
        grid-template-columns: 50% 50%;
    }
    .icon { 
        width: 40%;
        margin: 0 auto;
    }
    .numbers {
        padding:.5rem 0;
        background-color: #f2f2f2;
        z-index:10;
    }
    .number {
        text-align: right;
        font-variant-numeric: tabular-nums;
    }
    .header {
		padding:.5rem 0;
		text-align:right;
		font-size:.7rem;
		text-transform: uppercase;
		background-color: #f2f2f2;
    }
    .note {
        text-align:left;
        font-size: .9rem;
        color:#808080;
        text-transform: none;
    }
	.header, .number {
		margin:0;
		padding:0;
        padding-left:1rem;
	}
    @media screen and (min-width: 640px) {
        .number {
            font-size: 1.5rem;
        } 
        .numbers, .headers {
            display: grid;
            grid-template-columns: 27% 27% 19% 27%;
        }
    } 
</style>