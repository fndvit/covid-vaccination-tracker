<script>
	import Axis from '../common/Axis.svelte';
	import PointInteractive from '../common/PointInteractive.svelte';
	import {line, curveStep} from 'd3-shape';
    import {scaleTime, scaleLinear, scaleBand} from 'd3-scale';
    import {max, extent} from 'd3-array'
    import { Delaunay } from 'd3-delaunay'
    
    export let data;
	export let margin = {top: 20, right: 5, bottom: 20, left: 5};
	export let format;
	export let key;
    export let color;
    export let title;
	export let desc;
	export let layout;			

	export let colorDiff;

	let datum, width, height;

    const _data = key.y.map( (key, i) => data.map(d => ({x: d.dateStr, y: d[key], key:key, color: color[i]} )))

	$: x = scaleTime()
		.domain(extent(_data.flat(), d => d.x))
		.range([margin.left, width - margin.right]);
	
	$: y = scaleLinear()
		.domain([0, max(_data.flat(), d => d.y)])
		.range([height - margin.bottom - margin.top, margin.top]);

	$: path = line()
		.x(d => x(d.x))
		.y(d => y(d.y))
        .curve(curveStep);

	// for bar
	$: barwidth = (width - margin.left - margin.right) / data.length;
	
	$: barX = scaleBand()
		.domain(data.map((d,i) => String(i)))
		.range([margin.left, width - margin.right]);
	
	$: barY = scaleLinear()
		.domain([0, max(data, d => d[key.y[0]])])
		.range([height, margin.top]);

	function valueDiff(d){
		// ccaa - national
		return d['value0'] - d['value1']
	}

    $: delaunay = Delaunay.from(_data.flat(), d => x(d.x), d => y(d.y))

	const mouseMove = (m) => {
        const mX = (m.offsetX) ? m.offsetX : m.clientX;
        const mY = (m.offsetY) ? m.offsetY : m.clientY;
        const picked = delaunay.find(mX, mY);
        datum = _data.flat()[picked];
	}

	const leave = (m) => {
		datum = undefined;
    }
    
    $: hilite = (key) => {
        if(datum !== undefined) return (datum.key === key) ? 1 : .3 ;
        else return 1;
    }

</script> 

<div class='graphic {layout}' bind:clientWidth={width} bind:clientHeight={height}>
{#if width}
<svg xmlns:svg='https://www.w3.org/2000/svg' 
	viewBox='0 0 {width} {height}'
	{width}
	{height}
	role='img'
    aria-labelledby='title desc'
    on:touchmove|preventDefault
	on:pointermove|preventDefault={mouseMove}
	on:mouseleave={leave}
	on:touchend={leave}
	>
	<title id='title'>{title}</title>
	<desc id='desc'>{desc}</desc>
	<g>
        {#each _data as d}
		<path 
			d={path(d)}
			stroke={d[0].color}
            fill='none'
            opacity={hilite(d[0].key)}
			stroke-width="1.5"
        />
		{/each}
		{#each data as d,i}
		<rect 
			height={Math.abs(height - Math.abs(barY(valueDiff(d))))}
            width={barX.bandwidth()}
			y={valueDiff(d) > 0? barY(d['value0']) : barY(d['value1'])}
			x={barX(String(i))}
			fill={valueDiff(d) >0? colorDiff[0] : colorDiff[1]}
			stroke='none'
		/>
   		 {/each}
	</g>

	<Axis {width} {height} {margin} scale={y} position='left' format={format.y} />
	<Axis {width} {height} {margin} scale={x} position='bottom' format={format.x} />

	<PointInteractive {datum} {format} {x} {y} key={{x:'x', y:'y'}} {width} />
	
</svg>
{/if}
</div>

<style>
    path {
        transition: opacity .3s;
    }
</style>