<script>
	import Axis from './Axis.svelte';
	// import {scaleLinear, scaleTime, max, extent} from 'd3';
	import {scaleTime, scaleLinear} from 'd3-scale';
	import {max, extent} from 'd3-array'
    
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
	<g>
		{#each data as d}
		<rect 
			height={height - margin.top - margin.bottom - y(d[key.bg])}
			width={(width - margin.left - margin.right) / data.length}
			x={x(d[key.x])}
			y={y(d[key.bg])}
			class="bar gray"
		/>
		<rect 
			height={height - margin.top - margin.bottom - y(d[key.y])}
			width={(width - margin.left - margin.right) / data.length}
			x={x(d[key.x])}
			y={y(d[key.y])}
			class="bar red"
		/>
		{/each}
	</g>
</svg>
{/if}

<style>
	.bar {

	}
	.red { fill: red}
	.gray { fill: #e0e0e0}
	path {
		fill:none;
		stroke-width: 2;
	}
</style>