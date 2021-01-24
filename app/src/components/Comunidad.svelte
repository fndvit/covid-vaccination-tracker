<script>
    import BarsWithBg from './charts/BarsWithBg.svelte'
    import {format} from 'd3-format'
	import {timeFormat} from 'd3-time-format'
    import locale from '@reuters-graphics/d3-locale';

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
        <BarsWithBg {data} {width} height={height + margin.top + margin.bottom} key={{x: 'fecha', y: 'administradas', bg: 'entregadas' }} format={f} margin={margin}/>
    </div>
</li>

<style>
    h2, .number {
        font-size: 1rem;
        margin:0;
        padding:0;
    }
    h2 {
        font-weight: 600;
    }
    p {
        font-variant-numeric: tabular-nums;
    }
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
    }
    .numbers {
        display: grid;
        grid-template-columns: 20% auto auto auto auto;
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