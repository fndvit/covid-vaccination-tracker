<script>
	import Axis from '../common/Axis.svelte';
	import Tooltip from '../common/Tooltip.svelte'
	import {scaleSqrt, scaleTime, scaleLinear} from 'd3-scale';
	import {extent} from 'd3-array'
    import { Delaunay } from 'd3-delaunay'
    
    export let data;
	export let margin = {top: 20, right: 5, bottom: 20, left: 5};
	export let format;
	export let key;
    export let color;
    export let title;
	export let desc;
	export let layout;

	let datum, width, height, tooltipOptions, tip;

	data.sort((a,b) => a[key.size] - b[key.size])

	$: x = scaleLinear()
		.domain(extent(data, d => d[key.x]))
		.range([margin.left, width - margin.right]);
	
	$: y = scaleLinear()
		.domain(extent(data, d => d[key.y]))
        .range([height - margin.bottom - margin.top, margin.top]);
        
    $: size = scaleSqrt()
		.domain(extent(data, d => d[key.size]))
		.range([3, (width > 640) ? 30 : width / 15]);

	$: delaunay = Delaunay.from(data, d => x(d[key.x]), d => y(d[key.y]));

	const mouseMove = (m) => {
        const mX = (m.offsetX) ? m.offsetX : m.clientX;
		const mY = (m.offsetY) ? m.offsetY : m.clientY;
		let visible = true;
        const picked = delaunay.find(mX, mY);
		datum = data[picked];
		tip = (datum !== undefined)
			?``
			:``;
		tooltipOptions = {x: mX, y: mY, tip: tip, visible: visible}
	}

	const leave = (m) => {
		tooltipOptions = {x: -1000, y: -1000, tip: '', visible: false}
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
		{#each data as d}
		<circle 
			cx={x(d[key.x])}
			cy={y(d[key.y])}
			r={size(d[key.size])}
			fill-opacity=.1
			fill={color}
			stroke={color}
			stroke-width=.3

		/>
		{/each}
		{#each data as d}
		<circle 
			cx={x(d[key.x])}
			cy={y(d[key.y])}
			r={size(d[key.size])}
			class='hover'
			class:selected={d === datum}
		/>
		{/each}

	</g>

	<Axis {width} {height} {margin} scale={y} position='left' format={format.y} />
	<Axis {width} {height} {margin} scale={x} position='bottom' format={format.x} />

</svg>

<Tooltip {... tooltipOptions} {width} {height} />

{/if}

</div>

<style>
	path {
		fill:none;
		stroke-width: 2;
	}
	.hover {
		fill:none;
		stroke-width:2px;
		stroke:#000;
		stroke-opacity: 0;
		transition: all .3s;
	}
	.selected {
		stroke-opacity:1;
		transition: all .3s;
	}
</style>