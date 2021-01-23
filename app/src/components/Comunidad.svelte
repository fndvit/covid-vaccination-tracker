<script>
    import {timeFormat} from 'd3-time-format'
    import {scaleTime, scaleLinear} from 'd3-scale'
    import {extent, max} from 'd3-array'
    import BarsWithBg from './charts/BarsWithBg.svelte'

    export let data;
    export let height;
    let width;

    data.forEach(d => { d.fecha = new Date(d.fecha)})

</script>

<li>
    <h2>{data[0].ccaa}</h2>
    <div class="chart" style='height:{height}' bind:clientWidth={width}> 
        <BarsWithBg {data} {width} {height} key={{x: 'fecha', y: 'administradas', bg: 'entregadas' }} />
    </div>
</li>

<style>
    .chart {
        width:100%;
    }
</style>