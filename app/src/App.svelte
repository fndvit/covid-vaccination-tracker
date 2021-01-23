<script>
	import Comunidad from './components/Comunidad.svelte'
	import {scaleLinear, scaleTime} from 'd3-scale'
	import {extent, max} from 'd3-array'
	export let data;

	const { Totales, ...newData } = data;
	const _data = Object.values(newData);

	$: y = scaleLinear()
		.domain(extent(_data.flat(), d => d.entregadas))
		.range([24, 200]);

	// $: x = scaleLinear()
	// 	.domain(extent(_data.flat(), d => d.entregadas))
	// 	.range([24, 200]);
	
	const dateDiff = (start, end) => {
		const difference = start.getTime() - end.getTime();
		const days = Math.ceil(difference / (1000 * 3600 * 24));
		return days;
	}

</script>

<main>
	<ul>
		{#each _data as d}
		<Comunidad data={d} height={y(max(d, d => d.entregadas))} />
		{/each}
	</ul>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
</style>