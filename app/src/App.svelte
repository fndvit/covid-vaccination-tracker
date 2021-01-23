<script>
	import Comunidad from './components/Comunidad.svelte'
	import {scaleLinear, scaleTime} from 'd3-scale'
	import {extent, max} from 'd3-array'
	export let data;

	const { Totales, ...newData } = data;
	const _data = Object.values(newData);

	_data.flat().forEach(d => { 
		d.fecha = new Date(d.fecha);
		d.hasta = new Date(d.hasta);
	});

	$: y = scaleLinear()
		.domain(extent(_data.flat(), d => d.entregadas))
		.range([36, 240]);

	const dateRange = extent(_data.flat(), d => d.fecha);

	const dateDiff = (start, end) => {
		const difference = start.getTime() - end.getTime();
		const days = Math.ceil(difference / (1000 * 3600 * 24));
		return days;
	}

</script>

<main>
	<svg 
		xmlns:svg="https://www.w3.org/2000/svg" 
		viewBox="0 0 0 0"
		width=0 height=0
	>	
		<pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="4" height="4">
			<path d="M-1,1 l2,-2
					 M0,4 l4,-4
					 M3,5 l2,-2" 
				  style="stroke:#808080; stroke-width:.3" />
		</pattern>
	</svg>
	<ul>
		{#each _data as d}
		<Comunidad data={d} height={y(max(d, d => d.entregadas))}/>
		{/each}
	</ul>
</main>

<style>
	:global(body, html) {
		background-color: #f2f2f2;
		font-family: neue-haas-grotesk-display, sans-serif;
	}
	:global(ul) {
		list-style-type: none;
		padding: 0;
	}
	main {
		padding: 1em;
		margin: 0 auto;
	}
	@media screen and (min-width: 640px) {
		main {
			padding: 1em;
			margin: 0 auto;
			max-width: 36rem;
		}
	}
</style>