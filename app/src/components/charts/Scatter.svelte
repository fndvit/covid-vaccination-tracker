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
    export let scale;
		
	$: x = scaleLinear()
		.domain(extent(data, d => d[xKey]))
		.range([margin.left, width - margin.right]);
	
	$: y = scaleLinear()
		.domain([0, max(data, d => d[yKey])])
        .range([height - margin.bottom - margin.top, margin.top]);
        
    $: size = scaleS()
		.domain([0, max(data, d => d[yKey])])
		.range([height - margin.bottom - margin.top, margin.top]);
	
</script>

{#if width}
<svg viewBox="0 0 {width} {height}" {width} {height}>
	<Axis {width} {height} {margin} scale={y} position='left' format={yFormat} />
	<g>
		{#each data as d}
		<circle 
			height={height - margin.top - margin.bottom - y(d[yKey])}
			width={(width - margin.left - margin.right) / data.length}
			x={x(d[xKey])}
			y={y(d[yKey])}
			class="bar red"
		/>
		{/each}
	</g>
	<Axis {width} {height} {margin} scale={x} position='bottom' format={xFormat} />
</svg>
{/if}

<style>
	path {
		fill:none;
		stroke-width: 2;
	}
</style>