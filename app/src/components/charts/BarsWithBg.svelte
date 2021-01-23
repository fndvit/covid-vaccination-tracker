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
<svg xmlns:svg="https://www.w3.org/2000/svg" 
	viewBox="0 0 {width} {height}"
	{width} {height}
	role="graphics-document document"
	xml:lang="es"
	>
	<title>Dosis entregadas en {data[0].ccaa}</title>
	<desc>Gráfico de barras comparando la evolución diaria las dosis administradas en {data[0].ccaa} respecto a las entregadas.</desc>
	<g>
		{#each data as d}
		<rect 
			height={height - margin.top - margin.bottom - y(d[key.bg])}
			width={(width - margin.left - margin.right) / data.length}
			x={x(d[key.x])}
			y={y(d[key.bg])}
			class="bar gray"
			role="graphics-symbol img"
			aria-roledescription="barra vacunas entregadas"
			aria-label={d[key.bg]}
			tabindex="0"
		/>
		<rect 
			height={height - margin.top - margin.bottom - y(d[key.y])}
			width={(width - margin.left - margin.right) / data.length}
			x={x(d[key.x])}
			y={y(d[key.y])}
			class="bar red"
			role="graphics-symbol img"
			aria-roledescription="barra vacunas administradas"
			aria-label={d[key.y]}
			tabindex="0"
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