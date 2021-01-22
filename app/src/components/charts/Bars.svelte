<script>
	import Axis from './Axis.svelte';
	import {scaleLinear, scaleTime, max, extent} from 'd3';
    import * from 'd3-scale';
    
    export let data;
	export let margin = {top: 0, right: 0, bottom: 0, left: 0};
	export let width;
	export let height;
	export let format;
    export let key;
		
	$: x = scaleTime()
		.domain(extent(data, d => d[key.x]))
		.range([margin.left, width - margin.right]);
	
	$: y = scaleLinear()
		.domain([0, max(data, d => d[key.y])])
		.range([height - margin.bottom - margin.top, margin.top]);
	
</script>

{#if width}
<svg viewBox="0 0 {width} {height}" {width} {height}>
	<Axis {width} {height} {margin} scale={y} position='left' format={format.y} />
	<g>
		{#each data as d}
		<rect 
			height={height - margin.top - margin.bottom - y(d[key.y])}
			width={(width - margin.left - margin.right) / data.length}
			x={x(d[key.x])}
			y={y(d[key.y])}
			class="bar red"
		/>
		{/each}
	</g>
	<Axis {width} {height} {margin} scale={x} position='bottom' format={format.x} />
</svg>
{/if}

<style>
	path {
		fill:none;
		stroke-width: 2;
	}
</style>