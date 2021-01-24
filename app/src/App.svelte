<script>
	import Comunidad from './components/Comunidad.svelte'
	import {scaleLinear, scaleTime} from 'd3-scale'
	import {extent, max} from 'd3-array'
	export let data;

	Object.values(data)
		.flat()
		.forEach(d => { 
			d.fecha = new Date(d.fecha);
			d.hasta = new Date(d.hasta);
	});

	const { Totales, ...newData } = data;
	const _data = Object.values(newData);

	$: y = scaleLinear()
		.domain(extent(_data.flat(), d => d.entregadas))
		.range([36, 240]);

	const range = extent(_data.flat(), d => d.fecha);

	const dateDiff = (start, end) => {
		const difference = end.getTime() - start.getTime();
		const days = Math.ceil(difference / (1000 * 3600 * 24));
		return days;
	}

	const dateRange = dateDiff(range[0], range[1]);

	const latestNumbers = Object.values(data)
		.flat()
		.sort((a, b) => b.fecha - a.fecha)
		.slice(0,20);

	const totalVacc = 5190735;
	const totalCurrent = latestNumbers.find(d => d.ccaa === 'Totales' ).entregadas;

	latestNumbers.map(d => {
			const total = totalCurrent;
			d.share = d.entregadas / totalCurrent;
			d.sharePeople = d.share * totalVacc / 2;
			d.daily = (d.administradas / 2) / dateRange;
			d.dateComplete  = new Date();
			d.dateComplete.setDate(d.fecha.getDate() + 1 / (d.daily / d.sharePeople))

			return {...d}
		});

	console.log(latestNumbers)


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
	:global(.blue) { 
		fill: #00bbc4;
		background-color: #00bac47c;
	}
	:global(.gray) { fill: #ffffff}
	:global(.bold) { font-weight: 600;}
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